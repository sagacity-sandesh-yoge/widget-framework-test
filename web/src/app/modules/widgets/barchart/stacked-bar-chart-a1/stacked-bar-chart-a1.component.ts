import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WidgetComponentBase } from 'src/app/modules/widget-utility/widget-component-base';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/common/validation.service';
import { BarChartA5ItemDataModel, BarChartA5ItemSeriesDataModel } from '../bar-chart-a5/bar-chart-a5-model';
import { StackedBarChartA1ConfigModel, StackedBarChartA1Model } from './stacked-bar-chart-a1-model';


@Component({
  selector: 'app-stacked-bar-chart-a1',
  templateUrl: './stacked-bar-chart-a1.component.html',
  styleUrls: ['./stacked-bar-chart-a1.component.css']
})
export class StackedBarChartA1Component extends WidgetComponentBase implements OnInit {
 
  dataModel: StackedBarChartA1Model;
  configModel: StackedBarChartA1ConfigModel;

  constructor(
    private formBuilder: FormBuilder,
    private _serverApi: ServerApiInterfaceServiceService,
    private datepipe: DatePipe,
    private _router: Router,
    public _validationService: ValidationService
  ) {
    super(formBuilder, _serverApi, datepipe, null);
  }

  ngOnInit() {
    this.wgOnInint();
  }

  setFieldData() {
    
  }
  setMode(responseDataModel: any) {
    
  }
  SetValue(responseDataModel: any) {
   
  }
  

  // ConvertData(resp) {
  //   var tempData = [];
  //   // resp = JSON.parse(resp)
  //   // this.dataModel.barChartConfig.xAxisBarLabels.forEach(label => {
  //   //   let filterItems = resp.data.filter((item) => item.name1 == label);

  //   //   const barChartItem = new BarChartA5ItemDataModel();
  //   //   barChartItem.name = label;
  //   //   barChartItem.series = [];
  //   //   if (filterItems.length > 0) {
  //   //     filterItems.forEach(item => {
  //   //       const seriesData = new BarChartA5ItemSeriesDataModel;
  //   //       seriesData.name = item.name2;
  //   //       seriesData.value = item.value;
  //   //       barChartItem.series.push(seriesData);
  //   //     });
  //   //   }

  //   //   tempData.push(barChartItem);

  //   // });
  //   // this.dataModel.items = tempData;
  //   this.dataModel.items = resp.data;
  // }


  ConvertData(resp) {

    var tempData = [];
    let chartData = new Map<string, BarChartA5ItemSeriesDataModel[]>();
    if(resp?.data &&  resp.data.length > 0){
    resp.data.forEach(item => {
      if (chartData.has(item.parentName)) {
        const seriesItem = new BarChartA5ItemSeriesDataModel();
        seriesItem.name = item.name;
        seriesItem.value = item.value;
        let seriesData = chartData.get(item.parentName)
        seriesData.push(seriesItem);
        chartData.set(item.parentName, seriesData)
      } else {
        const seriesItem = new BarChartA5ItemSeriesDataModel();
        seriesItem.name = item.name;
        seriesItem.value = item.value;
        chartData.set(item.parentName, [seriesItem]);
      }
    });

    chartData.forEach((key, value) => {
      const lineChartItem = new BarChartA5ItemDataModel();
      lineChartItem.name = value;
      lineChartItem.series = key;
      tempData.push(lineChartItem)
    });
    this.dataModel.items = tempData;

  }
  }

}

