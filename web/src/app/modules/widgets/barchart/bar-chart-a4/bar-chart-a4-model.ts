import { EventEmitter } from 'events';

export class BarChartA4ConfigModel {
    static getInstance<T>(): BarChartA4ConfigModel {
        let model = new BarChartA4ConfigModel();
        return model
    }

    public static readonly COMP_TO_CALLER_CONVERT_DATA = "CONVERT_DATA"
    public static readonly COMP_TO_CALLER_GET_API_PARAM = "GET_API_PARAM"
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class BarChartA4Model {

    static getInstance<T>(): BarChartA4Model {
        let model = new BarChartA4Model();

        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        model.title = '';
        // model.items = [];
        // model.xAxisBarLabels = [];
        model.barChartConfig = new BarChartA4DataModel();
        return model
    }
    isSelfDataLoad: boolean;
    dataRenderMode: string;
    id: number;
    widgetinstanceid: number;
    tag: any;
    globalParameters: Map<string, any>;
    devData: any;
    apiDataUrl: string;
    title: string;
    items: BarChartA4ItemDataModel[];
    barChartConfig: BarChartA4DataModel;
    backgoundColor: string;
    showChart: boolean;
    widgetStyle: {};
    vlStyle: {};
    apireqdata:any = {}
}

export class BarChartA4DataModel {
    customColors = [
    ];
    view: any[] = [];
    gradient = false;
    animations = true;
    xAxis = true;
    yAxis = true;
    showLegend = true;
    showXAxisLabel = false;
    showYAxisLabel = false;
    xAxisLabel = '';
    legendTitle = '';
    yAxisLabel = '';
    colorScheme: any =  {
        domain: ['#F6B900', '#00CD98', '#5351FB', '#F64000']
      };
    legendPosition: string = "below"
    showGridLines:boolean = true;
    xAxisBarLabels: [];
    schemeType:any = 'ordinal';
}


export class BarChartA4ItemDataModel {
    name: string;
    series: any;
}

export class BarChartA4ItemSeriesDataModel {
    name: string;
    value: number;
}