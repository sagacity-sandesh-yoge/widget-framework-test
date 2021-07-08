import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { StepperA1Model, StepperA1ItemModel, CLICK_EVENT, StepperA1ConfigModel, StepperDataResponse } from './stepper-a1-model';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { ToastrService } from 'ngx-toastr';
import { WidgetConstants } from '../../../widget-utility/widget-constants';

@Component({
  selector: 'app-stepper-a1',
  templateUrl: './stepper-a1.component.html',
  styleUrls: ['./stepper-a1.component.css']
})
export class StepperA1Component implements OnInit {

  clickEvent = CLICK_EVENT;

  @Input() dataModel: StepperA1Model;
  @Input() configModel: StepperA1ConfigModel;

  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _toastnotificationservice: ToastrService
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

  getApiData() {

    const apiUrlConst = this.dataModel.apiDataUrl;

    let reqData = Object();

    reqData.data = Object();
    reqData.data = this.dataModel.apireqdata;
    reqData.data.id = this.dataModel.widgetinstanceid;

    this._serverApi.post<StepperDataResponse[], any>(apiUrlConst, reqData.data).subscribe(response => {
      if (response) {
        this.dataModel.items = response.data;
      }
    }, error => {
      switch (error.code) {
        case ErrorCodes.INVALID_USER_ACCESS:
          this._toastnotificationservice.error('Invalid User Access');
          break;
      }
    });
  }

  onClick(eventname: string, item: StepperA1ItemModel) {

    let eventDataObj = Object();
    eventDataObj.redirectionurl = item.redirectionurl;

    let action = "";

    switch (eventname) {
      case CLICK_EVENT.ON_CLICK:
        action = item.name;
        break;
      case CLICK_EVENT.ON_HOVER_CLICK:
        action = "Hover Click";
        break;
      default:
        action = item.name;
    }

    if (this.configModel.EventAction.has(action)) {
      this.configModel.CompToCaller.emit(action, eventDataObj);
    }

  }

  ngOnDestroy(): void {
    this.configModel.CallerToComp.removeAllListeners()
  }

}
