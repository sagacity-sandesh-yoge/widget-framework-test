import { FlatTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { IWidget } from 'src/app/data';

import { ErrorCodes } from 'src/app/models/common/error-codes';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/common/app-repo.service';
import { ValidationService } from 'src/app/services/common/validation.service';
import { IWidgetSubmit } from '../../widget-utility/iwidget';
import { WidgetComponentBase } from '../../widget-utility/widget-component-base';
import { CLICK_EVENT, NavigationItemModel, TreeNode, VerticalMenuConfigModel, VerticalMenuDataModel } from './vertical-menu-model';

@Component({
  selector: "app-vertical-menu",
  templateUrl: "./vertical-menu.component.html",
  styleUrls: ["./vertical-menu.component.css"],
})
export class VerticalMenuComponent
  extends WidgetComponentBase
  implements OnInit, IWidget, IWidgetSubmit {
  selectedItem: string;
  treeControl;
  dataSource;
  hasChild;

  displayedColumns: string[] = [];

  expandedElement: any;
  alertsCount:any ='';

  apiUrlConst: string;
  treeData;
  @Input() dataModel: VerticalMenuDataModel;
  @Input() configModel: VerticalMenuConfigModel;
  treeFlattener;
  activeNode
  display: boolean = false;
  isExpand: boolean = false;
  formData;

  clickEvent = CLICK_EVENT;
  constructor(
    private formBuilder: FormBuilder,
    private _appRepoService: AppRepoService,
    private _serverApi: ServerApiInterfaceServiceService,
    private datepipe: DatePipe,
    public _validationService: ValidationService,
    private _appRepoHelperService: AppRepoHelperService
  ) {
    super(formBuilder, _serverApi, null, null);
    this.treeControl = new FlatTreeControl<TreeNode>(
      (node) => node.level,
      (node) => node.expandable
    );

    this.treeFlattener = new MatTreeFlattener(
      this._transformer,
      (node) => node.level,
      (node) => node.expandable,
      (node) => node.children
    );

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    this.hasChild = (_: number, node: TreeNode) => node.expandable;
    this.formData = new NavigationItemModel();
    this.dataModel = this.dataModel;
    this.configModel = this.configModel;
    this.wgFormData = this.formData;
  }
  ngOnInit(): void {
    this.wgOnInint();
  }

  GetValue() {}
  Reset() {}

  ConvertData(response: any) {
    if(response.hasOwnProperty('alertsCount')){
      this.alertsCount=response.alertsCount;
    }
   
    if (response.data[0]) {
      const visiblemenus = response.data[0].menus?.split(",").map(Number);
      this.dataModel.menuoptions.forEach(function (menu) {
        if (visiblemenus.indexOf(menu.id) !== -1) {
          menu.isShow = true;
        } else {
          menu.isShow = false;
        }
      });

      const disabledmenus = response.data[0].disabledmenus
        ?.split(",")
        .map(Number);
      this.dataModel.menuoptions.forEach(function (menu) {
        if (disabledmenus.indexOf(menu.id) !== -1) {
          menu.isDisable = true;
        } else {
          menu.isDisable = false;
        }
      });

      this.treeData = this.dataModel.menuoptions;
      this.dataSource.data = this.getDataByParentId(this.treeData, undefined);

      this.dataModel.filteredMenuoptions = this.getMenu(this.dataModel.menuoptions);
      this.dataModel.selectedIndex = this.getAcitveNodeIndex(this.dataModel.activeNodeId);
    }
  }
  setFieldData() {}
  setMode(responseDataModel: any) {}
  SetValue(responseDataModel: any) {}

  private _transformer = (node: NavigationItemModel, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.displayname,
      level: level,
      id : node.id,
      icon: node.icon,
      routelink: node.routelink ? node.routelink : "undefined",
      tooltip: node.tooltip !== "" ? node.tooltip : false,
      isShow: node.isShow,
      isDisable: node.isDisable,
      backgroundcolor: node.backgroundcolor,
    };
  };

  getDataByParentId(data, parent) {
    const result = data.filter(
      (d) => (parent && d.parentcode === parent) || (!parent && !d.parentcode)
    );

    if (!result && !result.length) {
      return null;
    }

    return result.map(
      ({
        id,
        code,
        displayname,
        parentcode,
        showtooltip,
        icon,
        routelink,
        tooltip,
        isShow,
        isDisable,
        backgroundcolor,
      }) => ({
        id,
        code,
        displayname,
        parentcode,
        showtooltip,
        icon,
        routelink,
        tooltip,
        isShow,
        isDisable,
        backgroundcolor,
        children: this.getDataByParentId(data, code),
      })
    );
  }

  onClick(actionName, data: any) {
   
      let eventDataObj = Object();
      // eventDataObj = data;
      eventDataObj.dataContext = JSON.parse(JSON.stringify(data));
      
      let action = actionName;

      if (this.configModel.EventAction.has(action)) {
        this.configModel.CompToCaller.emit(action, eventDataObj);
      }
    
  }

  onTabChanged(event: any){
      if(event.index != this.dataModel.selectedIndex){
        let data:any = event.tab.ariaLabel
  
        this.onClick(this.clickEvent.ON_ITEM_CLICK, data);
      }  
  }

  getMenu(menu:any){
    if(menu){
      return menu.filter(m=>m.isShow && !m.isDisable);
    }
    return null;
  }

  getAcitveNodeIndex(nodeId:any){
    if (this.dataModel.filteredMenuoptions && nodeId) {
      return this.dataModel.filteredMenuoptions.findIndex(m => m.id == nodeId)
    }
    return 0;
  }
}
