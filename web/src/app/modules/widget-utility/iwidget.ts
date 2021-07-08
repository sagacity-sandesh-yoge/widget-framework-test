export interface IHelpTextData{
    getLabelShortHelpText(name: string);
    getIconDetailsHelpText(name: string);
    hasHelpIcon(name: string);
}

export interface IWidget{
    // convert api response data
    ConvertData(response: any);

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