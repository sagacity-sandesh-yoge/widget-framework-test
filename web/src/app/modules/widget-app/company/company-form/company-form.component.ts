import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EVENT_NAME } from 'src/app/app-constants';
import { CASE_IMPACT_TYPE_ID, MASTER_DATA, TAGS_TYPES_CODE } from 'src/app/constants/db.constants';
import { IWidget } from 'src/app/data';
import { PopupModel } from 'src/app/models/common/popup-model';
import { IWidgetSubmit } from 'src/app/modules/widget-utility/iwidget';
import { WidgetComponentBase } from 'src/app/modules/widget-utility/widget-component-base';
import { FormModeConstant } from 'src/app/modules/widget-utility/widget-constants';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { SessionStorageService } from 'src/app/services/common/session-storage.service';
import { ValidationService } from 'src/app/services/common/validation.service';
import { CompanyFormDataModel, CompanyFormConfigModel } from './company-form.model';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent extends WidgetComponentBase implements OnInit, IWidget, IWidgetSubmit {

  dataModel: CompanyFormDataModel;
  configModel: CompanyFormConfigModel;
  formData: any;
  clickEvent = EVENT_NAME;
  remarkstatuses;
  remarkactions;
  showToggleButtons: boolean = false;
  departmentSelected: any;
  userroleid: number;
  userrolecode: string;
  queryEmptyPopupModel: PopupModel;

  constructor(
    private formBuilder: FormBuilder,
    private _serverApi: ServerApiInterfaceServiceService,
    private datepipe: DatePipe,
    private _sessionStorageService: SessionStorageService,

    public _validationService: ValidationService,
    private _appRepoHelperService: AppRepoHelperService,
    private _notificationService: NotificationService) {

    super(formBuilder, _serverApi, datepipe, _validationService);
    this.formData = new Object();
    this.dataModel = this.dataModel;
    this.configModel = this.configModel;
    this.wgFormData = this.formData;
  }
  Reset() {
    
  }

  ngOnInit(): void {
    this.wgOnInint();
  }

  GetValue() {
    const companyName = this.wgFC.companyName.value;
    const pan = this.wgFC.pan.value;
    const partyCode = this.wgFC.partyCode.value;

    this.formData.companyName = companyName ? companyName : null;
    this.formData.pan = pan ? pan : null;
    this.formData.partyCode = partyCode ? partyCode : null;

    return this.formData;
  }

  SetValue(response) {
    if(response){
      this.wgFormGroup.patchValue({
        companyName: response.companyName, 
        pan: response.pan,
        partyCode: response.partyCode
     })
    }
  }

  resetForm(mode) {
    this.wgReset();
  }


  setMode(responseDataModel: any) {
    this.dataModel.mode = FormModeConstant.EDIT;
  }

  ConvertData(response: any) {
    this.dataModel.data = response?.data[0];
    return this.dataModel.data;
  }

  setFieldData() {
    return new Promise<void>((resolve, reject) => {
      if (this.dataModel.initDataUrl) {
        
        resolve()
      } else {
        resolve()
      }
    })
  }

  onAddClick(actionName) {
    let eventDataObj = Object();
    eventDataObj = this.dataModel.submitProperties;
    eventDataObj.queryAction = "insert";
    let action = actionName;

    if (this.configModel.EventAction.has(action)) {
      this.configModel.CompToCaller.emit(action, eventDataObj);
    }
  }

  onEditClick(actionName) {
    let eventDataObj = Object();
    eventDataObj = this.dataModel.submitProperties;
    eventDataObj.queryAction = "update";
    let action = actionName;

    if (this.configModel.EventAction.has(action)) {
      this.configModel.CompToCaller.emit(action, eventDataObj);
    }
  }

  onBackClick(actionName) {
    let eventDataObj = Object();
    if (this.configModel.EventAction.has(actionName)) {
      this.configModel.CompToCaller.emit(actionName, eventDataObj);
    }
  }
}
