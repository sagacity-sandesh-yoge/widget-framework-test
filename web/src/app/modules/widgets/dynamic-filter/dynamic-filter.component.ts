import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CONTROL_TYPE, LOCAL_MASTER_DATA, OPERATORS } from 'src/app/constants/app-repo.constants';
import { EVENT_NAME, MASTER_DATA } from 'src/app/constants/db.constants';
import { IWidget } from 'src/app/data';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
import { SessionStorageService } from 'src/app/services/common/session-storage.service';
import { ValidationService } from 'src/app/services/common/validation.service';
import { WidgetComponentBase } from '../../widget-utility/widget-component-base';
import { IWidgetSubmit } from '../iwidget';
import { DynamicFilterDataModel, DynamicFilterConfigModel, DynamicFilterFormModel } from './dynamic-filter-model';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.css']
})
export class DynamicFilterComponent extends WidgetComponentBase implements OnInit, IWidget, IWidgetSubmit {

  dataModel: DynamicFilterDataModel;
  configModel: DynamicFilterConfigModel;
  formData: any;
  tabCode: any;
  CONTROL_TYPE = CONTROL_TYPE;
  EVENT_NAME = EVENT_NAME;
  constructor(
    private formBuilder: FormBuilder,
    private _serverApi: ServerApiInterfaceServiceService,
    private _sessionStorageService: SessionStorageService,
    private datepipe: DatePipe,
    private _appRepoHelperService: AppRepoHelperService,
    public _validationService: ValidationService
  ) {
    super(formBuilder, _serverApi, datepipe, null);
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

    if (this.wgFormGroup) {
      this.wgFormGroup.reset();
    }
  }

  GetValue() {
    if (this.dataModel.filter?.controls) {
      this.dataModel.filter?.controls.forEach((d: any) => {
        const controlValue = this.wgFormGroup.get(d.controlName).value;
        this.formData[d.requestPropName] = controlValue ? controlValue : '';
      })
    }
    return this.formData;
  }

  SetValue(response) { }

  setMode(responseDataModel: DynamicFilterFormModel) { }

  ConvertData(response: any) {
    const item: any = {};
    if(response.data[0].UIMetaData){
      let uiMetaData = JSON.parse(response.data[0].UIMetaData); 
      if(uiMetaData){
        this.dataModel.filter =  uiMetaData.filter;
      }
    }
  
    if(this.dataModel.filter){
      this.wgFormGroup = this._validationService.createFormGroup(this.dataModel.filter, this.dataModel.permission, this.dataModel.mode);
    }

    return item;
  }

  setFieldData() {
    this.dataModel.operatorList = this._appRepoHelperService.getMDataByCAT(
      LOCAL_MASTER_DATA.FILTER_OPERATORS
    );
  }

  applyFilter(actionName) {
    this.emitEvent(actionName);
  }

  resetFilter(actionName) {
    this.emitEvent(actionName);
  }

  emitEvent(actionName) {
    let eventDataObj = Object();
    eventDataObj = this.dataModel;
    if (this.configModel.EventAction.has(actionName)) {
      this.configModel.CompToCaller.emit(actionName, eventDataObj);
    }
  }

  setEnableDisableDate(opControlName:any, startControlName:any, endControlName:any) {
    if (this.wgFC[opControlName].value) {
      this.wgFC[startControlName].enable();
    } else {
      this.wgFC[startControlName].disable();
    }

    if (this.wgFC[opControlName].value == OPERATORS.BETWEEN) {
      this.wgFC[endControlName].enable();
    } else {
      this.wgFC[endControlName].disable();
    }    
  }

}
