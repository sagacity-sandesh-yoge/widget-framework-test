import { EventEmitter } from 'events';

export class DragdropConfigModel {
   
    static getInstance<T>(): DragdropConfigModel {
        let model = new DragdropConfigModel();
        return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    public static readonly CALLER_TO_COMP_REFRESH_DOC_LIST = "REFRESH_DOC_LIST";
    public static readonly CALLER_TO_COMP_REFRESH_AFTER_ADD_REQUEST_TABLES = "REFRESH_AFTER_ADD_REQUEST_TABLES";
    public static readonly CALLER_TO_COMP_REFRESH_AFTER_DELETE_TABLE = "REFRESH_AFTER_DELETE_TABLE";
    public static readonly CALLER_TO_COMP_REFRESH_AFTER_DOC_VERSION_UPLOAD = "REFRESH_AFTER_DOC_VERSION_UPLOAD";

    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class DragdropModel {
    mode(arg0: string, mode: any) {
      throw new Error('Method not implemented.');
    }
    static getInstance<T>(): DragdropModel {
        let model = new DragdropModel();
        model.globalParameters = new Map();
        model.isSelfDataLoad = false;
        model.item = new DragdropItemModel();
        model.apiDataUrl = '';
        model.isGlobalParams = false;
        model.globalParamterKeys = [];
        model.requestedTableTypesData = [];
        model.vehicleModelList = [];
        model.documentList = [];
        model.combinedDocuments = [];
        model.requestedVehicleModelList = [];
        model.caseDetails = [];
        return model;
    }
    globalParamterKeys: string[];
    isGlobalParams: boolean;
    isSelfDataLoad: boolean;
    fieldPermissions: Map<string, string>
    id: number;
    widgetinstanceid: number;
    globalParameters: Map<string, any>;
    apiDataUrl: string;
    item: DragdropItemModel;
    apireqdata: any = {};

    requestedVehicleModelList: VehicleModel[];
    requestedTableTypesData:RequestedTableTypes[];
    vehicleModelList: VehicleModel[];
    documentList: DocumentListModel[];
    combinedDocuments: DocumentListModel[];

    caseDetails: any;
}

export class DragdropItemModel {
    removeDraggedItem: boolean;
    removeMappedItem:boolean;
}

export class VehicleModel {
    caseVehicalModelId: number;
    vehicleModelName: string;
    vehicleCategory: string;
    engine: string;
    fuelType: string;
    emmistionNorms: string;
    modelDocumentList: ModelDocumentList[];
    
    constructor() {
        this.modelDocumentList = [];
    }
}

export class DocumentListModel {
    uploadedDocId: any;
    uploadedDocName: any;
    IsDocumentMapped: boolean = true;
    DocumentVersion: any;
}

export class ModelDocumentList {
    vhlSuggDocID:any;
    modelTableDocId: any;
    modelTableDocName: any;
    items: DocumentListModel[];
    multiple: boolean;
    documentMetaData: any;
    constructor() {
        this.items = [];
    }
}

export class VehicleModelFormData {

    requestTableModelDocMapping : DocModelFormData[];
    caseModelDocMapping : DocModelFormData[];
   
}

export class DocModelFormData {
    isCombinedDocMapping:any;
    caseid: any;
    vhlSuggDocId: any;
    caseVehicleModelId:any;
    uploadedDocId:any;
}


export class RequestedTableTypes{
    ModelId:any;
    TableTypeId:any;
    UiMetaData:any;
    Value:any;
    Code:any;
}