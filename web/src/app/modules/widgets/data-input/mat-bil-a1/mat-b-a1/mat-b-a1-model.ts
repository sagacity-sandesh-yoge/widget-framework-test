import { EventEmitter } from 'events';

export class MatBDataA1ConfigModel {
    static getInstance<T>(): MatBDataA1ConfigModel {
        let model = new MatBDataA1ConfigModel();
        return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class MatBDataA1Model {

    static getInstance<T>(): MatBDataA1Model {
        let model = new MatBDataA1Model();
        model.globalParameters = new Map();
        model.isSelfDataLoad = false;
        model.title = '';
        model.success = "success"
        model.items = [];
        model.isSearchShow;
        model.showHeader = true;
        model.isExpandableRow = false;
        model.showBreadcrumbs = false;
        model.apiDataUrl = '';
        model.breadcrumbCode = '';
        model.searchPosition = '';
        model.widthperc;
        model.addButttonVisible;
        model.hideSearch = false;
        model.pageSize = 5;
        model.submitProperties = Object();
        model.globalParamterKeys = [];
        model.tooltip= {};
        model.exportButttonVisible = false;
        model.syncButttonVisible = false;
        model.isDisplayColumnsPermission = false;
        return model;
    }

    isDisplayColumnsPermission:any;
    tooltip: any;
    submitProperties: any = {};
    exportButttonVisible: boolean;
    syncButttonVisible: boolean;
    addButttonVisible: boolean;
    isSelfDataLoad: boolean;
    success: string;
    searchPosition: string;
    widthperc: number;
    id: number;
    isSearchShow: boolean;
    widgetinstanceid: number;
    globalParameters: Map<string, any>;
    apiDataUrl: string;
    pageSize: number;
    title: string;
    items: MatBDataA1ItemSeriesDataModel[];

    columndata: MatBDataA1ColumnDataItemModel[];
    expandedColData: MatBDataA1ColumnDataItemModel[];

    breadcrumbCode: string;
    showBreadcrumbs: boolean;
    showTable: boolean;
    showHeader: boolean;
    isExpandableRow: boolean;
    apireqdata: any = {};
    widgetStyle: {};
    vlStyle: {};
    hideSearch:boolean;
    isGlobalParams:boolean;
    globalParamterKeys:[]
    isSort:boolean;
    defaultSortBy:string;
    defaultSortDirection:string;
}

export class MatBDataA1ColumnDataItemModel {
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

export class  MatBDataA1ItemSeriesDataModel {
    name: string;
    field : string;
}






