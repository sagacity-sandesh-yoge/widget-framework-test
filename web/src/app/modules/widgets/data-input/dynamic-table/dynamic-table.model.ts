import { EventEmitter } from 'events';

export class DynamicTableDataConfigModel {
    static getInstance<T>(): DynamicTableDataConfigModel {
        let model = new DynamicTableDataConfigModel();
        return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class DynamicTableDataModel {
    isDisplayColumnsPermission: any;

    static getInstance<T>(): DynamicTableDataModel {
        let model = new DynamicTableDataModel();
        model.globalParameters = new Map();
        model.isSelfDataLoad = false;
        model.apiDataUrl = '';
        model.pageSize = 5;
        model.submitProperties = Object();
        model.globalParamterKeys = [];
        model.isDisplayColumnsPermission = false;
        model.columndata = [];
        return model;
    }

  
    submitProperties: any = {};
    isSelfDataLoad: boolean;
    id: number;
    widgetinstanceid: number;
    globalParameters: Map<string, any>;
    apiDataUrl: string;
    pageSize: number;
    columndata: DynamicTableConfigModel[] = [];
    expandedColData: DynamicTableConfigModel[];
    apireqdata: any = {};
    isGlobalParams:boolean;
    globalParamterKeys:[]
    
    sort:SortConfig = new SortConfig();
}

export class SortConfig {
    isSort:boolean;
    defaultSortBy:string;
    defaultSortDirection:string;
}

export class DynamicTableConfigModel {
    constructor() {
        this.field = '';
        this.name = '';
        this.isClickable = false;
        this.clickmethod = '';
        this.isAltRowClasses = false;
        this.altRowClasses = new Map();
        this.isExpandable = false;
        this.isIcon = false;
        this.eventActionName = "";
    }
    field: string;
    name: string;
    isClickable: boolean;
    isIcon: boolean;
    clickmethod: string;
    controlcode:string;
    class: string;
    isAltRowClasses: boolean;
    altRowClasses: Map<string, string>;
    isExpandable: boolean;
    eventActionName: string;
    colType: string;
    labelField:string;
    widthperc:string;
    isDate:string;
    isSort: boolean;
    tooltip:string
}

export enum CLICK_EVENT {
    ON_ITEM_CLICK = "item_click",
    ON_ADD_CLICK = "add_click",
    ON_DOWNLOAD_CLICK = "download_click",
    ON_RADIO_BTN_CLICK = "radio_btn_click",
    ON_EXPORT_CLICK = "export_click",
    ON_SYNC_CLICK ="sync_click"
}






