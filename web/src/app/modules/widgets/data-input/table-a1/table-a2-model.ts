import { EventEmitter } from 'events';

export class TableA2ConfigModel {
    static getInstance<T>(): TableA2ConfigModel {
        let model = new TableA2ConfigModel();
        return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class TableA2Model {

    static getInstance<T>(): TableA2Model {
        let model = new TableA2Model();
        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        model.title = '';
        model.items = [];
        model.template;
        model.hideSearchOption=false;
        model.showHeader = false;
        model.isExpandableRow = false;
        model.showBreadcrumbs = false;
        model.eventMapOnCol = '';
        model.apiDataUrl = '';
        model.breadcrumbCode = '';
        model.legend;
        model.submitProperties = Object();
        model.pageSize = 5;
        model.pageSizeOptions = [5, 10, 20];
        model.globalparamkeys=[];
        model.addButttonVisible;
        model.searchPosition = ''; 
        return model;
    }
    searchPosition: string;
    addButttonVisible: boolean;
    isSelfDataLoad: boolean;
    legend;
    template;
    id: number;
    widgetinstanceid: number;
    globalParameters: Map<string, any>;
    apiDataUrl: string;

    title: string;
    items: any[];

    columndata: TableA2ColumnDataItemModel[];
   // expandedColData: TableA2ColumnDataItemModel[];
   expandedColData

    breadcrumbCode: string;
    showBreadcrumbs: boolean;
    showTable: boolean;
    showHeader: boolean;
    isExpandableRow: boolean;
    apireqdata: any = {};
    submitProperties: any = {};
    pageSize: number;
    pageSizeOptions: number[] = [];
    hideSearchOption:boolean;
    eventMapOnCol: string;
    globalparamkeys:string[];
    // durationtype: number;

    widgetStyle: {};
    vlStyle: {};
    isSort:boolean;
    defaultSortBy:string;
    defaultSortDirection:string;
}

export class TableA2ColumnDataItemModel {
    constructor() {
        this.field = '';
        this.name = '';
        this.isClickable = false;
        this.clickmethod = '';
        this.isIcon = false;
        this.isAltRowClasses = false;
        this.altRowClasses = new Map();
        this.isExpandable = false;
        this.eventActionName = "";
        this.isTooltip = false;
        this.tooltipText = "";
        this.tooltipPosition = "";
        this.widthperc;

    }
    widthperc;
    field: string;
    name: string;
    isClickable: boolean;
    isIcon: boolean;
    clickmethod: string;
    class: string;
    isAltRowClasses: boolean;
    altRowClasses: Map<string, string>;
    isExpandable: boolean;
    eventActionName: string;
    isProgressBar: string;
    isTooltip: boolean;
    tooltipText: string;
    tooltipPosition: string;
    statuscolor: string;
    isSort:boolean;

}

export class TemplateDataModel{
    sr
			vehicle
			category
			fuel
			engineModelNo
			emissionnorms
			symbol
			symbol2
			description : ExpandedDataModel[]
}

export class ExpandedDataModel{
 table
    multiple
    version
    file
    isUploaded
}

export enum CLICK_EVENT {
     ON_ITEM_CLICK = "item_click",
     ON_ADD_CLICK = "add_click",
}







