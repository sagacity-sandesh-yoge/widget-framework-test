import { EventEmitter } from 'events';

export class LineChartA2ConfigModel {
    static getInstance<T>(): LineChartA2ConfigModel {
        let model = new LineChartA2ConfigModel();
        return model
    }

    public static readonly COMP_TO_CALLER_CONVERT_DATA = "CONVERT_DATA"
    public static readonly COMP_TO_CALLER_GET_API_PARAM = "GET_API_PARAM"
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();
}

export class LineChartA2Model {

    static getInstance<T>(): LineChartA2Model {
        let model = new LineChartA2Model();
        model.isSelfDataLoad = true;
        model.title = '';
        model.items = [];
        model.lineChartConfig = new LIneChartA2DataModel();
        model.apiDataUrl = '';
        return model
    }
    isSelfDataLoad: boolean;
    id: number;
    tag: any;
    title: string;
    items: LineChartA2ItemDataModel[];
    lineChartConfig: LIneChartA2DataModel;
    apiDataUrl: string;
    widgetinstanceid: number;
    xAxisBarLabels: any[]
}

export class LIneChartA2DataModel {
    customColors = [
        {
            name: "Fail",
            value: '#E52E2D'
        },
        {
            name: "Pass",
            value: '#FFC200'
        },];
    gradient = true;
    showXAxisLabel = false;
    showYAxisLabel = false;
    xAxisLabel = '';
    yAxisLabel = '';
    xAxisBarLabels = '';
    timeline: boolean = false;
    xAxis: boolean = true;
    yAxis: boolean = true;
    legend: boolean = true;
    legendPosition = 'below'
    colorScheme = {
        domain: ['#5AA454', '#E44D25', '#7aa3e5', '#CFC0BB', '#a8385d', '#aae3f5']
      };
      schemeType:any = 'ordinal';  
    view: any[];
    legendTitle:any;
    autoScale:any = true;
    curveFn: any;
    curveType: any;
    trimXAxisTicks:any = false;
}

export class LineChartA2ItemDataModel {
    name: string;
    series: any;
}

export class LineChartA2ItemSeriesDataModel {
    name: string;
    value: number;
}