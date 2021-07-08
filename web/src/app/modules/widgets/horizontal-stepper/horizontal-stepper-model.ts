import { EventEmitter } from 'events';

export class HorizontalStepperConfigModel {
    static getInstance<T>(): HorizontalStepperConfigModel {
        let model = new HorizontalStepperConfigModel();
        return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class HorizontalStepperModel {
    static getInstance<T>(): HorizontalStepperModel {
        let model = new HorizontalStepperModel();
        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        // model.item = new HorizontalStepperItemModel();
        model.apiDataUrl = '';
        model.isGlobalParams = false;
        model.globalParamterKeys = [];
        model.items = [];
        return model;
    }
    globalParamterKeys: string[];
    isGlobalParams: boolean;
    isSelfDataLoad: boolean;
    fieldPermissions: Map<string, string>
    id: number;
    widgetinstanceid: number;
    globalParameters: Map<string, any>;
    apiDataUrl: string;
    // item: HorizontalStepperItemModel;
    apireqdata: any = {};
    items: StepperModel[]
    selectedId: number;
    queryActionDecissionKey: any;
    navigationKey: string;
    hideSelectedIcon:boolean;
}

export class HorizontalStepperFormDataModel {
    uiMetaData: any;
}


export class StepperModel {
    id: number = 0;
    name: string;
    status: any;
    redirectUrl: string;
    uiMetaData: string;
    icon: string;
    statusIcon: string;
    NodeOrder : number
}


export enum CLICK_EVENT {
    ON_ITEM_CLICK = "item_click",
}
