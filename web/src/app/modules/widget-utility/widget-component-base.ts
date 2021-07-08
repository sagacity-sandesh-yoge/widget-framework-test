import { FormModeConstant, WidgetConstants } from './widget-constants';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { DatePipe } from '@angular/common';
import { ValidationService } from 'src/app/services/common/validation.service';
import { WidgetHelper } from './widget-helper';
import { ElementRef, ViewChild, Directive } from '@angular/core';
declare var $: any;

@Directive()
export abstract class WidgetComponentBase {
  wgFormGroup: FormGroup;
  dataModel: any;
  configModel: any;
  isSubmitted: boolean;
  wgFormData: any;

  id: string;
  apiDataUrl: string;
  globalParameters: Map<string, any>;
  fieldApiCount: number;
  @ViewChild('formComponent') formComponent: NgForm;
  tempPermission:any = true;

  abstract ConvertData(response: any);
  abstract setFieldData();
  abstract setMode(responseDataModel: any);
  abstract SetValue(responseDataModel: any);


  constructor(
    private _formBuilderBase: FormBuilder,
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _datepipeBase: DatePipe,
    public _validationServiceBase: ValidationService) {
  }

  wgOnInint() {
    this.configModel.CallerToComp.addListener(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA, () => {
      this.wgRefreshData();
    });
    this.wgSetSelfDataLoad();
    this.wgSetRequestData();

    this.wgPrepareFieldData().then(() => {
      this.wgCreateForm();
      if (this.dataModel.isSelfDataLoad) {
        this.wgRefreshData();
      } else {      
        this.wgGetPermissionData().then((response: any) => {
          if(response){
            this.dataModel.permission = response.permission;
            this.tempPermission = response.permission;
          }  
        })

      }
    });

    this.wgSetFormData();
  }

  wgInitComponent() {

  }

  wgRefreshData() {
    this.wgSetRequestData();
    this.wgSetFormData();

    this.wgGetControlData().then((response: any) => {
        let responseDataModel = this.ConvertData(response)
        this.setMode(responseDataModel);
        this.wgSetModeFromGlobalParameter();
        // this.wgCreateForm(responseDataModel);
        if (this.dataModel.mode === FormModeConstant.EDIT || this.dataModel.mode === FormModeConstant.VIEW) {
          this.SetValue(responseDataModel);
        }        
    }).then((previousResult: any) => {
      this.wgGetPermissionData().then((response: any) => {
        if(response){
          this.dataModel.permission = response.permission;
          this.tempPermission = response.permission;
        }        
      })
    }).then((previousResult: any) => {

    });
  }

  wgCreateForm(responseDataModel?: any) {
    if (this._validationServiceBase) {
      this.wgFormGroup = this._validationServiceBase.createFormGroup(this.dataModel.validators, this.dataModel.permission, this.dataModel.mode);
    }
  }

  Validate(): boolean {
    this.isSubmitted = true;
    if (this.formComponent) {
      this.formComponent.onSubmit(null);
    }
    return this.wgFormGroup.valid;
  }

  onSubmit($event: Event): boolean {
    return true;
  }

  wgSetModeFromGlobalParameter() {
    if(this.dataModel.globalParameters.get("mode")){
      this.dataModel.mode = this.dataModel.globalParameters.get("mode");
    }
    if(this.dataModel.globalParameters.get("isSelfDataLoad")){
      this.dataModel.isSelfDataLoad = this.dataModel.globalParameters.get("isSelfDataLoad");
    }
  }

  wgSetSelfDataLoad() {
    if(this.dataModel.globalParameters.get("isSelfDataLoad")){
      this.dataModel.isSelfDataLoad = this.dataModel.globalParameters.get("isSelfDataLoad");
    }
  }

  wgSetRequestData() {
    if (this.dataModel.isGlobalParams) {
      this.dataModel.globalParamterKeys.forEach(item => {
        this.dataModel.apireqdata[item] = this.dataModel.globalParameters.get(item) ? this.dataModel.globalParameters.get(item) : null;
      })
    }
  }

