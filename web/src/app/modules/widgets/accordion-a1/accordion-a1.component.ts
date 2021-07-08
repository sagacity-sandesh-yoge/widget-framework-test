import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { SelectionModel } from "@angular/cdk/collections";
import { DatePipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { EVENT_NAME } from "src/app/app-constants";
import { IWidget } from "src/app/data";
import { IWidgetSubmit } from "src/app/modules/widget-utility/iwidget";
import { WidgetComponentBase } from "src/app/modules/widget-utility/widget-component-base";
import { WidgetHelper } from "src/app/modules/widget-utility/widget-helper";
import { ServerApiInterfaceServiceService } from "src/app/server-api-interface-service.service";
import { NotificationService } from "src/app/services/common/notification.service";
import { SaveFileService } from "src/app/services/common/save-file.service";
import { ValidationService } from "src/app/services/common/validation.service";
import {
  CLICK_EVENT,
  DocumentFreezModel,
  AccordionA1ConfigModel,
  AccordionA1Model,
} from "./accordion.model";


@Component({
  selector: 'app-accordion-a1',
  templateUrl: './accordion-a1.component.html',
  styleUrls: ['./accordion-a1.component.css'],
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
  ],
})
export class AccordionA1Component extends WidgetComponentBase implements OnInit, OnDestroy {

  selectedItem: string;
  dataSource;
  // dataSource = ELEMENT_DATA;
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // columnsToDisplay = ['RequestNumber', 'AppexNumber', 'symbol'];
  // expandedElement: PeriodicElement | null;
  expandedElement: any;

  isOpen = true;
  istask = true;
  pageno: number;
  pagelimit: number;
  id: any;

  pageSize = 5;
  searchParam = "";
  clickEvent = CLICK_EVENT;
  pageChangeSubscription: Subscription;
  displayedColumns: string[] = [];
  expandedDisplayedColumns: string[] = [];

  //checkbox
  rowSelected: any;
  isRowEnable: boolean;
  selection = new SelectionModel<any>(true, []);
  selectionParent = new SelectionModel<any>(true, []);

  // expandedElement: any;
  flag: boolean;
  apiUrlConst: string;
  colData;
  formData : DocumentFreezModel;

