import { EventEmitter } from "events";

export class CKEditorConfigModel {
  static getInstance<T>():CKEditorConfigModel {
    let model = new CKEditorConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class CKEditorDataModel {
  static getInstance<T>(): CKEditorDataModel {
    let model = new CKEditorDataModel();

    model.globalParameters = new Map();
    model.isSelfDataLoad = true;
    model.items = [];
    model.apiDataUrl = "";
    model.formData = {};
    model.mode = "";
    model.globalParamterKeys = [];
    model.isGlobalParams = false;
    model.initDataUrl;
    model.validators = {};
   
    return model;
  }
  validators: any;
  formValues;
 
  isGlobalParams: boolean;
  globalParamterKeys: string[];

  initDataUrl: string;
  isSelfDataLoad: boolean;
  fieldPermissions: Map<string, string>;
  id: number;
  widgetinstanceid: number;
  globalParameters: Map<string, any>;
  apiDataUrl: string;
  mode: string;
  
  permission: any;

  items: any[] = [];
  apireqdata: any = {};

  widgetStyle: {};
  vlStyle: {};
  formData: {};
}
