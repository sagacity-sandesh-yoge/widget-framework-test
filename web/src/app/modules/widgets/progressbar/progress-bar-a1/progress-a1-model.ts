import { EventEmitter } from 'events';

export class ProgressA1ConfigModel {
    static getInstance<T>(): ProgressA1ConfigModel {
        let model = new ProgressA1ConfigModel();
        return model
    }

    public static readonly COMP_TO_CALLER_ON_CLICK = "ON_CLICK";
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";
    public static readonly CALLER_TO_COMP_PREPARE_DATA = "PREPARE_DATA";
    public static readonly COMP_TO_CALLER_GET_API_PARAM = "GET_API_PARAM";
    public static readonly COMP_TO_CALLER_CONVERT_DATA = "CONVERT_DATA";

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class ProgressA1Model {
    static getInstance<T>(): ProgressA1Model {
        let model = new ProgressA1Model();
        model.globalParameters = new Map();
        model.iconname = '';
        model.isSelfDataLoad = true;
        model.name = 'Quotes due today';

        model.widgetStyle = {
            "background-color": "#132C5C",
            "width": "100%",
            "height": "249px"
        }
        return model
    }

    isSelfDataLoad: boolean;

    id: number;
    widgetinstanceid: number;
    tag: any;
    globalParameters: Map<string, any>;
    apiDataUrl: string;
    name: string;
    iconname: string;
    count: number
    maxvalue: number;
    backGroundColor: string;
    isIconHidden: boolean;
    isProgressbarHidden: boolean;
    redirectionurl: string;
    isCompleted: boolean;
    titleStyle: {}
    countStyle: {}
    widgetStyle: {}
    barConfig: Barconfig[];
}

export interface Barconfig {
    actualvalue: number;
    title: string;
    barcolor: string;
}


export enum CLICK_EVENT {
    ON_CLICK = "ON_CLICK",
}
