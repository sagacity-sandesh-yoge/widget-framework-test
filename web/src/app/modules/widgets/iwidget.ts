export interface IWidget{
    id:string;
    apiDataUrl:string;
    globalParameters: Map<string, any>;
    fieldApiCount: number;
    InitComponent();
    RefreshData();
    PrepareFieldData() : Promise<any>
    GetControlData() 
    ConvertData(response: any);
    ShowLoader();
    HideLoader()
}

export interface IWidgetSubmit {
    Validate():boolean;
    GetValue();
    Reset();
    SetValue(value); 
}

export interface IWidgetConfig{
    EventAction : Map<string,any>;    
}


export interface IWidgetGlobalDataAccess {
    //This method will set the global parameter in request data.
    SetRequestData() 
    SetFormData();
}