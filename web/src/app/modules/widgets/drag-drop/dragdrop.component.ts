import { element } from 'protractor';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IWidget, IWidgetSubmit } from '../../widget-utility/iwidget';
import { DragdropModel, DragdropConfigModel, DocumentListModel, VehicleModel, VehicleModelFormData, DocModelFormData, RequestedTableTypes } from './dragdrop-model';
import { WidgetConstants } from '../../widget-utility/widget-constants';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { WidgetComponentBase } from '../../widget-utility/widget-component-base';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
import { ValidationService } from 'src/app/services/common/validation.service';
import { EVENT_NAME } from 'src/app/app-constants';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: "app-dragdrop",
  templateUrl: "./dragdrop.component.html",
  styleUrls: ["./dragdrop.component.css"],
})
export class DragdropComponent extends WidgetComponentBase
  implements OnInit, IWidget, IWidgetSubmit {

  activeIndex = 0;
  id: string;
  apiDataUrl: string;
  globalParameters: Map<string, any>;
  fieldApiCount: number;
  @Input() dataModel: DragdropModel;
  @Input() configModel: DragdropConfigModel;

  connectedIs: any[];

  formData: VehicleModelFormData;
  type = 0;
  options;
  combinedId: number;
  
  mappedDocumentList:any;
  isValid = true;
  removeDocFromList : boolean = true;

  clickEvent = EVENT_NAME;

  expandedElement :any = true;

  //Requested Table Type
  @ViewChild('search') searchTextBox: ElementRef;
  selectedValues = [];
  requestedTableTypesFiltered : Observable<any[]>;
  
  addedAllModelsTables:any;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private _router: Router,
    private _appRepoHelperService: AppRepoHelperService,
    public _validationService: ValidationService
  ) {
    super(formBuilder, _serverApi, datepipe, _validationService);
    this.connectedIs = [];

    this.combinedId = 0o0;
    this.formData = new VehicleModelFormData();
    this.formData.caseModelDocMapping = [];
    this.dataModel = this.dataModel;
    this.configModel = this.configModel;
    this.wgFormData = this.formData;
  }
  Reset() {}

  setFieldData() {}
  setMode(responseDataModel: any) {}
  SetValue(responseDataModel: any) {
   
  }

  ngOnInit(): void {
    this.wgOnInint();
    this.EventListeners();
  }

  EventListeners(){

    //Event Listener after uploading documents - to update dataModel.documentList (Uploaded Document List)
    this.configModel.CallerToComp.addListener(DragdropConfigModel.CALLER_TO_COMP_REFRESH_DOC_LIST, (reqData:any) => {
      this.RefreshDataAPI(reqData).then((response: any) => {
        const mappedDocsArray = [];
        mappedDocsArray.push(...this.GetAllMappedDocuments(this.dataModel.vehicleModelList));
        mappedDocsArray.push(...this.GetAllMappedDocuments(this.dataModel.requestedVehicleModelList));
        mappedDocsArray.push(...this.GetAllMappedCombinedDocuments(this.dataModel.combinedDocuments));

        this.dataModel.documentList = 
        response?.documentList.filter( ( doc ) => !mappedDocsArray.find(m => (m.uploadedDocId == doc.uploadedDocId)) );
      });
    });

    //Event Listener after deleting table - to update 'dataModel.requestedTableTypesData' dropdown
    this.configModel.CallerToComp.addListener(DragdropConfigModel.CALLER_TO_COMP_REFRESH_AFTER_DELETE_TABLE, (reqData:any) => {
      this.RefreshDataAPI(reqData).then((response: any) => {
        this.dataModel.requestedTableTypesData = response?.refreshTableTypesDropdownList;
        });
      });

    //Event Listener after versioning - to update only that uploaded document version
    this.configModel.CallerToComp.addListener(DragdropConfigModel.CALLER_TO_COMP_REFRESH_AFTER_DOC_VERSION_UPLOAD, (reqData:any) => {

      const queryType = reqData.caseVehicalModelId ?  reqData.isRequestedModelTableDoc ? 'reqVehModel' : 'suggVehModel' : 'combinedDoc'

      this.dataModel.apireqdata["modelTableDocId"] = reqData.modelTableDocId ?? "null";
      this.dataModel.apireqdata["caseVehicalModelId"] = reqData.caseVehicalModelId ?? "null";
      this.dataModel.apireqdata["queryType"] = queryType;
    

      this.RefreshDataAPI(reqData).then((response: any) => {
        switch(queryType){
          case 'suggVehModel' :
            this.UpdateDocAfterVersioning(this.dataModel.vehicleModelList, response, reqData);
            break;
          case 'reqVehModel' :
            this.UpdateDocAfterVersioning(this.dataModel.requestedVehicleModelList, response, reqData);
            break;
          case 'combinedDoc' :
            this.UpdateDocAfterVersioning(null, response, reqData);
            break;

        }
      });
    });

    //Event Listener after adding tables - to update 'dataModel.requestedVehicleModelList'
    this.configModel.CallerToComp.addListener(DragdropConfigModel.CALLER_TO_COMP_REFRESH_AFTER_ADD_REQUEST_TABLES, (reqData:any) => {
      
      //Refresh Data without whole page load (ADD TABLE) - To get  list of added tables from request object
      if (reqData && reqData.otherRequestedTypes) {
        this.addedAllModelsTables = reqData.otherRequestedTypes;
        this.RefreshDropdownEvent();     
      }

      this.RefreshDataAPI(reqData).then((response: any) => {

        let updatedReqVelModelList = this.ConvertDataToVehicleModelList(response.requestedVehicleModelList);

        if (this.dataModel.requestedVehicleModelList.length) {

          this.addedAllModelsTables.forEach(element => {

            const updatedReqVehModel = updatedReqVelModelList.find(x => x.caseVehicalModelId == element.ModelId);
            let currentReqVehModel = this.dataModel.requestedVehicleModelList.find(x => x.caseVehicalModelId == element.ModelId);

            this.AddConnectedId(element);

            if (currentReqVehModel) {
              let currentModelList =  currentReqVehModel.modelDocumentList;
              const addedModelTable = updatedReqVehModel.modelDocumentList.find(y => y.modelTableDocId == element.TableTypeId );
              if(!currentModelList.find(x => x.modelTableDocId == addedModelTable.modelTableDocId)){
                this.dataModel.requestedVehicleModelList.find(x => x.caseVehicalModelId == element.ModelId).modelDocumentList.push(addedModelTable);
              }
            }
            else{
              this.dataModel.requestedVehicleModelList.push(updatedReqVehModel);
            }

          });
        }
        else {
          this.dataModel.requestedVehicleModelList = updatedReqVelModelList;
          this.setConnectedId(updatedReqVelModelList);
        }

        });
      });
  }

  Validate() {
    for (const vm of this.dataModel.vehicleModelList) {
      for (const modelTable of vm.modelDocumentList) {
        if (modelTable.items.length != 0) {
          this.isValid = true;
          return this.isValid;
        }
      }
    }

    if (this.dataModel.combinedDocuments.length >= 1) {
      this.isValid = true;
      return this.isValid;
    }

    this.isValid = false;
    return false;
  }

  GetTableDocumentMapping(data, reqData){
    
    if (data) {
      data.forEach((vm) => {
        vm.modelDocumentList.forEach((modelDoc) => {
          modelDoc.items.forEach((m) => {
            if (m.uploadedDocId) {
              var obj = new DocModelFormData();
    
              obj.isCombinedDocMapping = 0;
              obj.caseVehicleModelId = vm.caseVehicalModelId;
              obj.vhlSuggDocId = modelDoc.vhlSuggDocID;
              obj.uploadedDocId = m.uploadedDocId;
              reqData.push(obj);
            }
          });
        });
      });
     
    }

  }

  GetValue() {
    this.formData.caseModelDocMapping = [];
 
    if (this.dataModel.vehicleModelList) {
      let reqCaseModelDocMapping = [];
      this.GetTableDocumentMapping(this.dataModel.vehicleModelList, reqCaseModelDocMapping)
      this.formData.caseModelDocMapping = reqCaseModelDocMapping;
    }

    if (this.dataModel.requestedVehicleModelList) {
      let reqTableModelDocMapping = [];
      this.GetTableDocumentMapping(this.dataModel.requestedVehicleModelList, reqTableModelDocMapping)
      this.formData.requestTableModelDocMapping = reqTableModelDocMapping;
    }

    if (this.dataModel.combinedDocuments) {
      this.dataModel.combinedDocuments.forEach((element) => {
        var obj = new DocModelFormData();

        obj.isCombinedDocMapping = 1;
        obj.caseVehicleModelId = "null";
        obj.vhlSuggDocId = "null";
        obj.uploadedDocId = element.uploadedDocId;
        this.formData.caseModelDocMapping.push(obj);
      });
    }

    return this.formData;
  }

  ConvertData(response: any) {

    this.connectedIs = [];
    this.dataModel.vehicleModelList = this.ConvertDataToVehicleModelList(response.vehicleModelList);
    this.setConnectedId(this.dataModel.vehicleModelList);

    this.dataModel.requestedVehicleModelList = this.ConvertDataToVehicleModelList(response.requestedVehicleModelList);
    this.setConnectedId(this.dataModel.requestedVehicleModelList);

    this.dataModel.documentList = response?.documentList;
    this.dataModel.combinedDocuments = response?.combinedDocuments;
   
    //Requested Table Type dropdown data
    this.dataModel.requestedTableTypesData = response?.otherTableTypeList;
  
    // Requested Table Type-  Set filter event based on value changes 
    this.RefreshDropdownEvent(); 

    //Required to check if has ApexNo - Doc Add page
    this.dataModel.caseDetails = response?.caseDetails ? response?.caseDetails[0] : null;

    //For case view document add
    this.mappedDocumentList = response.mappedDocumentList;

  }

  ConvertDataToVehicleModelList(response){

    if(response){
      response.forEach(function (tableData) {
        tableData.modelDocumentList.forEach(function (data) {
          let metadata = JSON.parse(data.modelTableDocUiMetaData);
          data.multiple = metadata ? metadata.isMultipleUpload : null;
          data.items.forEach((element) => {
            if (!element.uploadedDocId) {
              data.items.pop(element);
            }
          });
        });
      });
  
    }

    return response;
  }

  //Condition to show delete icon 
  showRemoveIcon(item) {
    //For case view document add - if doc is already mapped then do not allow to remove mapped doc
    if(this.mappedDocumentList){
      const doc = this.mappedDocumentList.find(
        (x) => x.uploadedDocId == item.uploadedDocId
      );
     
      if(!this.dataModel.item.removeMappedItem && doc){
        return false;
      }
    }

    if(item.DocumentVersion) return false;
   

    return item["toggleCancelIcon"];
  }

  async PrepareFieldData(): Promise<any> {}

  ShowLoader() {}

  HideLoader() {}

  drop(event: CdkDragDrop<string[]>) {
    this.isValid = true;   
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const prevElement: any =
        event.previousContainer.data[event.previousIndex];
      let curentElement = event.container.data.find(
        (x: any) => x.uploadedDocId === prevElement.uploadedDocId
      );
      if (curentElement) {
        this.removeDocFromList = false;
        return;
      }

      if (
        !event.container.element.nativeElement.hasAttribute("multiple") &&
        event.container.data.length === 1
      ) {
        this.removeDocFromList = false;
        return;
      }
      if (this.dataModel.item.removeDraggedItem) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }

  DropDocument(event: CdkDragDrop<string[]>) {
    const currentDraggedElement: any =
      event.previousContainer.data[event.previousIndex];
    this.drop(event);
    if(this.removeDocFromList){
      this.RemoveDocFromDocumentList(currentDraggedElement);
    }
  }

  //If uploaded document is mapped from documentList to single/combined doc then remove it from documentList
  //Already mapped uploaded doc should not visible in LHS side documentList
  RemoveDocFromDocumentList(currentDraggedElement){
    const index = this.dataModel.documentList.findIndex(
      (item) => item.uploadedDocId === currentDraggedElement.uploadedDocId
    );
    if (index !== -1) {
      this.dataModel.documentList.splice(index, 1);
    }
  }

  //remove uploaded doc from mapped table doc type
  removeDroppedElement(element: any, listData: any[]) {
    const index = listData.findIndex(
      (item) => item.uploadedDocId === element.uploadedDocId
    );
    if (index !== -1) {
      listData.splice(index, 1);
      if (this.dataModel.item.removeDraggedItem) {
        this.dataModel.documentList.push(element);
      }
    }
  }


  //connectedIs required for drag drop functionality 
  setConnectedId(data) {
   
    if (data) {
      data.forEach((vm) => {
        const ids = vm.modelDocumentList.map(
          ({ modelTableDocId: id }) => `${vm.caseVehicalModelId}_${id}`
        );
        this.connectedIs = this.connectedIs.concat(ids);
      });
    }

    let c = `${this.combinedId}_${this.combinedId}`; //Combined Doc Id
    if(!this.connectedIs.includes(c)) {
      this.connectedIs.push(c);
    } 
    
  }

  AddConnectedId(addedTable){
    let c = `${addedTable.ModelId}_${addedTable.TableTypeId}`;
    if(!this.connectedIs.includes(c)) {
      this.connectedIs.push(c);
    } 
  }

  RemoveConnectedId(deletedTable){
    let c = `${deletedTable.caseVehicalModelId}_${deletedTable.modelTableDocId}`;
    const index = this.connectedIs.findIndex((item) => item === c);

    if (index !== -1) {
      this.connectedIs.splice(index, 1);
    }
  }

  setId(vehicleModelId, docTypeId) {
    return `${vehicleModelId}_${docTypeId}`;
  }

  
  onClick(actionname, data?: any) {
    const dataContext = JSON.parse(JSON.stringify(data));
   data["listofDocumentTypes"] =
      Array.prototype.map.call(dataContext, function (item) { return item.Value; }).join(",");
    
    data["dataContext"] = dataContext;
    let action = actionname;

    if (this.configModel.EventAction.has(action)) {
      this.configModel.CompToCaller.emit(action, data);
    }
  }

  onDelete(vehModel, modelTable?: any) {
    let data = Object();
    Object.assign(data, modelTable);
    data["caseVehicalModelId"] = vehModel.caseVehicalModelId;
    data["mappedDocs"] = data.items;
   
    this.onClick(this.clickEvent.ON_ITEM_CLICK,data);
  }

  onVersionUpload(vehModel, modelTables, item?: any) {
    let data = Object();
    Object.assign(data, item);
    data["caseVehicalModelId"] = vehModel.caseVehicalModelId;
    data["isRequestedModelTableDoc"] = modelTables.isRequestedModelTableDoc;
    data["modelTableDocId"] = modelTables.modelTableDocId;
   
    this.onClick(this.clickEvent.ON_UPLOAD_CLICK,data);
  }

  isDeleteTableAllowed(vehModel, tableData){
     
    let isDeleteTable = true;

    //If Model Table has uploaded doc mapped and has Apex No then cannot delete that table
    if(tableData.items && tableData.items.length && this.dataModel.caseDetails?.ApexNumber){
      isDeleteTable = false;
    }

    //If requested table then can delete directly
    if(isDeleteTable && tableData.isRequestedModelTableDoc){
      return true;
    }
   
    //For suggestive Documents atleast one table should be present
    return isDeleteTable && vehModel?.modelDocumentList && vehModel?.modelDocumentList.length > 1  ? true : false;
  }
  
  resetForm(mode) {

    this.selectedValues = [];
    this.wgReset();
  }

  // Requested Table Types - Used to filter data based on search input 
    filterRequestedTablesData(tableName: string){
    const filterValue = tableName?.replace(" ",'').toLowerCase();

    // Set selected values to retain the selected checkbox state 
    this.setSelectedValues();

    this.wgFC.selectFormControl.patchValue(this.selectedValues);
    let filteredList = this.dataModel.requestedTableTypesData.filter(option => option.Value.replaceAll(" ",'').toLowerCase().indexOf(filterValue) === 0);

    return filteredList;
  }


