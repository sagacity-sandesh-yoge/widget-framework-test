import { EventEmitter } from 'events';

export class ProgressA2ConfigModel {
    static getInstance<T>(): ProgressA2ConfigModel {
        let model = new ProgressA2ConfigModel();
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

export class ProgressA2Model {
    static getInstance<T>(): ProgressA2Model {
        let model = new ProgressA2Model();
        model.globalParameters = new Map();
        model.iconname = '';
        model.items = [];
        model.isSelfDataLoad = true;
        model.name = 'Quotes due today';
        model.title = '';
        model.widgetStyle = {
            "background-color": "#132C5C",
            "width": "100%",
            "height": "249px"
        }
        model.dataRenderMode = "server";
        return model;
    }

    static getDefaultInstance<T>(): ProgressA2Model {

        let instance = this.getInstance();
        instance.dataRenderMode = "dev";
        instance.devData = {};

        var dataItems =
        {
            "data": [
                { "error_code": "Error 1", "error_count": 3470, "brightness_value": "brightness_1", "status": "Primary" },
                { "error_code": "Error 2", "error_count": 3410, "brightness_value": "brightness_1", "status": "Success" },
                { "error_code": "Error 3", "error_count": 310, "brightness_value": "brightness_1", "status": "Warning" },
                { "error_code": "Error 4", "error_count": 610, "brightness_value": "brightness_1", "status": "Danger" },
            ]
        };

        instance.title = "Error Statistics";
        instance.devData.items = dataItems;
        return instance;
    }

    isSelfDataLoad: boolean;
    id: number;
    dataRenderMode: string;
    devData: any;
    widgetinstanceid: number;
    tag: any;
    globalParameters: Map<string, any>;
    apiDataUrl: string;
    name: string;
    items: ProgressBarA2ItemDataModel[];
    iconname: string;
    count: number;
    title: string;
    actualvalue: number;
    maxvalue: number;
    backGroundColor: string;
    isIconHidden: boolean;
    isProgressbarHidden: boolean;
    redirectionurl: string;
    isCompleted: boolean;
    titleStyle: {}
    countStyle: {}
    widgetStyle: {}
}



export enum CLICK_EVENT {
    ON_SUBMIT = "on_submit",
}


export class ProgressBarA2ItemDataModel {
    error_name: string;
    error_count: number;
    error_brightness: string;
    status: string;

}