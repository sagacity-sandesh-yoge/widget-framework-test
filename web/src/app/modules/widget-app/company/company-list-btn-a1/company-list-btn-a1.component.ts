import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WidgetComponentBase } from 'src/app/modules/widget-utility/widget-component-base';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/common/validation.service';
import { CompanyListBtnA1ConfigModel, CompanyListBtnA1DataModel } from './company-list-btn-a1-model';

@Component({
  selector: 'app-company-list-btn-a1',
  templateUrl: './company-list-btn-a1.component.html',
  styleUrls: ['./company-list-btn-a1.component.css']
})
export class CompanyListBtnA1Component extends WidgetComponentBase implements OnInit {
  @Input() dataModel: CompanyListBtnA1DataModel;
  @Input() configModel: CompanyListBtnA1ConfigModel;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _serverApi: ServerApiInterfaceServiceService,
    private datepipe: DatePipe,
    public _validationService: ValidationService) { 
    super(formBuilder, _serverApi, datepipe, null);
    super.dataModel = this.dataModel;
    super.configModel = this.configModel;
  }

  ngOnInit() {
    this.wgOnInint()
 }
  
  onClick(actionName) {
    let eventDataObj = Object();
    if (this.configModel.EventAction.has(actionName)) {
      this.configModel.CompToCaller.emit(actionName, eventDataObj);
    }
  }

  ConvertData(response: any) {
    
  }
  setFieldData() {
    
  }
  setMode(responseDataModel: any) {
    
  }
  SetValue(responseDataModel: any) {
    
  }

  ngOnDestroy(): void {

  }
}