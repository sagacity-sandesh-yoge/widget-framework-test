import { EventEmitter } from "events";

export class DynamicFilterConfigModel {
  static getInstance<T>(): DynamicFilterConfigModel {
    let model = new DynamicFilterConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class DynamicFilterDataModel {
  quickFilterType: any;
  filter: any;
  static getInstance<T>(): DynamicFilterDataModel {
    let model = new DynamicFilterDataModel();

    model.globalParameters = new Map();
    model.isSelfDataLoad = true;
    model.apiDataUrl = "";
    model.formData = new DynamicFilterFormModel();
    model.id;
    model.initDataUrl = "";
    model.globalParamterKeys = [];
    model.isGlobalParams = false;
    model.isEdit = false;
    model.validators = {};
    model.isSummaryPage = false;
    model.tooltip = {};
    model.operatorList = [];
    model.caseStatusType = [];
    model.type = [];
    model.Priority = [];
    model.quickFilterType="new";
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
  caseStatusType: any[];
  tag: any[];
  type: any[];
  Priority:any[];
}

export enum CLICK_EVENT {
  ON_ITEM_CLICK = "item_click",
}

export class DynamicFilterFormModel {
  ApexNumber: any;
  InternalNumber: any;
  QuotationNo: any;
  UploadedBy: any;
  CaseStatusType: any;
  HasUploadDate: any;
  Type: any;
  Operator: any;
  StartDate: any;
  EndDate: any;
  completionEndDate: any;
  completionStartDate: any;
  Operator2: any;
  Tag: any;
  Model: any;
  CaseDescription: any;
  IsCertificateReleased:any;
  MyCaseAction:any;

  Priority:any;
  OrganizationName:any;  
  CreatedByName: any;
}
