import { EventEmitter } from 'events';

export class BarChartA5ConfigModel {
    static getInstance<T>(): BarChartA5ConfigModel {
        let model = new BarChartA5ConfigModel();
        return model
    }

    public static readonly COMP_TO_CALLER_CONVERT_DATA = "CONVERT_DATA"
    public static readonly COMP_TO_CALLER_GET_API_PARAM = "GET_API_PARAM"
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class BarChartA5Model {

    static getInstance<T>(): BarChartA5Model {
        let model = new BarChartA5Model();

        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        model.title = '';
        // model.items = [];
        // model.xAxisBarLabels = [];
        model.barChartConfig = new BarChartA5DataModel();
        return model
    }
    isSelfDataLoad: boolean = true;
    dataRenderMode: string;
    id: number;
    widgetinstanceid: number;
    tag: any;
    globalParameters: Map<string, any>;
    devData: any;
    apiDataUrl: string;
    title: string;
    items: BarChartA5ItemDataModel[];
    barChartConfig: BarChartA5DataModel;
    backgoundColor: string;
    showChart: boolean;
    widgetStyle: {};
    vlStyle: {};
    apireqdata: any = {};
}

export class BarChartA5DataModel {
    customColors = [
    ];
    view: any[] = [];
    gradient = false;
    animations = true;
    xAxis = true;
    yAxis = true;
    legend = true;
    showXAxisLabel = false;
    showYAxisLabel = false;
    xAxisLabel = '';
    legendTitle = '';
    yAxisLabel = '';
    colorScheme: any =  {
        domain: ['#F6B900', '#00CD98', '#5351FB', '#F64000']
      };
    legendPosition: string = "right"
    showGridLines:boolean = true;
    xAxisBarLabels: [];
    schemeType:any = 'ordinal';
    barPadding:any = 12;
}


export class BarChartA5ItemDataModel {
    name: string;
    series: any;
}

export class BarChartA5ItemSeriesDataModel {
    name: string;
    value: number;
}