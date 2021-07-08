import { EventEmitter } from 'events';

export class StepperA1ConfigModel {

    static getInstance<T>(): StepperA1ConfigModel {
        let model = new StepperA1ConfigModel();
        return model
    }

    public static readonly COMP_TO_CALLER_GET_API_PARAM = "GET_API_PARAM"
    public static readonly COMP_TO_CALLER_ON_CLICK = "ON_CLICK"
    public static readonly COMP_TO_CALLER_ON_CLICK_HOVER = "ON_CLICK_HOVER"
    public static readonly COMP_TO_CALLER_CONVERT_DATA = "CONVERT_DATA"
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    public static readonly CALLER_TO_COMP_PREPARE_DATA = "PREPARE_DATA"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class StepperA1Model {
    static getInstance<T>(): StepperA1Model {
        let model = new StepperA1Model();

        model.globalParameters = new Map();
        model.isSelfDataLoad = false;
        model.isForDashboard = false;
        model.apiDataUrl = '';
        model.items = [];
        model.apireqdata = new Object();
        return model
    }

    isSelfDataLoad: boolean;

    id: number;
    widgetinstanceid: number;
    tag: any;
    globalParameters: Map<string, any>;

    apiDataUrl: string;
    apireqdata: {};

    isForDashboard: boolean;
    items: StepperA1ItemModel[];
}

export class StepperA1ItemModel {
    id: number;
    tag: any;
    redirectionurl: string;
    displayheadericon: string;
    redirectioniconname: string;
    redirectioniconpath: string;
    isHoverIconDisable: boolean = false;
    name: string;
    color: string;
    iconname: string;
    isCompleted: boolean;
    iscurrentstate: boolean;
    currentnodename: string;
    isvisible: string;
    countvisible: string;
}

export enum CLICK_EVENT {
    ON_HOVER_CLICK = "ON_HOVER_CLICK",
    ON_CLICK = "ON_CLICK",
}


export class StepperDataResponse {
    tasktypeuid: number;
    tasktypecode: string;
    tasktypename: string;
    tasktypesequence: number
    tasktypecolor: string;
    tasktypeiconname: string;
    taskcount: number;
    taskcountpercentage: number;
    producttypename: string;
    redirectionurl: string;
}
