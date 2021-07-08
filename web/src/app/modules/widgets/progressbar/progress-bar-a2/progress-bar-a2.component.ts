import { Component, OnInit, Input } from '@angular/core';
// import {TooltipPosition} from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { ProgressA2Model, ProgressA2ConfigModel, ProgressBarA2ItemDataModel } from './progress-bar-a2-model';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { WidgetConstants } from '../../../widget-utility/widget-constants';
declare var $: any;

@Component({
  selector: 'app-progress-bar-a2',
  templateUrl: './progress-bar-a2.component.html',
  styleUrls: ['./progress-bar-a2.component.css']
})

export class ProgressBarA2Component implements OnInit {

  @Input() dataModel: ProgressA2Model;
  @Input() configModel: ProgressA2ConfigModel;
  // positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  // position = new FormControl(this.positionOptions[0]);



  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _toastnotificationservice: ToastrService
  ) { }

  ngOnInit() {
    
    this.configModel.CallerToComp.addListener(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA, () => {
      this.RefreshData();
    })

    
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }


  InitComponent() {
    if (this.dataModel.isSelfDataLoad) {
      this.RefreshData();
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
          this.convertData(response)
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
  RefreshData() {
    this.getApiData();
  }
  convertData(response) {

    let tempdata = [];
    let totalcount = 0;
    response.data.forEach((responseProgressItems) => {
      totalcount += responseProgressItems.error_count;

    });

    response.data.forEach((responseProgressItems) => {
      let items = new ProgressBarA2ItemDataModel();
      items.error_brightness = responseProgressItems.brightness_value;
      items.error_count = (responseProgressItems.error_count / totalcount) * 100;
      items.error_name = responseProgressItems.error_code;
      items.status = responseProgressItems.status;
      tempdata.push(items);

    });

    this.dataModel.items = tempdata;

  }

}