  wgSetFormData() {

    if (this.dataModel.isGlobalParams && this.wgFormData) {
      this.dataModel.globalParamterKeys.forEach(item => {
        this.wgFormData[item] = this.dataModel.globalParameters.get(item);
      })
    }
  }
  
  wgGetControlData() {
    this.wgOnRequest();
    return new Promise((resolve, reject) => {
      const apiUrlConst = this.dataModel.apiDataUrl;
      const reqData = Object();
      reqData.data = Object();
      reqData.data = this.dataModel.apireqdata;
      reqData.data.id = this.dataModel.widgetinstanceid;

      this._serverApiBase.post<any, any>(apiUrlConst, reqData.data).subscribe(
        response => {
          this.wgOnRequestCompleted();
          try {
            if (response) {
              resolve(response)
            }
          } catch (e) {
          }
        }, error => {
          this.wgOnRequestCompleted();
          reject()
        }
      );
    })
  }

  wgGetPermissionData() {
    if (!this.dataModel.isRequiredPermissionConfig) {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    }
    this.wgOnRequest();
    return new Promise((resolve, reject) => {
      const apiUrlConst = this.dataModel.apiPermissionConfigUrl;
      const reqData = Object();
      reqData.data = Object();
      reqData.data = this.dataModel.apireqdata;
      reqData.data.id = this.dataModel.widgetinstanceid;

      this._serverApiBase.post<any, any>(apiUrlConst, reqData.data).subscribe(
        response => {
          this.wgOnRequestCompleted();
          try {
            if (response) {
              resolve(response)
            }
          } catch (e) {
          }
        }, error => {
          this.wgOnRequestCompleted();
          reject()
        }
      );
    })
  }

  wgPrepareFieldData() {
    let isResolved = this.setFieldData();
    return Promise.all([isResolved])
  }

  wgGetReadPermission(controlName: string) {
    let mode = this.dataModel.globalParameters.get("mode") ?  this.dataModel.globalParameters.get("mode") : FormModeConstant.VIEW;

    return WidgetHelper.getReadPermissions(controlName, this.dataModel.permission, mode, this.wgFormGroup);
  }

  wgGetVisiblePermission(controlName: string) {
    //$('[data-toggle="popover"]').popover({ placement: "right" })
    let mode = this.dataModel.globalParameters.get("mode") ?  this.dataModel.globalParameters.get("mode") : FormModeConstant.VIEW;
    return WidgetHelper.getVisiblePermissions(controlName, this.dataModel.permission, mode);
  }

  wgGetLabelShortHelpText(name: string) {
    return WidgetHelper.getLabelShortHelpText(this.dataModel, name);
  }

  wgGetIconDetailsHelpText(name: string) {
    return WidgetHelper.getIconDetailsHelpText(this.dataModel, name);
  }

  wgHasHelpIcon(name: string) {
    return WidgetHelper.hasHelpIcon(this.dataModel, name);
  }

  get wgFC() { return this.wgFormGroup.controls; }

  get fg() { return this.wgFormGroup; }

  wgOnRequest() {
    this.configModel.CompToCaller.emit(WidgetConstants.ON_REQUEST, null);
  }

  wgOnRequestCompleted() {
    this.configModel.CompToCaller.emit(WidgetConstants.ON_REQUEST_COMPLETED, null);
  }

  wgDisableControl() {
    Object.keys(this.wgFC).forEach(key => {
      this.wgFC[key].disable();
    });
  }

  wgEnabledControl() {
    Object.keys(this.wgFC).forEach(key => {
      this.wgFC[key].enable();
    });
  }
  
  wgReset(){
    if (this.formComponent) {
      this.formComponent.resetForm();
    }
    this.isSubmitted = false;
    this.wgFormGroup.reset();
  }

}