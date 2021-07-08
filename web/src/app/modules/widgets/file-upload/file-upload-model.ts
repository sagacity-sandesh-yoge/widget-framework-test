import { EventEmitter } from 'events';

export class FileUploadConfigModel {
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();

  static getInstance<T>(): FileUploadConfigModel {
    const model = new FileUploadConfigModel();
    return model;
  }
}

export class FileUploadModel {
  isSelfDataLoad: boolean;
  globalParameters: Map<string, any>;
  apiDataUrl: string;
  widgetinstanceid: number;
  item: FileUploadItemDataModel;
  isGlobalParams: boolean;
  globalParamterKeys: string[];
  apireqdata: any = {};
  submitProperties: any = {};
  paramkeys : string[];
  uploadLabel;
  showUploadButton:boolean;

  static getInstance<T>(): FileUploadModel {
    const model = new FileUploadModel();
    model.globalParameters = new Map();
    model.isSelfDataLoad = true;
    model.apiDataUrl = '';
    model.item = new FileUploadItemDataModel();
    model.globalParamterKeys = [];
    model.paramkeys = [];
    model.isGlobalParams = false;
    model.submitProperties = Object();
    model.uploadLabel = 'Upload';
    model.showUploadButton = true;
    return model;
  }
}

export class FileUploadItemDataModel {
  // accept = "file_extension | audio/* | video/* | image/* | media_type"
  accept: string;
  // Maximum file size allowed in bytes.
  maxFileSize: number;
  multiple: boolean;
  url: string;
  // When enabled, upload begins automatically after selection is completed.
  auto: string;
}

export class FileSubmitFormModel {

  hasUploadedFiles:any;
  uploadedFiles:any[] = [];
  responseData:any;
} 

export enum CLICK_EVENT {
  ON_ITEM_CLICK = "item_click",
  ON_UPLOAD_CLICK = "upload_click"
}
