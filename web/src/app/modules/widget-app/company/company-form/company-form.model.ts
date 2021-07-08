import { EventEmitter } from "events";
import { MasterDataModel } from "src/app/models/common/master-data-model";

export class CompanyFormConfigModel {
  static getInstance<T>(): CompanyFormConfigModel {
    let model = new CompanyFormConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class CompanyFormDataModel {
  data: any;
  static getInstance<T>(): CompanyFormDataModel {
    let model = new CompanyFormDataModel();

    model.globalParameters = new Map();
    model.isSelfDataLoad = true;
    model.apiDataUrl = "";
    model.formData = new Object();
    model.id;
    model.initDataUrl = "";
    model.globalParamterKeys = [];
    model.isGlobalParams = false;
    model.isEdit = false;
    model.validators = {};
    model.isSummaryPage = false;
    model.tooltip = {};
    model.operatorList = [];
    model.submitProperties = Object();
    model.permission = {};
    return model;
  }
  isSummaryPage: boolean;
  mode: string;
  initDataUrl: string;
  isGlobalParams: boolean;
  globalParamterKeys: string[];
  isSelfDataLoad: boolean;
  fieldPermissions: Map<string, string>;
  id: number;
  widgetinstanceid: number;
  globalParameters: Map<string, any>;
  apiDataUrl: string;
  isEdit: boolean;
  apireqdata: any = {};
  widgetStyle: {};
  vlStyle: {};
  formData: {};
  validators: any;
  permission: any;
  tooltip: any;
  operatorList: any[];
  submitProperties: {};
  isRequiredPermissionConfig: boolean;
}
