import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { multi, barchart, barchart2 } from '../../../../data';
import { BarChartA4ConfigModel, BarChartA4Model, BarChartA4ItemDataModel, BarChartA4ItemSeriesDataModel } from './bar-chart-a4-model';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { WidgetComponentBase } from 'src/app/modules/widget-utility/widget-component-base';
import { ValidationService } from 'src/app/services/common/validation.service';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/common/app-repo.service';

@Component({
  selector: 'app-bar-chart-a4',
  templateUrl: './bar-chart-a4.component.html',
  styleUrls: ['./bar-chart-a4.component.css']
})
export class BarChartA4Component extends WidgetComponentBase implements OnInit {
 
  dataModel: BarChartA4Model;
  configModel: BarChartA4ConfigModel;
  formData: Object;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _toastnotificationservice: ToastrService, //TODO: This service need remove from this and place at common place
    private router: Router,
    public formBuilder: FormBuilder,
    private _appRepoService: AppRepoService,
    public _validationService: ValidationService,
    private datepipe: DatePipe,
    private _appRepoHelperService: AppRepoHelperService

  ) {
    super(formBuilder, _serverApi, datepipe, null);
    this.formData = new Object();
    this.wgFormData = this.formData;
  }

  ngOnInit() {
    super.wgOnInint();
  }

  setFieldData() {
    
  }
 
  ConvertData(resp) {

    var tempData = [];
    let chartData = new Map<string, BarChartA4ItemSeriesDataModel[]>();
    resp.data.forEach(item => {
      if (chartData.has(item.parentName)) {
        const seriesItem = new BarChartA4ItemSeriesDataModel();
        seriesItem.name = item.name;
        seriesItem.value = item.value;
        let seriesData = chartData.get(item.parentName)
        seriesData.push(seriesItem);
        chartData.set(item.parentName, seriesData)
      } else {
        const seriesItem = new BarChartA4ItemSeriesDataModel();
        seriesItem.name = item.name;
        seriesItem.value = item.value;
        chartData.set(item.parentName, [seriesItem]);
      }
    });

    chartData.forEach((key, value) => {
      const lineChartItem = new BarChartA4ItemDataModel();
      lineChartItem.name = value;
      lineChartItem.series = key;
      tempData.push(lineChartItem)
    });
    this.dataModel.items = tempData;
  }

  setMode(responseDataModel: any) {
    
  }
  SetValue(responseDataModel: any) {
    
  }

}