  @Input() dataModel: AccordionA1Model;
  @Input() configModel: AccordionA1ConfigModel;
  @Output() childToParent = new EventEmitter<boolean>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  display: boolean = false;
  selectedRowDataId: any;
  @ViewChild(MatSort) sort: MatSort;
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
    this.formData = new DocumentFreezModel();
    this.dataModel = this.dataModel;
    this.configModel = this.configModel;
    this.wgFormData = this.formData;
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
      this.wgGetControlData().then((response) => {
        this.ConvertData(response);
      });
    }); 
  }

  // wgGetControlData() {
  //   this.wgOnRequest();
  //   return new Promise((resolve, reject) => {
  //     const apiUrlConst = this.dataModel.apiDataUrl;
  //     const reqData = Object();
  //     reqData.data = Object();
  //     reqData.data = this.dataModel.apireqdata;
  //     reqData.data.id = this.dataModel.widgetinstanceid;

  //     this._serverApi.post<any, any>(apiUrlConst, reqData.data).subscribe(
  //       response => {
  //         this.wgOnRequestCompleted();
  //         try {
  //           if (response) {
  //             resolve(response)
  //           }
  //         } catch (e) {
  //         }
  //       }, error => {
  //         this.wgOnRequestCompleted();
  //         reject()
  //       }
  //     );
  //   })
  // }

  // Validate(){
  //   const docsFreezed = this.docVersionChild._dataService.getSelectedRows().selected;
  //   if (docsFreezed && docsFreezed.length > 0) {
  //     return true;
  //   }
  //   else{
  //     this._notificationService.error("Please select documents to freez");
  //     return false;
  //   }
    
  // }

  GetValue() {
    // this.formData.freezedDocuments = this.docVersionChild._dataService.getSelectedRows().selected;
    // return this.formData;
  }

  
  ConvertData(resp) { 
    console.log("response",resp)
    //  this.dataSource = resp.data;
    console.log("datasourse",this.dataSource)
     this.dataSource.data = resp.data;
    this.paginator.length = resp.count;
    this.dataSource.paginator = this.paginator;

    resp.data.forEach(function (rowData) {
      if (rowData.uiMetaData) {
        rowData.metadata = JSON.parse(rowData.uiMetaData);
      }
    });
  }


  SetRequestData() {
    this.dataModel.apireqdata.searchParam = this.searchParam;
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

  wgGetIconDetailsHelpText(name: string) {
    return WidgetHelper.getIconDetailsHelpText(this.dataModel, name);
  }

  wgHasHelpIcon(name: string) {
    return WidgetHelper.hasHelpIcon(this.dataModel, name);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  toggleRowExpansion(element) {
    element.flag = !element.flag;
  }

  clickEventHandler(clickmethod: string, i, data: any, actionName: string) {
    const dataContext = JSON.parse(JSON.stringify(data));
    data["dataContext"] = dataContext;

    switch (clickmethod) {
      case "onClick":
        this.onClick(actionName, data);
        break;
      case "toggleRowExpansion":
        this.toggleRowExpansion(data);
        break;
      // case "onSubmitBtnClick":
      //   this.onSubmitBtnClick(actionName);
      //   break;
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
  // onSubmitBtnClick(actionName) {
  //   let eventDataObj = Object();
  //   eventDataObj = this.dataModel.submitProperties;
  //   eventDataObj.queryAction = "insert";
  //   let action = actionName;

  //   if (this.configModel.EventAction.has(action)) {
  //     this.configModel.CompToCaller.emit(action, eventDataObj);
  //   }
  // }

  // onClick(actionname, data?: any) {
  //   const dataContext = JSON.parse(JSON.stringify(data));
  //   data["dataContext"] = dataContext;
  //   data.queryAction = "insert";
  //   let action = actionname;

  //   if (this.configModel.EventAction.has(action)) {
  //     this.configModel.CompToCaller.emit(action, data);
  //   }
  // }

  //child component event
  // docVersionEvent(event) {
  //   if(event) {
  //     this.onClick(event.actionname, event.data);
  //   }

  // }

  isShow() {
    this.display = true;
  }

  sendtoparent() {
    this.childToParent.emit(true);
  }

  // onSearch(filterValue: string) {
  //   this.searchParam = filterValue;
  //   this.SetRequestData();
  //   this.wgGetControlData().then((response) => {
  //     this.ConvertData(response);
  //   });
  // }

  setColumnClass(
    isAltRowClasses: boolean,
    altRowClasses: Map<string, string>,
    classes: string,
    value: any
  ) {
    if (isAltRowClasses) {
      altRowClasses = new Map(altRowClasses);
      return altRowClasses.get(value);
    } else {
      return classes;
    }
  }

  getColorCode(element: any, col: any, value: any) {
    if (col.colorCodes) {
      let colorCodes: Map<string, string> = col.colorCodes;
      let colorCodesMap = new Map(colorCodes);
      return colorCodesMap.get(value);
    }
    return null;
  }

  ngOnDestroy(): void {
    if (this.pageChangeSubscription) {
      this.pageChangeSubscription.unsubscribe();
    }
  }

  showDialog() {
    this.display = true;
  }

  cancel() {
    this.display = false;
  }

  // radioButtonClick(element: any) {
  //   this.onClick(this.clickEvent.ON_ITEM_CLICK, element);
  // }

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

  getDisplayedColumns(): string[] {
    // this.getExpandedDisplayColumns();
    // if (this.dataModel.isDisplayColumnsPermission) {
    //   var filteredDisplayColumnsPermmisions = this.displayedColumns.filter(
    //     (x) => this.wgGetVisiblePermission(x)
    //   );
    //   return filteredDisplayColumnsPermmisions;
    // } else {
    //   return this.displayedColumns;
    // }
    return this.displayedColumns;
  }

  isExpand(ele) {
    ele.isCollapsable = !ele.isCollapsable;
  }
  
  getExpandedDisplayColumns(){

    if (this.dataModel.isDisplayColumnsPermission) {
      var filteredExpandedDisplayColPermmisions = this.dataModel.expandedcolumndata.map((item) => item.field).filter(
        (x) => this.wgGetVisiblePermission(x)
      );
      this.expandedDisplayedColumns = filteredExpandedDisplayColPermmisions;
    } else {
      this.expandedDisplayedColumns = this.dataModel.expandedcolumndata.map((item) => item.field);
    }
  }
  
  

  setFieldData() {}
  setMode(responseDataModel: any) {}
  SetValue(responseDataModel: any) {}
}



// export interface PeriodicElement {
//   name: string;
//   AppexNumber: number;
//   RequestNumber: number;
//   symbol: string;
//   description: object;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     AppexNumber: 1345343,
//     name: 'Hydrogen',
//     RequestNumber: 10079,
//     symbol: 'visibility',
//     description: [
//       {
//         DeptName:"Test",
//         status:"Hold",     
//         iconanme:"visibility"
//      }
//    ]
//   }, {
//     AppexNumber: 2353,
//     name: 'Helium',
//     RequestNumber: 40026,
//     symbol: 'visibility',
//     description: [
//       {
//         DeptName:"Test",
//         status:"Hold",     
//         iconanme:"visibility"
//      }
//    ]
//   }, {
//     AppexNumber: 354334,
//     name: 'Lithium',
//     RequestNumber: 6941,
//     symbol: 'visibility',
//     description: [
//       {
//         DeptName:"Test",
//         status:"Hold",     
//         iconanme:"visibility"
//      }
//    ]
//   }, {
//     AppexNumber: 453222,
//     name: 'Beryllium',
//     RequestNumber: 90122,
//     symbol: 'visibility',
//     description: [
//       {
//         DeptName:"Test",
//         status:"Hold",     
//         iconanme:"visibility"
//      }
//    ]
//   }, {
//     AppexNumber: 51234,
//     name: 'Boron',
//     RequestNumber: 10811,
//     symbol: 'visibility',
//     description: [
//       {
//         DeptName:"Test",
//         status:"Hold",     
//         iconanme:"visibility"
//      }
//    ]
//   }, {
//     AppexNumber: 68765,
//     name: 'Carbon',
//     RequestNumber: 120107,
//     symbol: 'visibility',
//     description: [
//       {
//         DeptName:"Test",
//         status:"Hold",     
//         iconanme:"visibility"
//      }
//    ]
//   }, {
//     AppexNumber: 71234,
//     name: 'Nitrogen',
//     RequestNumber: 140067,
//     symbol: 'visibility',
//     description: [
//       {
//         DeptName:"Test",
//         status:"Hold",     
//         iconanme:"visibility"
//      }
//    ]
//   }, {
//     AppexNumber: 86354,
//     name: 'Oxygen',
//     RequestNumber: 159994,
//     symbol: 'visibility',
//     description: [
//       {
//         DeptName:"Test",
//         status:"Hold",     
//         iconanme:"visibility"
//      }
//    ]
//   }, {
//     AppexNumber: 923478,
//     name: 'Fluorine',
//     RequestNumber: 189984,
//     symbol: 'visibility',
//     description: [
//       {
//         DeptName:"Test",
//         status:"Hold",     
//         iconanme:"visibility"
//      }
//    ]
//   }, {
//     AppexNumber: 145430,
//     name: 'Neon',
//     RequestNumber: 201797,
//     symbol: 'visibility',
//     description: [
//       {
//          DeptName:"Test",
//          status:"Hold",     
//          iconanme:"visibility"
//       }
//    ]
//   },
// ];