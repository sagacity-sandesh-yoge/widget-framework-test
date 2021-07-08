import { EventEmitter } from 'events';
import { IWidget } from '../../../../data';

export class PieGridA1ConfigModel {
    static getInstance<T>(): PieGridA1ConfigModel {
        let model = new PieGridA1ConfigModel();
        return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    public static readonly CALLER_TO_COMP_PREPARE_DATA = "PREPARE_DATA"
    public static readonly COMP_TO_CALLER_GET_API_PARAM = "GET_API_PARAM"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class PieGridA1Model implements IWidget {


    static getInstance<T>(): PieGridA1Model {
        let model = new PieGridA1Model();
        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        model.iconname = '';
        model.items = [];
        model.totalCount = 0;
        model.showDateDisplay = true;
        model.showTotalCount = true;
        model.pieGridHeight = "200px";
        model.widgetStyle = {
            "background-color": " #4D9BDA",
            "width": "100%",
            "height": "100%"
        }
        model.pieGridConfig = new PieGridA1DataModel();
        model.pieGridHeight = "200px";
        model.title = ''
        model.apiDataUrl = ''
        model.titleDate = new Date();
        model.pieGridConfig.legendTitle = '';
        model.dataRenderMode = "server";


        return model
    }

    static getDefaultInstance<T>(): PieGridA1Model {

        let instance = this.getInstance();

        instance.dataRenderMode = "dev";

        instance.devData = {};

        //instance.legendData = instance.dataItems.map(d => d['extra']['displayName']);

        var dataItems =
        {

            "data": [
                { "code": "Admin", "itemcount": 100, "name": "Admin", "value": 100 },
                { "code": "C Account", "itemcount": 200, "name": "C Account", "value": 100 },
                { "code": "S Account", "itemcount": 100, "name": "S Account", "value": 200 },
                { "code": "K Account", "itemcount": 100, "name": "K Account", "value": 100 }
            ]

        };


        instance.title = "Bulk Upload Tool Utilization";
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
    showDateDisplay: boolean;
    iconname: string;
    title: string;
    titleDate: Date;
    totalCount: number;
    showTotalCount: boolean;
    items: PieGridA1ItemDataModel[];
    legendColor: any;
    legendData: any;
    pieGridConfig: PieGridA1DataModel;
    pieGridHeight: string;
    widgetStyle: {};
}

export class PieGridA1DataModel {
    showLegend = true;
    customColors = [
        {
            name: "Attention required",
            value: '#E52E2D'
        },
        {
            name: "Meeting expectations",
            value: '#FFC200'
        },
        {
            name: "Exceeding expectations",
            value: '#499907'
        },
        {
            name: "Overdue",
            value: '#AAAAAA'
        }
    ];
    showLabels = true;
    explodeSlices = false;
    doughnut = false;
    hideLegend = true;
    hideLabels = false;
    gradient = false;
    legendTitle;
}


export class PieGridA1ItemDataModel {
    code: string;
    name: string;
    value: number;
    total: number;
    extra: any;
}




