import { Component, OnInit, Input } from '@angular/core';
import { PieGridA1Model, PieGridA1ConfigModel, PieGridA1ItemDataModel } from './pie-grid-a1-model';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { WidgetConstants } from '../../../widget-utility/widget-constants';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { ColorHelper } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-grid-a1',
  templateUrl: './pie-grid-a1.component.html',
  styleUrls: ['./pie-grid-a1.component.css']
})
export class PieGridA1Component implements OnInit {

  @Input() dataModel: PieGridA1Model;
  @Input() configModel: PieGridA1ConfigModel;


  single: any[];
  view: any[] = [700, 400];
  // public activeEntries: any[];
  activeEntries = [];
  datatitle: any;
  //public datatitle:any[];
  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = "below";
  colorScheme = {
    domain: ["#F6B900", "#00CD98", "#5351FB", "#F64000"]
  };
  colorScheme2 = {
    domain: ["#F64000", "#F6B900", "#00CD98", "#5351FB"]
  };

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _toastnotificationservice: ToastrService, //TODO: This service need remove from this and place at common place
    private router: Router
  ) {
    //  Object.assign(this, { single });
  }

  ngOnInit() {
    this.configModel.CompToCaller.addListener(
      WidgetConstants.CALLER_TO_COMP_REFRESH_DATA,
      () => {
        this.RefreshData();
      }
    );
  }






  InitComponent() {
    if (this.dataModel.isSelfDataLoad) {
      this.RefreshData();
    }
    //this.changetext();
  }

  RefreshData() {
    this.getApiData();
  }

  getApiData() {
    const apiUrlConst = this.dataModel.apiDataUrl;

    let reqData = Object();
    reqData.data = Object();
    reqData.data.id = this.dataModel.widgetinstanceid;

    this._serverApi.post<any, any>(apiUrlConst, reqData.data).subscribe(
      response => {
        if (response) {
          let temData = [];

          this.convertData(response);
        }
      },
      error => {
        // TODO: this code need to move in common place
        switch (error.code) {
          case ErrorCodes.INVALID_USER_ACCESS:
            this._toastnotificationservice.error("Invalid User Access");
            break;
        }
      }
    );
  }



  convertData(response) {
    let totalvalue = 0;
    let temData = [];
    // response.data.forEach(responsePieItem => {
    //   totalvalue = totalvalue + responsePieItem.itemcount;
    // });
    response.data.forEach(responsePieItem => {
      let item = new PieGridA1ItemDataModel();
      item.code = responsePieItem.code;
      item.name = responsePieItem.name;

      item.value = responsePieItem.itemcount;
      item.extra = {};
      item.extra.displayName = item.name;
       let x = (item.value / responsePieItem.value) * 100;
    
      item.extra.displayValue = " " + x + "%";
      temData.push(item);
    });

    this.dataModel.items = temData;
    // this.dataModel.totalCount = response.count;

    // let datatitles = temData.map(d => d["extra"]["displayName"]);
    // this.datatitle = datatitles;
    // this.dataModel.legendData = temData.map(
    //   d => d["extra"]["displayName"] + d['extra']['displayValue']
    // );

    this.dataModel.legendColor = new ColorHelper(
      this.colorScheme2,
      "ordinal",
      this.dataModel.items,
      this.colorScheme
    );
  }

}
