import { EventEmitter } from 'events';
import { IWidget } from '../../../../data';

export class PieChartA3ConfigModel {
    static getInstance<T>(): PieChartA3ConfigModel {
        let model = new PieChartA3ConfigModel();
        return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    public static readonly CALLER_TO_COMP_PREPARE_DATA = "PREPARE_DATA"
    public static readonly COMP_TO_CALLER_GET_API_PARAM = "GET_API_PARAM"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class PieChartA3Model implements IWidget {
    

    static getInstance<T>(): PieChartA3Model {
        let model = new PieChartA3Model();
        model.pieChartConfig = new PieChartA3DataModel();
        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        model.iconname = '';
        model.items = [];
        model.totalCount = 0;
        model.showDateDisplay = true;
        model.showTotalCount = true;
        model.piechartheight = "200px";
        // model.widgetStyle = {
        //     "background-color": " #4D9BDA",
        //     "width": "100%",
        //     "height": "100%"
        // }
        // model.pieChartConfig = new PieChartA3DataModel();
        // model.piechartheight = "100px";
        model.title = ''
        model.apiDataUrl = ''
        model.titleDate = new Date();
       // model.pieChartConfig.legendTitle = '';
        model.dataRenderMode = "server";


        return model
    }

    // static getDefaultInstance<T>(): PieChartA3Model {

    //     let instance = this.getInstance();

    //     instance.dataRenderMode = "dev";

    //     instance.devData = {};

    //     //instance.legendData = instance.dataItems.map(d => d['extra']['displayName']);

    //     // var dataItems =
    //     // {

    //     //     "data": [
    //     //         { "code": "Admin", "itemcount": 100, "name": "Admin", "value": 100 },
    //     //         { "code": "C Account", "itemcount": 200, "name": "C Account", "value": 100 },
    //     //         { "code": "S Account", "itemcount": 100, "name": "S Account", "value": 200 },
    //     //         { "code": "K Account", "itemcount": 100, "name": "K Account", "value": 100 }
    //     //     ]

    //     // };


    //    // instance.title = "Bulk Upload Tool Utilization";
    //   //  instance.devData.items = dataItems;

    //     return instance;
    // }
    colorScheme: any;
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
    items: PieChartA3ItemDataModel[];
    legendColor: any;
    legendData: any;
    pieChartConfig: PieChartA3DataModel;
    piechartheight: string;
    widgetStyle: {};
    single: any[];
    activeEntries = [];
    datatitle: any;
    apireqdata: any = {};
   
   
}

export class PieChartA3DataModel {
    view: any[] = [450, 300];
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
    // showLabels = true;
    // explodeSlices = false;
    // doughnut = false;
    // hideLegend = true;
    // hideLabels = false;
    // gradient = false;
    // legendTitle;
    gradient: boolean = false;
    showLegend: boolean = true;
    showLabel: boolean = false;
    isDoughnut: boolean = false;
    legendPosition: string = "left";
    showLegendTitle: boolean = true;
    colorScheme ="ocean"
}


export class PieChartA3ItemDataModel {
    code: string;
    name: string;
    value: number;
    total: number;
    extra: any;
}




