import { Component, OnInit, Input } from '@angular/core';
import { LineChart } from '../../../../data';
import { LineChartA2Model, LineChartA2ConfigModel, LineChartA2ItemDataModel, LineChartA2ItemSeriesDataModel } from './line-chart-a2-model';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { WidgetConstants } from '../../../widget-utility/widget-constants';
import * as d3 from 'd3';
import { curveNatural, curveLinear } from 'd3-shape';
import { WidgetComponentBase } from 'src/app/modules/widget-utility/widget-component-base';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ValidationService } from 'src/app/services/common/validation.service';

@Component({
  selector: 'app-line-chart-a2',
  templateUrl: './line-chart-a2.component.html',
  styleUrls: ['./line-chart-a2.component.css']
})
export class LineChartA2Component extends WidgetComponentBase implements OnInit {

  setFieldData() {
    // throw new Error('Method not implemented.');
  }
  setMode(responseDataModel: any) {
    // throw new Error('Method not implemented.');
  }
  SetValue(responseDataModel: any) {
    // throw new Error('Method not implemented.');
  }

  line: any[];
  view: any[] = [700, 300];

  @Input() dataModel: LineChartA2Model;
  @Input() configModel: LineChartA2ConfigModel;

  // options

  showLabels: boolean = true;
  animations: boolean = true;


  xAxisLabel: string = 'Year';

  title: string = '';



  constructor(
    private formBuilder: FormBuilder,
    private _serverApi: ServerApiInterfaceServiceService,
    private datepipe: DatePipe,
    private _router: Router,
    public _validationService: ValidationService,
    public _notificationService: NotificationService
  ) {
    super(formBuilder, _serverApi, datepipe, null);
  }



  ngOnInit() {
    super.wgOnInint();
    // this.configModel.CallerToComp.addListener(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA, () => {
    //   this.RefreshData();
    // })
  }

  getCurve() {
    switch (this.dataModel.lineChartConfig.curveType) {
      case "curveNatural":
        return curveNatural;
      default:
        return curveLinear;
    }
  }

  // InitComponent() {
  //   if (this.dataModel.isSelfDataLoad) {
  //     this.RefreshData();
  //   }


  // }




  ConvertData(resp) {
    let tempData = [];
    let chartData = new Map<string, LineChartA2ItemSeriesDataModel[]>();
    if(resp?.data &&  resp.data.length > 0){
    resp.data.forEach(item => {
      if (chartData.has(item.parentName)) {
        const seriesItem = new LineChartA2ItemSeriesDataModel();
        seriesItem.name = item.name;
        seriesItem.value = item.value;
        let seriesData = chartData.get(item.parentName)
        seriesData.push(seriesItem);
        chartData.set(item.parentName, seriesData)
      } else {
        const seriesItem = new LineChartA2ItemSeriesDataModel();
        seriesItem.name = item.name;
        seriesItem.value = item.value;
        chartData.set(item.parentName, [seriesItem]);
      }
    });

    chartData.forEach((key, value) => {
      const lineChartItem = new LineChartA2ItemDataModel();
      lineChartItem.name = value;
      lineChartItem.series = key;
      tempData.push(lineChartItem)
    });

    this.dataModel.items = tempData;
  }
    // this.dataModel.items = resp.data;
  }
}
