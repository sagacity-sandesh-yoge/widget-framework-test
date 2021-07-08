import { EventEmitter } from 'events';

export class VerticalMenuConfigModel {
    static getInstance<T>(): VerticalMenuConfigModel {
        let model = new VerticalMenuConfigModel();
        return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class VerticalMenuDataModel {

    static getInstance<T>(): VerticalMenuDataModel {
        let model = new VerticalMenuDataModel();

        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        model.apiDataUrl = '';
        model.menuoptions = [];
        model.navigationkey = '';
        model.filteredMenuoptions = [];
        model.selectedIndex = 0;
        return model;
    }

    isSelfDataLoad: boolean;
    globalParameters: Map<string, any>;
    apiDataUrl: string;
    widgetinstanceid: number;
    menuoptions : NavigationItemModel[];
    filteredMenuoptions : NavigationItemModel[];
    apireqdata: any = {};
    navigationkey: string;
    activeNodeId : number;
    selectedIndex:number;
}

export class NavigationItemModel {
    constructor() {
        this.id ;
        this.displayname = '';
        this.parentid;
        this.icon = '';
        this.code = '';
        this.parentcode = '';
        this.tooltip = '';
        this.children;
        this.isShow=true;
        this.isDisable=false;
        this.backgroundcolor='';
      
    }
    
    id: number;
    displayname: string;
    parentid: number;
    routelink: string;
    icon: string;
    code: string;
    parentcode: string;
    tooltip: string;
    isShow:boolean;
    isDisable:boolean;
    backgroundcolor:string;
    children : NavigationItemModel[]
}

export class TreeNode {
    expandable: boolean;
    name: string;
    level: number;
}

  
export enum CLICK_EVENT {
    ON_ITEM_CLICK = "item_click",
}