import { EventEmitter } from 'events';
// import { IWidget } from '../../../../data';

export class StatReportA1ConfigModel {
    static getInstance<T>(): StatReportA1ConfigModel {
        let model = new StatReportA1ConfigModel();
        return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    public static readonly CALLER_TO_COMP_PREPARE_DATA = "PREPARE_DATA"
    public static readonly COMP_TO_CALLER_GET_API_PARAM = "GET_API_PARAM"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();

}

export class StatReportA1Model {

    static getInstance<T>(): StatReportA1Model {
        let model = new StatReportA1Model();
        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        model.iconname = '';
        model.maintitle = 'Policies';
        model.maintitlecount = '10.9%';
        model.section1text = '';
        model.section2text = '';
        model.section1count = '';
        model.section2count = '';
        // model.items = [];
        model.statreportheight = "200px";
        model.widgetStyle = {
            "background-color": " #4D9BDA",
            "width": "100%",
            "height": "100%"
        }

        model.title = ''
        model.apiDataUrl = ''
        model.dataRenderMode = "server";

        return model
    }

    static getDefaultInstance<T>(): StatReportA1Model {

        let instance = this.getInstance();
        instance.dataRenderMode = "dev";
        instance.devData = {};
        var dataItems =
        {

            "data": [
                { "code": "Admin", "itemcount": 100, "name": "Admin", "value": 100 },
                { "code": "C Account", "itemcount": 200, "name": "C Account", "value": 100 },
                { "code": "S Account", "itemcount": 100, "name": "S Account", "value": 200 },
                { "code": "K Account", "itemcount": 100, "name": "K Account", "value": 100 }
            ]

        };

        instance.title = "Policies";
        instance.devData.items = dataItems;

        return instance;
    }

    id: string;
    widgetinstanceid: number;
    apiDataUrl: string;
    globalParameters: Map<string, any>;
    dataRenderMode: string;
    devData: any;
    isSelfDataLoad: boolean;
    iconname: string;
    title: string;
    statreportheight: string;
    widgetStyle: {};
    maintitle: string;
    maintitlecount: string;
    section1text: string;
    section2text: string;
    section1count: string;
    section2count: string;
}






