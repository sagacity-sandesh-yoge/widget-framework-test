import { Component, OnInit, Input } from '@angular/core';
import { IWidget, IWidgetGlobalDataAccess, IWidgetSubmit } from '../../widget-utility/iwidget';
import { HorizontalStepperModel, HorizontalStepperConfigModel, StepperModel, HorizontalStepperFormDataModel, CLICK_EVENT } from './horizontal-stepper-model';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { WidgetConstants } from '../../widget-utility/widget-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horizontal-stepper',
  templateUrl: './horizontal-stepper.component.html',
  styleUrls: ['./horizontal-stepper.component.css']
})
export class HorizontalStepperComponent implements OnInit, IWidget, IWidgetGlobalDataAccess, IWidgetSubmit {
  id: string;
  apiDataUrl: string;
  globalParameters: Map<string, any>;
  fieldApiCount: number;
  @Input() dataModel: HorizontalStepperModel;
  @Input() configModel: HorizontalStepperConfigModel;
  formData: HorizontalStepperFormDataModel;
  completedNode: StepperModel;
  currentNode: StepperModel;
  clickEvent = CLICK_EVENT;
  selectedNodeId: number;

  

  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _router: Router
  ) {
    this.formData = new HorizontalStepperFormDataModel();
    this.completedNode = new StepperModel();
    this.currentNode = new StepperModel();

  }
  Validate(): boolean {
    return true;
  }
  GetValue() {
    let uiMetaData = null;
    if (this.currentNode.id > this.completedNode.id) {
      let selectedNode:any;
      if(this.currentNode.id == this.dataModel.items.length){
        selectedNode = this.currentNode;
      } else{
        selectedNode = this.dataModel.items.find(x=>x.id == (this.currentNode.id+1));
      }
      
      uiMetaData = {
        completedNode:
        {
          id: this.currentNode.id,
          name: this.currentNode.name,
          redirectUrl: this.currentNode.redirectUrl
        },
        selectedNode:
        {
          id: selectedNode?.id,
          name: selectedNode?.name,
          redirectUrl: selectedNode?.redirectUrl
        }
      }
    }
    this.formData.uiMetaData = uiMetaData;
    return this.formData;
  }
  Reset() {
    throw new Error("Method not implemented.");
  }
  SetValue(value: any) {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    this.configModel.CallerToComp.addListener(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA, () => {
      this.RefreshData();
    });
  }

  InitComponent() {
    this.PrepareFieldData().then(() => {
      if (this.dataModel.isSelfDataLoad) {
        this.RefreshData();
      }
    });
  }

  RefreshData() {
    this.SetRequestData();
    this.SetFormData();
    this.GetControlData().then((response: any) => {
      this.ConvertData(response);
    });
  }

  GetControlData() {
    return new Promise((resolve, reject) => {
      const apiUrlConst = this.dataModel.apiDataUrl;
      const reqData = Object();
      reqData.data = Object();
      reqData.data = this.dataModel.apireqdata;
      reqData.data.id = this.dataModel.widgetinstanceid;

      this._serverApi.post<any, any>(apiUrlConst, reqData.data).subscribe(
        response => {
          try {
            if (response) {
              resolve(response)
            }
          } catch (e) {
          }
        }, error => {
          reject()
        }
      );
    })
  }

  ConvertData(response: any) {
    this.dataModel.items = response.data;

    this.dataModel.items.sort((item1, item2) => {
      return item1.NodeOrder - item2.NodeOrder;
    });
    if (response.caseStatusId) {
      this.completedNode.id = response.caseStatusId;
      this.selectedNodeId = this.completedNode.id + 1;
      this.dataModel.selectedId = this.completedNode.id + 1;
    } else {
      const metaData = this.dataModel.items && this.dataModel.items.length > 0 && this.dataModel.items[0].uiMetaData ? JSON.parse(this.dataModel.items[0].uiMetaData) : null;
      this.completedNode = metaData && metaData.completedNode ? metaData.completedNode : new StepperModel();
      this.selectedNodeId = metaData && metaData.selectedNode ? metaData.selectedNode.id : 1;
    }
   
    this.setActive();
  }


  async PrepareFieldData(): Promise<any> {

  }

  ShowLoader() {
    throw new Error("Method not implemented.");
  }

  HideLoader() {
    throw new Error("Method not implemented.");
  }

  setActive() {
    this.dataModel.items.forEach((d: StepperModel) => {
      d.status = [];
      d.statusIcon = 'hourglass_full';
      if (d.id <= this.completedNode.id) {
        d.status.push('visited')
        d.statusIcon ='check_circle'
      }
      
      if (d.id === this.dataModel.selectedId) {
        this.currentNode = d;
        d.status.push('active')
        d.status.push('visited');
        d.statusIcon ='verified'
      }
      if (d.id == this.selectedNodeId &&  d.status.indexOf('visited') !== -1 ) {
        d.statusIcon = 'warning'
      }
    })
    let visitedItems: any = this.dataModel.items.filter(i => i.status && i.status.indexOf('visited') !== -1);
    if (visitedItems && visitedItems.length) {
      this.dataModel.items[visitedItems.length - 1].status.push('last-visited')

    }

  }

  redirectTo(item: StepperModel) {
    if (item.id <= this.completedNode.id) {
      var navigationData = this.dataModel.globalParameters.get(this.dataModel.navigationKey);
      this._router.navigate([item.redirectUrl, navigationData]);
    }
  }

  showSelected(item) {
    if(this.dataModel.hideSelectedIcon){
      return false;
    }
    return item.status.indexOf('active') >= 0 ? true : false
  }

  SetRequestData() {
    if (this.dataModel.isGlobalParams) {
      this.dataModel.globalParamterKeys.forEach(item => {
        this.dataModel.apireqdata[item] = this.dataModel.globalParameters.get(item);
      })
    }
  }
  SetFormData() {
    if (this.dataModel.isGlobalParams) {
      this.dataModel.globalParamterKeys.forEach(item => {
        this.formData[item] = this.dataModel.globalParameters.get(item);
      })
    }
  }

  onClick(actionName, data: any) {
    if (data.id <= this.completedNode.id) {
      let eventDataObj = Object();
      eventDataObj = data;
      eventDataObj.dataContext = JSON.parse(JSON.stringify(data));
      eventDataObj[this.dataModel.navigationKey] = this.dataModel.globalParameters.get(this.dataModel.navigationKey)
      let action = actionName;

      if (this.configModel.EventAction.has(action)) {
        this.configModel.CompToCaller.emit(action, eventDataObj);
      }
    }
  }

  hasVisited(status : any) {
  return status.some((element)=> element.includes('visited'))
  }
}
