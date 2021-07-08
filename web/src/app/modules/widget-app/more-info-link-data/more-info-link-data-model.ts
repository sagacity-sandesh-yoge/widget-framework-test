import { EventEmitter } from "events";

export class MoreInfoFormConfigModel {
  static getInstance<T>(): MoreInfoFormConfigModel {
    let model = new MoreInfoFormConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class MoreInfoFormDataModel {
  info: any;
  static getInstance<T>(): MoreInfoFormDataModel {
    let model = new MoreInfoFormDataModel();

    model.globalParameters = new Map();
    model.isSelfDataLoad = true;
    model.items = [];
    model.apiDataUrl = "";
    model.formData = {};
    model.mode = "add";
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

export class MoreInfoFormModel {
  description: any;
  updatedOn: any;
  updatedBy: any;
  updateId: any;

}

export enum CLICK_EVENT {
  ON_ITEM_CLICK = "item_click",
}
