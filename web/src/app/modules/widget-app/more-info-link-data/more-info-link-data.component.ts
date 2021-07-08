import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IWidget } from 'src/app/data';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/common/app-repo.service';
import { ValidationService } from 'src/app/services/common/validation.service';
import { WidgetComponentBase } from '../../widget-utility/widget-component-base';
import { FormModeConstant } from '../../widget-utility/widget-constants';
import { CLICK_EVENT, MoreInfoFormConfigModel, MoreInfoFormDataModel, MoreInfoFormModel } from './more-info-link-data-model';

@Component({
  selector: 'app-more-info-link-data',
  templateUrl: './more-info-link-data.component.html',
  styleUrls: ['./more-info-link-data.component.css']
})
export class MoreInfoLinkDataComponent extends WidgetComponentBase
  implements OnInit, IWidget {
  dataModel: MoreInfoFormDataModel;
  configModel: MoreInfoFormConfigModel;
  formData: any;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private router: Router,
    public formBuilder: FormBuilder,
    private _appRepoService: AppRepoService,
    private datepipe: DatePipe,
    private _appRepoHelperService: AppRepoHelperService,
    public _validationService: ValidationService
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

  ConvertData(response: any) {
    this.dataModel.info = response.data[0];
  }

  setFieldData() {     
  }

  setMode(responseDataModel: any) {
  }

  SetValue(responseDataModel: any) {
  }

  GetValue() {
    return this.formData;
  }
  Reset() {
   
  }
}


