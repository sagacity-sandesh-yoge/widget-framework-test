import { EventEmitter } from 'events';

export class CompanyListBtnA1ConfigModel {
    static getInstance<T>(): CompanyListBtnA1ConfigModel {
        let model = new CompanyListBtnA1ConfigModel();
        return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class CompanyListBtnA1DataModel {
    globalParamterKeys: any;
    isGlobalParams: boolean;

    static getInstance<T>(): CompanyListBtnA1DataModel {
        let model = new CompanyListBtnA1DataModel();
        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        model.buttonName = '';
        model.apiDataUrl = '';
        model.updateId = null;
        model.submitProperties = Object();
        model.displayName = '';
        model.cssClass = ''
        model.iconCssClass = ''
        model.icon
        model.queryActionDecissionKey;
        model.globalParamterKeys;
        model.isGlobalParams = false;
        model.btnColor;
        model.fontColor
        return model;
    }
    fontColor: any;
    btnColor: any;
    icon: string;
    cssClass: string
    iconCssClass: string
    queryActionDecissionKey;
    isSelfDataLoad: boolean;
    displayName: string;
    id: number;
    widgetinstanceid: number;
    globalParameters: Map<string, any>;
    apiDataUrl: string;
    updateId : number;
    isRequiredPermissionConfig: boolean;
    buttonName: string;

    submitProperties:{};
    apireqdata: any = {};
    widgetStyle: {};
    vlStyle: {};
}