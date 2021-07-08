import { Component, OnInit, Input, AfterViewChecked } from "@angular/core";
import { ProgressA1Model, CLICK_EVENT, ProgressA1ConfigModel } from "./progress-a1-model";
import { ServerApiInterfaceServiceService } from "src/app/server-api-interface-service.service";
import { ErrorCodes } from "src/app/models/common/error-codes";
import { ToastrService } from "ngx-toastr";
import { WidgetConstants } from '../../../widget-utility/widget-constants';

@Component({
  selector: 'app-progress-bar-a1',
  templateUrl: './progress-bar-a1.component.html',
  styleUrls: ['./progress-bar-a1.component.css']
})
export class ProgressBarA1Component implements OnInit {
  clickEvent = CLICK_EVENT;

  @Input() dataModel: ProgressA1Model;
  @Input() configModel: ProgressA1ConfigModel;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _toastnotificationservice: ToastrService,
  ) { }

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

  ngOnDestroy() {
    this.configModel.CompToCaller.removeAllListeners();
  }

  onClick(eventname: string) {
    if (this.configModel.EventAction.has(eventname)) {
      this.configModel.CompToCaller.emit(eventname,
        this.configModel.EventAction.get(eventname))
    }
  }

  getApiData() {

    const apiUrlConst = this.dataModel.apiDataUrl;

    let reqData = Object();
    reqData.data = Object();
    reqData.data.id = this.dataModel.widgetinstanceid;

    this._serverApi.post<any, any>(apiUrlConst, reqData.data).subscribe(

      response => {

        try {
          this.dataModel.barConfig = response.data

        } catch (e) {

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
}
