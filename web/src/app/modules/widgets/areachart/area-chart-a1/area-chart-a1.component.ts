import { Component, OnInit, NgModule, Input, AfterViewInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ServerApiInterfaceServiceService } from "src/app/server-api-interface-service.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ErrorCodes } from "src/app/models/common/error-codes";
import { WidgetConstants } from "../../../widget-utility/widget-constants";
import { AreaChartA1ConfigModel, AreaChartA1Model, AreaChartA1ItemDataModel, AreaChartA1ItemSeriesDataModel } from './area-chart-a1-model';

@Component({
  selector: 'app-area-chart-a1',
  templateUrl: './area-chart-a1.component.html',
  styleUrls: ['./area-chart-a1.component.css']
})
export class AreaChartA1Component implements OnInit {
  @Input() dataModel: AreaChartA1Model;
  @Input() configModel: AreaChartA1ConfigModel;

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  legendTitle: string;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d']

  };

  view: any[] = [700, 400];

  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _toastnotificationservice: ToastrService,//TODO: This service need remove from this and place at common place
    private router: Router) { }


  ngOnInit() {
    this.configModel.CallerToComp.addListener(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA, () => {
      this.RefreshData();
    })

  }
  onSelect(event) {
    console.log(event);
  }

  InitComponent() {
    if (this.dataModel.isSelfDataLoad) {
      this.RefreshData();
    }


  }

  RefreshData() {
    this.getApiData();
  }

  getApiData() {
    const apiUrlConst = this.dataModel.apiDataUrl;
    let reqData = Object();
    reqData.data = Object();
    reqData.data.id = this.dataModel.widgetinstanceid;
    // reqData.data.durationtype = this.dataModel.durationtype;

    this._serverApi.post<any, any>(apiUrlConst, reqData.data).subscribe(
      response => {
        if (response) {
          this.convertData(response);
        }
      },
      error => {


        // TODO: this code need to move in common place
        switch (error.code) {
          case ErrorCodes.INVALID_USER_ACCESS:
            this._toastnotificationservice.error("Invalid User Access");
            break;
        }
      }
    );
  }

  convertData(resp) {
    let tempData = [];
    let chartData = new Map<string, AreaChartA1ItemSeriesDataModel[]>();
    resp.data.forEach(item => {
      if (chartData.has(item.name1)) {
        const seriesItem = new AreaChartA1ItemSeriesDataModel();
        seriesItem.name = item.name2;
        seriesItem.value = item.value;
        let seriesData = chartData.get(item.name1)
        seriesData.push(seriesItem)
        chartData.set(item.name1, seriesData)
      } else {
        const seriesItem = new AreaChartA1ItemSeriesDataModel();
        seriesItem.name = item.name2;
        seriesItem.value = item.value;
        chartData.set(item.name1, [seriesItem]);
      }
    });

    chartData.forEach((key, value) => {
      const lineChartItem = new AreaChartA1ItemDataModel();
      lineChartItem.name = value;
      lineChartItem.series = key;
      tempData.push(lineChartItem)
    });

    this.dataModel.items = tempData;


  }


}
