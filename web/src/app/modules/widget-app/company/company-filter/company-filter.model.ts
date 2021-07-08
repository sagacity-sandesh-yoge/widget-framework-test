import { EventEmitter } from 'events';

export class CompanyFilterConfigModel {
    static getInstance<T>(): CompanyFilterConfigModel {
        let model = new CompanyFilterConfigModel();
        return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class CompanyFilterDataModel {

    static getInstance<T>(): CompanyFilterDataModel {
        let model = new CompanyFilterDataModel();

        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        model.apiDataUrl = '';
        model.formData = new CompanyFilterFormModel();
        model.id;
        model.initDataUrl = '';
        model.globalParamterKeys = [];
        model.isGlobalParams = false;
        model.isEdit = false;
        model.validators = {}
        model.isSummaryPage = false
        model.tooltip = {};
        model.operatorList = [];
        return model;
    }
    isSummaryPage: boolean
    mode: string;
    initDataUrl: string;
    isGlobalParams: boolean;
    globalParamterKeys: string[];
    isSelfDataLoad: boolean;
    fieldPermissions: Map<string, string>
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
    permission: any
    tooltip: any;
    operatorList:any[];
}


export enum CLICK_EVENT {
    ON_ITEM_CLICK = "item_click",
}

export class CompanyFilterFormModel {
    companyname: any;
    status: any;
    panno: any;
    tanno: any;    
    partystatus: any;
    partycode: any;
    MSMENo: any;   
}