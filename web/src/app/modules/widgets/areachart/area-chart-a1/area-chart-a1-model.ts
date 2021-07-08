import { EventEmitter } from 'events';
// import { IWidget } from '../../../../data';

export class AreaChartA1ConfigModel {
    static getInstance<T>(): AreaChartA1ConfigModel {
        let model = new AreaChartA1ConfigModel();
        return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    public static readonly CALLER_TO_COMP_PREPARE_DATA = "PREPARE_DATA"
    public static readonly COMP_TO_CALLER_GET_API_PARAM = "GET_API_PARAM"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();

}

export class AreaChartA1Model {

    static getInstance<T>(): AreaChartA1Model {
        let model = new AreaChartA1Model();
        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        model.iconname = '';
        model.items = [];
        model.totalCount = 0;
        model.showDateDisplay = true;
        model.showTotalCount = true;
        model.piechartheight = "200px";
        model.widgetStyle = {
            "background-color": " #4D9BDA",
            "width": "100%",
            "height": "100%"
        }
        model.areaChartConfig = new AreaChartA1DataModel();
        model.title = ''
        model.apiDataUrl = ''
        model.titleDate = new Date();
        model.areaChartConfig.legendTitle = '';
        model.dataRenderMode = "server";


        return model
    }

    static getDefaultInstance<T>(): AreaChartA1Model {

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
    items: AreaChartA1ItemDataModel[];
    legendColor: any;
    legendData: any;
    areaChartConfig: AreaChartA1DataModel;
    piechartheight: string;
    widgetStyle: {};
}

export class AreaChartA1DataModel {
    showLegend = true;
    colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };

    legendTitle: string;
}


export class AreaChartA1ItemDataModel {
    name: string;
    series: any;

}

export class AreaChartA1ItemSeriesDataModel {
    name: string;
    value: number;
}



