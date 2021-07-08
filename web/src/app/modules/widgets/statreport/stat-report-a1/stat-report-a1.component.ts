import { Component, OnInit, NgModule, Input, AfterViewInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from "src/app/server-api-interface-service.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ErrorCodes } from "src/app/models/common/error-codes";
import { WidgetConstants } from "../../../widget-utility/widget-constants";
import { StatReportA1Model, StatReportA1ConfigModel } from './stat-report-a1-model';
@Component({
  selector: 'app-stat-report-a1',
  templateUrl: './stat-report-a1.component.html',
  styleUrls: ['./stat-report-a1.component.css']
})
export class StatReportA1Component implements OnInit {

  @Input() dataModel: StatReportA1Model;
  @Input() configModel: StatReportA1ConfigModel;

  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _toastnotificationservice: ToastrService,//TODO: This service need remove from this and place at common place
    private router: Router) { }


  ngOnInit() {
    this.configModel.CallerToComp.addListener(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA, () => {
      this.RefreshData();
    })

  }

  InitComponent() {
    if (this.dataModel.isSelfDataLoad) {
      this.RefreshData();
    }

  }

  RefreshData() {
    this.getApiData();
  }

  getApiData() {

    var tempData = [];
    const apiUrlConst = this.dataModel.apiDataUrl;
    let reqData = Object();
    reqData.data = Object();

    this._serverApi.post<any, any>(apiUrlConst, reqData.data).subscribe(

      response => {

        try {
          this.convertData(response)

        } catch (e) {
          console.log("error", e)
        }

      },
      error => {
        // this need to remove
        switch (error.code) {
          case ErrorCodes.INVALID_USER_ACCESS:
            this._toastnotificationservice.error("Invalid User Access");
            break;
        }
      }

    );

  }

  convertData(response) {

    this.dataModel.maintitle = response.data[0].maintitle;
    this.dataModel.maintitlecount = response.data[0].maintitlecount;
    this.dataModel.section1text = response.data[0].section1text;
    this.dataModel.section1count = response.data[0].section1count;
    this.dataModel.section2text = response.data[0].section2text;
    this.dataModel.section2count = response.data[0].section2count;

  }

}