// Requested Table Types - Remove from selected values based on uncheck
  selectionChange(event) {
    if (event.isUserInput && event.source.selected == false) {
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1)
    }
  }

  openedChange(e) {
    // Set search textbox value as empty while opening selectbox 
    this.wgFC.searchTextboxControl.patchValue('');
    // Focus to search textbox while clicking on selectbox
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  // Requested Table Types - Clearing search textbox value  
  clearSearch(event) {
    event.stopPropagation();
    this.wgFC.searchTextboxControl.patchValue('');
  }

  // Requested Table Types - Set selected values to retain the state 
  setSelectedValues() {
   
    if (this.wgFC.selectFormControl.value && this.wgFC.selectFormControl.value.length > 0) {
      this.wgFC.selectFormControl.value.forEach((e) => {
        if (this.selectedValues.indexOf(e) == -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }

  //Filter Requsted tables data by vehicle model -  each VM will have its own Requested Tables Data
  filterRequestedTablesByVM(data:Observable<RequestedTableTypes[]>,model):Observable<any[]> {
   return data.pipe(map( results => results.filter(r => r.ModelId == model.caseVehicalModelId) ))
  }


  RefreshDropdownEvent(){
    // Requested Table Type-  Set filter event based on value changes 
    this.requestedTableTypesFiltered = this.wgFC.searchTextboxControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this.filterRequestedTablesData(name))
      );
  }

  
  /*  Refresh Data without page load - API Call  */
  RefreshDataAPI(data) {
    this.wgOnRequest();
    return new Promise((resolve, reject) => {
      const apiUrlConst = this.dataModel.apiDataUrl;
      const reqData = Object();
      reqData.data = Object();
      reqData.data = this.dataModel.apireqdata;
      reqData.data.id = this.dataModel.widgetinstanceid;

      this._serverApi.post<any, any>(apiUrlConst, reqData.data).subscribe(
        response => {
          this.wgOnRequestCompleted();
          try {
            if (response) {
              this.dataModel.apireqdata.wf = "default";
              resolve(response)
            }
          } catch (e) {
          }
        }, error => {
          this.wgOnRequestCompleted();
          reject()
        }
      );
    })
  }

  //Refresh Data without whole page load - Get all mapped docs - to update dataModel.documentList (Uploaded Document List)
  GetAllMappedDocuments(vehModelList){
    let mappedDocs = [];
    if(vehModelList){
      vehModelList.forEach(function (vehModel) {
        vehModel?.modelDocumentList.forEach(function (data) {
          if(data?.items.length){
           mappedDocs.push(...data.items);
          }
        });
      });
    }

    return mappedDocs;
  }

  //Refresh Data without whole page load - Get all mapped docs - to update dataModel.documentList (Uploaded Document List)
  GetAllMappedCombinedDocuments(combinedDocuments){
    let mappedDocs = [];
    if(combinedDocuments){
      combinedDocuments.forEach((element) => {
        mappedDocs.push(element);
      });
    }

    return mappedDocs;
  }

  //Refresh Data without whole page load (DELETE TABLE) - To delete table from list after delete table confirmation
  RefreshVehModelAfterDeleteTable(reqObject){

    if (reqObject && reqObject.reqData) {   
      if (reqObject.reqData.isRequestedModelTableDoc) {
        this.RemoveTableFromListAfterDeleteTable(this.dataModel.requestedVehicleModelList, reqObject);
      }
      else{
        this.RemoveTableFromListAfterDeleteTable(this.dataModel.vehicleModelList, reqObject);
      }

      this.RemoveConnectedId(reqObject.reqData);
      this.RefreshDropdownEvent();   
    }
  }

  //Refresh Data without whole page load (DELETE TABLE)
  RemoveTableFromListAfterDeleteTable(vehModel, reqObject){
    if(vehModel) {
      let modelList = vehModel.find(x => x.caseVehicalModelId == reqObject.reqData.caseVehicalModelId).modelDocumentList
      const index = modelList?.findIndex((item) => item.modelTableDocId === reqObject.reqData.modelTableDocId);
  
      if (index !== -1) {
        vehModel.find(x => x.caseVehicalModelId == reqObject.reqData.caseVehicalModelId).modelDocumentList.splice(index, 1);
      }
    }

  }

  RefreshDataAfterDeleteUploadedDoc(reqObject) {
    this.RemoveUploadedDocFromListAfterDelete(this.dataModel.vehicleModelList, reqObject);
    this.RemoveUploadedDocFromListAfterDelete(this.dataModel.requestedVehicleModelList, reqObject);
    this.RemoveUploadedDocFromCombinedAfterDelete(reqObject);
  }

  RemoveUploadedDocFromListAfterDelete(vehModelList, reqObject){
    if (vehModelList && vehModelList.length) {
      for (const vehModel of vehModelList){
        for (const mt of vehModel.modelDocumentList) {
          const index = mt?.items?.findIndex((item) => item.uploadedDocId === reqObject.docId);
      
          if (index !== -1) {
            mt.items.splice(index, 1);
          }
        }
      }
    }

  }

  RemoveUploadedDocFromCombinedAfterDelete(reqObject){
    if(this.dataModel.combinedDocuments && this.dataModel.combinedDocuments.length){
      const index = this.dataModel.combinedDocuments.findIndex((item) => item.uploadedDocId === reqObject.docId);
  
      if (index !== -1) {
        this.dataModel.combinedDocuments.splice(index, 1);
      }
    }

  }

  UpdateDocAfterVersioning(vehModelList, response, reqData){
   
    if (vehModelList) {
       //To Vehicle Models (Suggested and Requested)
      const updatedData = response.refreshDataAfterDocVersioning[0].modelDocumentList.find(x => x.modelTableDocId == reqData.modelTableDocId).items[0]
      for (const vehModel of vehModelList) {
        if(response.refreshDataAfterDocVersioning[0].caseVehicalModelId == vehModel.caseVehicalModelId){
          vehModel.modelDocumentList.find(x => x.modelTableDocId == reqData.modelTableDocId)
          .items.map(obj => 
           {
             if(obj.uploadedDocId == reqData.uploadedDocId)
             {
               obj.uploadedDocId = updatedData.uploadedDocId;
               obj.DocumentVersion = updatedData.DocumentVersion;
               obj.uploadedDocName = updatedData.uploadedDocName;
               obj.IsDocumentMapped = updatedData.IsDocumentMapped;
             }
           }) ;
         }
      }
    }
    else {
      //To Combined Document update
      const updatedData = response.refreshDataAfterDocVersioning[0]
      this.dataModel.combinedDocuments.map(obj => 
        {
          if(obj.uploadedDocId == reqData.uploadedDocId)
          {
            obj.uploadedDocId = updatedData.uploadedDocId;
            obj.DocumentVersion = updatedData.DocumentVersion;
            obj.uploadedDocName = updatedData.uploadedDocName;
            obj.IsDocumentMapped = updatedData.IsDocumentMapped;
          }
        });
    }

  }

}
