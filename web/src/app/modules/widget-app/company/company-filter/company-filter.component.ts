import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LOCAL_MASTER_DATA, MASTER_DATA, OPERATORS } from 'src/app/constants/app-repo.constants';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
import { ValidationService } from 'src/app/services/common/validation.service';
import { IWidget, IWidgetSubmit } from '../../../widget-utility/iwidget';
import { WidgetComponentBase } from '../../../widget-utility/widget-component-base';
import { CompanyFilterDataModel, CompanyFilterConfigModel, CompanyFilterFormModel } from './company-filter.model';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.css']
})
export class CompanyFilterComponent extends WidgetComponentBase implements OnInit, IWidget, IWidgetSubmit {

dataModel: CompanyFilterDataModel;
configModel: CompanyFilterConfigModel;
formData: CompanyFilterFormModel;

companyStatus;

constructor(
  private formBuilder: FormBuilder,
  private _serverApi: ServerApiInterfaceServiceService,
  private datepipe: DatePipe,
  public _validationService: ValidationService,
  private _appRepoHelperService: AppRepoHelperService) {

  super(formBuilder, _serverApi, datepipe, _validationService);
  this.formData = new CompanyFilterFormModel();
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

GetValue() {
  const companyname = this.wgFormGroup.get('companyname').value;
  const panno = this.wgFormGroup.get('panno').value;
  const tanno = this.wgFormGroup.get('tanno').value;
  const status = this.wgFormGroup.get('status').value;
  const MSMENo = this.wgFormGroup.get('MSMENo').value;
  const partycode = this.wgFormGroup.get('partycode').value;
  const partystatus = this.wgFormGroup.get('partystatus').value;
  

  this.formData.companyname = companyname ? companyname : '';
  this.formData.panno = panno ? panno : '';
  this.formData.tanno = tanno ? tanno : '';
  this.formData.status = status ? status : '';
  this.formData.partystatus = partystatus ? partystatus : '';
  this.formData.partycode = partycode ? partycode : '';
  this.formData.MSMENo = MSMENo ? MSMENo : '';
  
  return this.formData;
}

SetValue(response) {

}

setMode(responseDataModel: any) {
}

ConvertData(response: any) {
  const item: any = {};
  return item;
}

setFieldData() {
  this.companyStatus = this._appRepoHelperService.getMDataByCAT(MASTER_DATA.CUSTOMER_STATUS);

  this.dataModel.operatorList =  this._appRepoHelperService.getMDataByCAT(LOCAL_MASTER_DATA.FILTER_OPERATORS);
}

ShowLoader() {
  throw new Error("Method not implemented.");
}

HideLoader() {
  throw new Error("Method not implemented.");
}

setEnableDisableDate(){
  if(this.wgFC.dateOperator.value){
    this.wgFC.startDate.enable();
  } else{
    this.wgFC.startDate.disable();
  }

  if(this.wgFC.dateOperator.value == OPERATORS.BETWEEN){
    this.wgFC.endDate.enable();
  }else{
    this.wgFC.endDate.disable();
  }
}
}