import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { WidgetComponentBase } from 'src/app/modules/widget-utility/widget-component-base';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ValidationService } from 'src/app/services/common/validation.service';
import { PieChartA3ConfigModel, PieChartA3ItemDataModel, PieChartA3Model } from './pie-chart-a3-model';

@Component({
  selector: 'app-pie-chart-a3',
  templateUrl: './pie-chart-a3.component.html',
  styleUrls: ['./pie-chart-a3.component.css']
})
export class PieChartA3Component extends WidgetComponentBase implements OnInit {
 
  @Input() dataModel: PieChartA3Model;
  @Input() configModel: PieChartA3ConfigModel;

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
    this.wgOnInint();
  }

  setFieldData() {
  }
  

  ConvertData(response) {
    // let totalvalue = 0;
    // let temData = [];
    // response.data.forEach(responsePieItem => {
    //   totalvalue = totalvalue + responsePieItem.itemcount;
    // });
    // response.data.forEach(responsePieItem => {
    //   let item = new PieChartA3ItemDataModel();
    //   item.code = responsePieItem.code;
    //   item.name = responsePieItem.name;

    //   item.value = responsePieItem.itemcount;
    //   item.extra = {};
    //   item.extra.displayName = item.name;
    //   let x = (item.value / totalvalue) * 100;
    //   item.extra.displayValue = " " + x + "%";
    //   temData.push(item);
    // });

    // this.dataModel.items = temData;
    // this.dataModel.totalCount = response.count;

    // let datatitles = temData.map(d => d["extra"]["displayName"]);
    // this.dataModel.datatitle = datatitles;
    // this.dataModel.legendData = temData.map(
    //   d => d["extra"]["displayName"] + d['extra']['displayValue']
    // );
    this.dataModel.items = response.data;
  }

  setMode(responseDataModel: any) {
    
  }
  SetValue(responseDataModel: any) {
  }
}
