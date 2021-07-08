import { Component, Input, OnInit } from '@angular/core';
import { FileUploadModel, FileUploadConfigModel, CLICK_EVENT, FileSubmitFormModel } from './file-upload-model';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { FormBuilder } from '@angular/forms';
import { IWidget } from 'src/app/data';
import { IWidgetSubmit } from '../../widget-utility/iwidget';
import { WidgetComponentBase } from '../../widget-utility/widget-component-base';
import { ToastrService } from 'ngx-toastr';
import { WidgetConstants } from '../../widget-utility/widget-constants';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent extends WidgetComponentBase implements OnInit, IWidget, IWidgetSubmit {
  @Input() dataModel: FileUploadModel;
  formDataFromParent: FormData;
  @Input() configModel: FileUploadConfigModel;
  uploadedFiles: any[] = [];
  selectedFiles: any[] = [];
  progressValue: any = 0;
  clickEvent = CLICK_EVENT;
  formData: FileSubmitFormModel; 

  constructor(
    public formBuilder: FormBuilder,
    private _serverApi: ServerApiInterfaceServiceService,
    private _notificationService: NotificationService,
    private _toastnotificationservice: ToastrService,
  ) {
    super(formBuilder, _serverApi, null, null);
    this.formData = new FileSubmitFormModel();
  }

  ngOnInit(): void {
    this.configModel.CallerToComp.addListener(WidgetConstants.ON_FILE_UPLOAD_COMPLETED, (event:any) => {
      this.onUploadComplete(event);
    });
    this.configModel.CallerToComp.addListener(WidgetConstants.RESET_WIDGET_DATA, (event:any) => {
      this.Reset();
    });
   
    this.configModel.CallerToComp.addListener(WidgetConstants.UPLOAD_CLICK, (event:any) => {
      this.uploadclick(event);
    });
    this.wgOnInint();
  }
  

  GetValue() {
    this.formData.uploadedFiles = this.selectedFiles;
    this.formData.hasUploadedFiles = this.selectedFiles && this.selectedFiles.length ? 1 : 0;
    return this.formData;
  }

  Reset() {
    this.formData = new FileSubmitFormModel();
    this.uploadedFiles= [];
    this.selectedFiles  = [];
    this.progressValue = 0;
  }

  ConvertData(response: any) {}
  setFieldData() {}
  setMode(responseDataModel: any) {}
  SetValue(responseDataModel: any) {}

  onSelect(event: any) {
    for (const file of event.files) {
      this.selectedFiles.push(file);
    }
  }

  onRemove(event: any) {
    this.selectedFiles = this.selectedFiles.filter((f) => {
      return f.lastModified !== event.lastModified;
    });
    this.uploadedFiles = [];
  }

  onClear() {
    this.selectedFiles = [];
  }

  onClick(actionName, data?: any) {
    let eventDataObj = Object();
    eventDataObj = this.dataModel.submitProperties;
    eventDataObj.queryAction = this.dataModel.apireqdata.queryAction;
    eventDataObj.updateId = this.dataModel.apireqdata.updateId;
    eventDataObj.fileData = data;      
    eventDataObj.paramkeys = this.dataModel.paramkeys;

    this.dataModel.paramkeys.forEach((element) => {
      const val = this.dataModel.apireqdata[element];
      eventDataObj[element] = val;

    });

    let action = actionName;

    if (this.configModel.EventAction.has(action)) {
      this.configModel.CompToCaller.emit(action, eventDataObj);
    }
  }

  Validate() {
    let selectedItems= this.selectedFiles;
   
    for(let i=0; i<=selectedItems.length;i++)
    {
      if (selectedItems[i]!=null) {
        if (selectedItems[i].size > 512000000) {
          this._notificationService.error("File too large, maximum allowed limits is 512 MB");
          return false;
        }
      }
      else
      {
        return true;
      }
    }    
  }

  onRefresh(event: any) {
    if (event) {
      for (const file of event.files) {
        this.uploadedFiles.push(file);
      }
    }
    this.selectedFiles = [];

    // this._notificationService.success('File Uploaded');
    this.uploadedFiles = [];
    setTimeout(() => {
      this.progressValue = 0;
      //this.onClick(this.clickEvent.ON_ITEM_CLICK)
    }, 6000);
  }
  // Callback to invoke when file upload is complete.
  onUpload(event: any) {
    if (event) {
      for (const file of event.files) {
        this.uploadedFiles.push(file);
      }
    }
    this.selectedFiles = [];

    this._notificationService.success("File Uploaded");
    this.uploadedFiles = [];
    this.progressValue = 0;
    this.onClick(this.clickEvent.ON_ITEM_CLICK);
  }

  onUploadComplete(event: any) {
    if (event) {
      this.formData.responseData = event?.eventparamsData?.responseData;
      let fileData = event?.eventparamsData?.fileData;
      if(fileData){
        for (const file of fileData.files) {
          this.uploadedFiles.push(file);
        }
      }     
    }
    this.selectedFiles = [];
    this._notificationService.success("File Uploaded");
    this.uploadedFiles = [];
    this.progressValue = 0;
  }

  onUploadRefresh(event: any) {
    this.selectedFiles = [];
    this.uploadedFiles = [];
    this.progressValue = 0;
  }

  setGlobalParamsInReq() {
    if (this.dataModel.isGlobalParams) {
      this.dataModel.globalParamterKeys.forEach((item) => {
        this.dataModel.apireqdata[item] = this.dataModel.globalParameters.get(
          item
        );
      });
    }
  }

  uploadHandler(event: any) {
    const formData: FormData = new FormData();
    this.setGlobalParamsInReq();

    for (const file of event.files) {
      formData.append("files", file);
    }

    const reqData = Object();
    reqData.data = Object();
    reqData.data.customerId = this.dataModel.apireqdata["regId"];
    reqData.data.documentName = this.dataModel.apireqdata.documentName;
    reqData.data.executeactionsubmitcode = this.dataModel.submitProperties.submitcode;
    reqData.data.caseId = this.dataModel.apireqdata.caseId;
    reqData.data.customerDocId = this.dataModel.apireqdata.customerDocId;
    reqData.data.queryAction = this.dataModel.apireqdata.queryAction;
    reqData.data.caseTechSpecTableid = this.dataModel.apireqdata.caseTechSpecTableid;
    formData.append("requestData", JSON.stringify(reqData.data));

    this.progressValue = 5;
    if (!this.configModel.EventAction.has(this.clickEvent.ON_UPLOAD_CLICK)) {
      this._serverApi.upload(this.dataModel.item.url, formData).subscribe(
        (response: any) => {
          if (response) {
            if (response.status === "progress") {
              this.progressValue = response.message;
            } else if (response) {
              this.onUpload(event);
            }
          }
        },
        (error: any) => {
          this.progressValue = 0;
          this._notificationService.error("Failed");
        }
      );
    } else {
      this.onClick(this.clickEvent.ON_UPLOAD_CLICK, event);
    }
  }

  uploadclick(event: any) {
    let eventObject = event;
    eventObject = eventObject ? eventObject: new Object();
    eventObject.fileData = new Object();
    eventObject.files = this.selectedFiles;
    this.onClick(this.clickEvent.ON_UPLOAD_CLICK, eventObject);
  }
}
