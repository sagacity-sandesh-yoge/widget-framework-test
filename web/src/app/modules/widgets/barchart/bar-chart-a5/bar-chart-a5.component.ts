import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WidgetComponentBase } from 'src/app/modules/widget-utility/widget-component-base';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/common/validation.service';
import { BarChartA5Model, BarChartA5ConfigModel } from './bar-chart-a5-model';

@Component({
  selector: 'app-bar-chart-a5',
  templateUrl: './bar-chart-a5.component.html',
  styleUrls: ['./bar-chart-a5.component.css']
})
export class BarChartA5Component extends WidgetComponentBase implements OnInit {
 
  dataModel: BarChartA5Model;
  configModel: BarChartA5ConfigModel;

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
  

  ConvertData(resp) {
    var tempData = [];
    // resp = JSON.parse(resp)
    // this.dataModel.barChartConfig.xAxisBarLabels.forEach(label => {
    //   let filterItems = resp.data.filter((item) => item.name1 == label);

    //   const barChartItem = new BarChartA5ItemDataModel();
    //   barChartItem.name = label;
    //   barChartItem.series = [];
    //   if (filterItems.length > 0) {
    //     filterItems.forEach(item => {
    //       const seriesData = new BarChartA5ItemSeriesDataModel;
    //       seriesData.name = item.name2;
    //       seriesData.value = item.value;
    //       barChartItem.series.push(seriesData);
    //     });
    //   }

    //   tempData.push(barChartItem);

    // });
    // this.dataModel.items = tempData;
    this.dataModel.items = resp.data;
  }

}

