import { EventEmitter } from 'events';

export class BarLineComboChartA1ConfigModel {
    static getInstance<T>(): BarLineComboChartA1ConfigModel {
        let model = new BarLineComboChartA1ConfigModel();
        return model
    }

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class BarLineComboChartA1A1Model {

    static getInstance<T>(): BarLineComboChartA1A1Model {
        let model = new BarLineComboChartA1A1Model();

        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        model.columndata = [];
        model.tooltipdata = [];
        model.isSelfDataLoad = true;
        model.showChart = false;
        model.hasTooltip = false;
        model.title = '';
        model.apiDataUrl = '';
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

    title: string;
    showChart: boolean;
    hasTooltip: boolean;
    columndata: BarLineComboChartA1A1ModelColumnItemModel[];
    tooltipdata: BarLineComboChartA1A1ModelColumnItemModel[];
    tooltiphtmltag: string;
    widgetStyle: {};
    options: {};
}

export class BarLineComboChartA1A1ModelColumnItemModel {
    constructor() {
        this.datatype = '';
        this.name = '';
        this.code = '';
    }
    datatype: string;
    name: string;
    code: string;
}
