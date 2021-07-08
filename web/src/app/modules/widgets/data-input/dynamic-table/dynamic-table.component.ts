import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/common/notification.service';
import { SaveFileService } from 'src/app/services/common/save-file.service';
import { WidgetHelper } from 'src/app/modules/widget-utility/widget-helper';
import { WidgetComponentBase } from 'src/app/modules/widget-utility/widget-component-base';
import { DatePipe } from '@angular/common';
import { ValidationService } from 'src/app/services/common/validation.service';
import { DynamicTableDataConfigModel, DynamicTableDataModel } from './dynamic-table.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          position: "relative",
          // top: 0,
          left: 0,
          width: "100%",
        })
      ),
      state(
        "closed",
        style({
          left: "100%",
        })
      ),
      transition("open => closed", [animate("0.5s")]),
      transition("closed => open", [animate("0.3s")]),
      transition("* => closed", [animate("0.5s")]),
      transition("* => open", [animate("0.3s")]),
      transition("open <=> closed", [animate("0.3s")]),
      transition("* => open", [animate("0.5s", style({ opacity: "*" }))]),
      transition("* => *", [animate("0.5s")]),
    ]),

    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ]
})
export class DynamicTableComponent extends WidgetComponentBase
  implements OnInit, OnDestroy {
  dataSource;
  pageno: number;
  pagelimit: number;
  id: any;
  pageSize = 5;
  pageChangeSubscription: Subscription;
  @Input() dataModel: DynamicTableDataModel;
  @Input() configModel: DynamicTableDataConfigModel;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  wgFormData: any = new Object();

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _toastnotificationservice: ToastrService, //TODO: This service need remove from this and place at common place
    private router: Router,
    private route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _saveFileService: SaveFileService,
    private datepipe: DatePipe,
    public formBuilder: FormBuilder,
    public _validationService: ValidationService
  ) {
    super(formBuilder, _serverApi, datepipe, null);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.paginator = this.paginator;
    this.pageno = this.paginator.pageIndex;
    this.pagelimit = this.dataModel.pageSize;
    this.SetRequestData();
    this.wgOnInint();

    this.pageChangeSubscription = this.paginator.page.subscribe(() => {
      this.pageno = this.paginator.pageIndex;
      this.pagelimit = this.paginator.pageSize;
      this.SetRequestData();
      this.wgGetControlData().then((response) => {
        this.ConvertData(response);
      });
    });
  }

  SetRequestData() {
    this.dataModel.apireqdata.fromlimit = this.pagelimit * this.pageno ? this.pagelimit * this.pageno : 0;
    this.dataModel.apireqdata.tolimit = this.pagelimit ? this.pagelimit : 0;
    this.dataModel.apireqdata.sortBy = this.sort ? this.sort.active : this.dataModel.sort.defaultSortBy;
    this.dataModel.apireqdata.sortBy = this.dataModel.apireqdata.sortBy ? this.dataModel.apireqdata.sortBy : '';
    this.dataModel.apireqdata.sortDirection = this.sort ? this.sort.direction : this.dataModel.sort.defaultSortDirection;
    this.dataModel.apireqdata.sortDirection = this.dataModel.apireqdata.sortDirection ? this.dataModel.apireqdata.sortDirection : '';
  }

  ConvertData(resp) {
    if(resp){
      let uiMetaData;
      
      if(resp.UIMetaData && resp.UIMetaData[0]){
        uiMetaData = JSON.parse(resp.UIMetaData[0].UIMetaData); 
        if(uiMetaData){
          this.dataModel.sort =  uiMetaData.sort;
        }
        if(uiMetaData){
          //this.dataModel.columndata =  uiMetaData.columnData;
        }
      }
      if(!this.dataModel?.columndata?.length && resp.data && resp.data.length > 0){
        for (let key of Object.keys(resp.data[0])) {
          let isSort:boolean = false;
          if(uiMetaData){
            let col:any = uiMetaData?.columnData?.find((d:any)=>d.field == key);
            isSort = col?.isSort;
          }          
          let column:any = {
            field: key,
            name: key,
            isSort: isSort 
          }
          this.dataModel.columndata.push(column)
        }
      }
      this.dataSource = resp.data;
      this.paginator.length = resp.count;
      this.dataSource.paginator = this.paginator;
    }
  }

  wgGetIconDetailsHelpText(name: string) {
    return WidgetHelper.getIconDetailsHelpText(this.dataModel, name);
  }

  wgHasHelpIcon(name: string) {
    return WidgetHelper.hasHelpIcon(this.dataModel, name);
  }

  clickEventHandler(clickmethod: string, i, data: any, actionName: string) {
    const dataContext = JSON.parse(JSON.stringify(data));
    data["dataContext"] = dataContext;

    switch (clickmethod) {
      case "onClick":
        this.onClick(actionName, data);
        break;
      case "onSubmitBtnClick":
        this.onSubmitBtnClick(actionName);
        break;
    }
  }
  onSubmitBtnClick(actionName) {

    let eventDataObj = Object();
    eventDataObj = this.dataModel.submitProperties;
    eventDataObj.queryAction = "insert"
    let action = actionName;

    if (this.configModel.EventAction.has(action)) {
      this.configModel.CompToCaller.emit(action, eventDataObj);
    }

  }

  onClick(actionname, data?: any) {
    const dataContext = JSON.parse(JSON.stringify(data));
    data["dataContext"] = dataContext;
    let action = actionname;

    if (this.configModel.EventAction.has(action)) {
      this.configModel.CompToCaller.emit(action, data);
    }
  }

  GetValue() {
    Object.assign(this.wgFormData, this.dataModel.apireqdata);
    return this.wgFormData;
  }

  ResetPagination() {
    this.paginator.pageIndex = 0;
    this.pageno = this.paginator.pageIndex;
  }

  sortData(event: any) {
    this.ResetPagination();
    this.SetRequestData();
    this.wgGetControlData().then((response) => {
      this.ConvertData(response);
    });
  }

  setFieldData() { }
  setMode(responseDataModel: any) { }
  SetValue(responseDataModel: any) { }

  getDisplayedColumns(): any[] {
    let columns = this.dataModel.columndata.map(item=> item.field);
    return columns;
  }

  Validate(){
    return this.paginator.length ? true: false;
  }

  ngOnDestroy(): void {
    if (this.pageChangeSubscription) {
      this.pageChangeSubscription.unsubscribe();
    }
  }
}
