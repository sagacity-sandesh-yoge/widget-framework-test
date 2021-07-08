import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { TableA2Model, TableA2ConfigModel, TemplateDataModel, ExpandedDataModel } from './table-a2-model';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IWidget } from 'src/app/modules/widget-utility/iwidget';
import { MatSort } from '@angular/material/sort';
import {CLICK_EVENT } from './table-a2-model';
import { WidgetComponentBase } from 'src/app/modules/widget-utility/widget-component-base';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/app/services/common/validation.service';

@Component({
  selector: 'app-table-a2',
  templateUrl: './table-a2.component.html',
  styleUrls: ['./table-a2.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        position: 'relative',
        // top: 0,
        left: 0,
        width: '100%'
      })),
      state('closed', style({
        left: '100%'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
      transition('* => closed', [
        animate('0.5s')
      ]),
      transition('* => open', [
        animate('0.3s')
      ]),
      transition('open <=> closed', [
        animate('0.3s')
      ]),
      transition('* => open', [
        animate('0.5s',
          style({ opacity: '*' }),
        ),
      ]),
      transition('* => *', [
        animate('0.5s')
      ]),
    ]),

    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),

  ]
})

export class TableA2Component extends WidgetComponentBase implements OnInit, IWidget {
  
  selectedItem: string;
  dataSource;
  isOpen = true;
  pageno: number;
  pagelimit: number;
  searchParam = "";
  pageChangeSubscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;

  clickEvent = CLICK_EVENT;
  displayedColumns: string[] = [];

  expandedElement: any;
  flag: boolean;

  @Input() dataModel: TableA2Model;
  @Input() configModel: TableA2ConfigModel;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  first: boolean = true;
  id: string;
  apiDataUrl: string;
  globalParameters: Map<string, any>;
  fieldApiCount: number;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _toastnotificationservice: ToastrService, //TODO: This service need remove from this and place at common place
    private router: Router,
    private datepipe: DatePipe,
    public formBuilder: FormBuilder,
    public _validationService: ValidationService
  ) {
    super(formBuilder, _serverApi, datepipe, null);
    this.dataSource = new MatTableDataSource();
  }

  PrepareFieldData() {}
  GetControlData() {}

  ConvertData(response: any) {
    
    response.data.forEach(function (tableData) {
      tableData.description.forEach(function (data) {
        if (data.uiMetaData) {
          let metadata = JSON.parse(data.uiMetaData);
          data.multiple = metadata ? metadata.isMultipleUpload : null;
        }
      });
    });
    response.data[0]['isCollapsable'] = true;
    this.dataSource = response.data;
    this.paginator.length = response.count;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = this.dataModel.columndata.map((item) => item.field);
    this.pageno = this.paginator.pageIndex;
    this.pagelimit = this.dataModel.pageSize;
    this.SetRequestData();
    this.wgOnInint();

    this.pageChangeSubscription = this.paginator.page.subscribe(() => {
      this.pageno = this.paginator.pageIndex;
      this.pagelimit = this.paginator.pageSize;
      this.SetRequestData();
      this.wgGetControlData().then((response) =>{
        this.ConvertData(response);
      });
    });
  }

  SetRequestData() {
    this.dataModel.apireqdata.searchvalue = this.searchParam;
    this.dataModel.apireqdata.fromlimit =
      this.pagelimit * this.pageno ? this.pagelimit * this.pageno : 0;
    this.dataModel.apireqdata.tolimit = this.pagelimit ? this.pagelimit : 0;

    this.dataModel.apireqdata.sortBy = this.sort
      ? this.sort.active
      : this.dataModel.defaultSortBy;
    this.dataModel.apireqdata.sortDirection = this.sort
      ? this.sort.direction
      : this.dataModel.defaultSortDirection;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  toggleRowExpansion(element) {
    element.flag = !element.flag;
  }

  clickEventHandler(
    clickmethod: string,
    i,
    data: any,
    eventActionName: string
  ) {
    const dataContext = JSON.parse(JSON.stringify(data));
    data["dataContext"] = dataContext;

    switch (clickmethod) {
      case "onClick":
        this.onClick(data, eventActionName);
        break;
      case "toggleRowExpansion":
        this.toggleRowExpansion(data);
        break;
    }
  }
  isExpand(ele) {
    ele.isCollapsable = !ele.isCollapsable;
  }

  onClick(data, actionName) {
    const dataContext = JSON.parse(JSON.stringify(data));
    data["dataContext"] = dataContext;

    let action = "";

    if (this.dataModel.eventMapOnCol == "") {
      action = actionName;
    } else {
      eval("action = " + "data." + this.dataModel.eventMapOnCol);
    }

    if (this.configModel.EventAction.has(action)) {
      this.configModel.CompToCaller.emit(action, data);
    }
  }

  onSearch(filterValue: string) {
    this.searchParam = filterValue;
    this.SetRequestData();
    this.wgGetControlData().then((response) =>{
      this.ConvertData(response);
    });
  }

  setColumnClass(
    isAltRowClasses: boolean,
    altRowClasses: Map<string, any>,
    classes: string,
    value: any,
    element: any
  ) {
    if (isAltRowClasses) {
      altRowClasses = new Map(altRowClasses);
      const className = altRowClasses.get(value);
      if (className) {
        if (typeof className === "string") {
          return className;
        }
        if (className.length === 2) {
          const filedName = className[0];
          const mapClassName = new Map(className[1]);
          return mapClassName.get(element[filedName]);
        }
      }
      return className;
    } else {
      return classes;
    }
  }

  ResetPagination() {
    this.paginator.pageIndex = 0;
    this.pageno = this.paginator.pageIndex;
  }

  sortData(event: any) {
    this.ResetPagination();
    this.SetRequestData();
    this.wgGetControlData().then((response) =>{
      this.ConvertData(response);
    });
  }

  ngOnDestroy(): void {
    if (this.pageChangeSubscription) {
      this.pageChangeSubscription.unsubscribe();
    }
  }

  ShowLoader() {}
  HideLoader() {}

  setFieldData() {}
  setMode(responseDataModel: any) {}
  SetValue(responseDataModel: any) {}
}
