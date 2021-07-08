import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BarLineComboChartA1A1Model, BarLineComboChartA1ConfigModel } from './bar-line-combo-chart-a1-model';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ToastrService } from 'ngx-toastr';
// import { WigetConstants } from '../../widget-constants';
import { WidgetConstants } from '../../../widget-utility/widget-constants';
import { ErrorCodes } from 'src/app/models/common/error-codes';
declare var google: any;

@Component({
  selector: 'app-bar-line-combo-chart-a1',
  templateUrl: './bar-line-combo-chart-a1.component.html',
  styleUrls: ['./bar-line-combo-chart-a1.component.css']
})
export class BarLineComboChartA1Component implements OnInit {

  chartdata = [];

  @Input() dataModel: BarLineComboChartA1A1Model;
  @Input() configModel: BarLineComboChartA1ConfigModel;

  @ViewChild('chart', { static: false }) chart: ElementRef;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toastnotificationservice: ToastrService, //TODO: This service need remove from this and place at common place
  ) { }

  ngOnInit() {
    this.configModel.CallerToComp.addListener(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA, () => {
      this.RefreshData();
    })
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
    reqData.data = this.dataModel.apireqdata;
    reqData.data.id = this.dataModel.widgetinstanceid;

    this._serverApi.post<any, any>(apiUrlConst, reqData.data).subscribe(response => {
      if (response) {
        this.dataModel.showChart = true;
        this.convertData(response);
        this._changeDetectorRef.detectChanges();
      }
    }, error => { // TODO: this code need to move in common place
      this.dataModel.showChart = false;
      this._changeDetectorRef.detectChanges();
      switch (error.code) {
        case ErrorCodes.INVALID_USER_ACCESS:
          this._toastnotificationservice.error('Invalid User Access');
          break;
      }
    });
  }

  convertData(resp) {

    this.chartdata = [];
    let tempData = [];
    resp.data.forEach((item) => {
      let itemData = [];
      this.dataModel.columndata.forEach(colitem => {
        const vkey = Object.keys(item).find((key) => key == colitem.name);
        const val = item[vkey];
        itemData.push(val);
      });
      tempData.push(itemData);
    });

    this.chartdata = tempData;

    google.load('visualization', '45.2', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);

  }

  drawChart = () => {

    var dataTable = new google.visualization.DataTable();

    this.dataModel.columndata.forEach(colItem => {
      dataTable.addColumn(colItem.datatype, colItem.name);
    });

    dataTable.addRows(this.chartdata);

    var chart = new google.visualization.ComboChart(this.chart.nativeElement);
    chart.draw(dataTable, this.dataModel.options);

  }

}
