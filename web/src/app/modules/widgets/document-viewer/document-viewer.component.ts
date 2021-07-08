import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EVENT_NAME } from 'src/app/app-constants';
import { MASTER_DATA } from 'src/app/constants/db.constants';
import { IWidget } from 'src/app/data';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
import { ValidationService } from 'src/app/services/common/validation.service';
import { WidgetComponentBase } from '../../widget-utility/widget-component-base';
import { FormModeConstant } from '../../widget-utility/widget-constants';
import { IWidgetSubmit } from '../iwidget';
import { DocumentViewerDataModel, DocumentViewerConfigModel, VIEWER_TYPE } from './document-viewer.model';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent extends WidgetComponentBase implements OnInit, IWidget, IWidgetSubmit {

  dataModel: DocumentViewerDataModel;
  configModel: DocumentViewerConfigModel;
  formData: any = new Object();
  VIEWER_TYPE = VIEWER_TYPE;
  constructor(
    private formBuilder: FormBuilder,
    private _serverApi: ServerApiInterfaceServiceService,
    private datepipe: DatePipe,
    public _validationService: ValidationService,
    private _appRepoHelperService: AppRepoHelperService,
    public sanitizer: DomSanitizer
  ) {

    super(formBuilder, _serverApi, datepipe, _validationService);
    this.formData = new Object();
    this.dataModel = this.dataModel;
    this.configModel = this.configModel;
    this.wgFormData = this.formData;
  }

  ngOnInit(): void {
    this.wgOnInint();
  }

  Reset() {
    this.isSubmitted = false;
    this.wgFormGroup.reset();
  }

  resetForm(mode) {
    this.dataModel.mode = mode;
    this.wgReset();
  }


  GetValue() {
    return this.formData;
  }

  SetValue(response) {

  }

  setMode(responseDataModel: any) {
    this.dataModel.mode = FormModeConstant.EDIT;
  }

  ConvertData(response: any) {
    if (response?.data[0]?.docViewURL) {
      this.dataModel.url = response.data[0].docViewURL;
      this.dataModel.mimeType = response.data[0].MimeType.toLowerCase();
      switch (this.dataModel.mimeType) {
        //doc
        case "application/msword":
        //docx
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        //xlsx  
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        //xls  
        case "application/vnd.ms-excel":
          this.dataModel.viewerType = VIEWER_TYPE.OFFICE
          break;
        default:
          this.dataModel.viewerType = VIEWER_TYPE.GOOGLE
          break;
      }
      if(this.dataModel.mimeType?.includes("image/")){
        this.dataModel.viewerType = VIEWER_TYPE.IMAGE;
      }
      if(this.dataModel.mimeType?.includes("video/")){
        this.dataModel.viewerType = VIEWER_TYPE.VIDEO;
      }
    }
    return response;
  }

  setFieldData() {

  }

  onClick(actionName) {
    let eventDataObj = Object();


    let action = actionName;

    if (this.configModel.EventAction.has(action)) {
      this.configModel.CompToCaller.emit(action, eventDataObj);
    }
  }
}
