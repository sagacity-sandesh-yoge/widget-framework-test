import { EventEmitter } from "events";

export class DocumentViewerConfigModel {
  static getInstance<T>(): DocumentViewerConfigModel {
    let model = new DocumentViewerConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class DocumentViewerDataModel {
  quickFilterType: any;
  filter: any;
  //'google' | 'office' | 'mammoth' | 'pdf' | 'url';
  viewerType:any = 'google'


  static getInstance<T>(): DocumentViewerDataModel {
    let model = new DocumentViewerDataModel();

    model.globalParameters = new Map();
    model.isSelfDataLoad = true;
    model.apiDataUrl = "";
    model.id;
    model.initDataUrl = "";
    model.globalParamterKeys = [];
    model.isGlobalParams = false;
    model.isEdit = false;
    model.validators = {};
    model.url=''
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
  url:any=''
  mimeType:string='';
}

export enum CLICK_EVENT {
  ON_ITEM_CLICK = "item_click",
}

export enum VIEWER_TYPE {
  GOOGLE = 'google',
  OFFICE = 'office' , 
  MAMMOTH = 'mammoth', 
  PDF = 'pdf',
  URL = 'url',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}