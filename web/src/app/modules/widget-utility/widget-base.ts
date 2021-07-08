import { ViewChildren, QueryList, Directive } from '@angular/core';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ComponentBuilderService } from 'src/app/services/component-builder/component-builder.service';
import { EventActionService } from 'src/app/services/common/event-action.service';
import { PlaceHolderComponent } from '../shared/place-holder/place-holder.component';
import { WidgetConstants } from './widget-constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { SessionStorageService } from 'src/app/services/common/session-storage.service';
import { environment } from 'src/environments/environment';

@Directive()
export class WidgetBase {

    protected pageReq = { "page": "Operational Dashboard" }

    instance: any;
    pageInstance: any;
    getCurrentMonth: Date;
    eventHandler: Function;
    compRefInstancesMap = new Map<string, any>();
    globalParameters = new Map<string, any>();
    pageDataApiUrl = '/v1/widget/getpagedata';
    pageSubmitDataApiUrl = '/v1/widget/getpagesubmitdata';
    dynamicMethod: Function;
    pageprop: any;
    submitData: any;
    requestCount: number = 0;

    @ViewChildren(PlaceHolderComponent) private placeHolders: QueryList<PlaceHolderComponent>;

    constructor(private _serverApiBase: ServerApiInterfaceServiceService,
        private _componentBuilderServiceBase: ComponentBuilderService,
        private _eventActionServiceBase: EventActionService,
        private _baseSessionStorageService: SessionStorageService,
        private _baseRouter: Router,
        private _baseSpinner?: NgxSpinnerService,        
    ) { 
        if(!_baseRouter)
        return;

        if(!_baseSessionStorageService)
        return;

            _baseRouter.events.forEach((event) => {
                // set data to global parameters
                if(event instanceof NavigationStart) {

                let navigation_data_keys =    this.globalParameters.get("navigationDataKeys");

                if(!navigation_data_keys)
                return;

                let navigationData = new Map<string,object>();

                navigation_data_keys.forEach(element => {
                    navigationData.set(element,this.globalParameters.get(element));                    
                });
                    
                 _baseSessionStorageService.setNavigationData(navigationData);

                }            
              });

              this.initNavigationData();
         
    }

    initBase() {
        this.getSubmitData().then(() => {
            this.getPageData();
        });
    }


    initNavigationData(){      
        
        if(!this._baseSessionStorageService)
        return;
        
        let navigationData = this._baseSessionStorageService.getNavigationData();

        if(!navigationData || !(navigationData instanceof Map))
        return;
       
        navigationData.forEach((value,key) => {
            this.globalParameters.set(key,value);
        });
    }


    getSubmitData() {

        return new Promise((resolve, reject) => {
            this._serverApiBase.post<any, any>(this.pageSubmitDataApiUrl, this.pageReq).subscribe(response => {
                if (response) {
                    this.submitData = response;
                }
                resolve(response);
            }, error => {
                switch (error.code) {
                    case ErrorCodes.INVALID_USER_ACCESS:
                        //this._notificationService.error('Invalid User Access');
                        break;
                }
                reject();
            });
        });
    }

    getPageData() {
        this._serverApiBase.post<any, any>(this.pageDataApiUrl, this.pageReq).subscribe(response => {

            if (response) {

                this.compRefInstancesMap.clear();

                response.forEach((widgetItem) => {


                    try {

                        if (widgetItem.position == 'page') {
                            let properties = JSON.parse(widgetItem.properties);
                            this.pageprop = properties;
                        } else {

                            let placeHoldersFiltered = this.placeHolders.filter((item) => item.viewContainerRef.element.nativeElement.id == widgetItem.position)

                            if (placeHoldersFiltered.length == 0) { return; }

                            let placeHolder = placeHoldersFiltered[0];

                            let builderResult = this._componentBuilderServiceBase.CreateComponet(widgetItem.widget, placeHolder)

                            if (!builderResult.isSuccess) { return; }
                           
                            if(environment.debugWidget){
                                builderResult.componentRef.location.nativeElement.setAttribute("widget_page_id",  widgetItem.id);
                                builderResult.componentRef.location.nativeElement.setAttribute("page_name",  this.pageReq.page);
                                builderResult.componentRef.location.nativeElement.setAttribute("widget_name", widgetItem.widget)
                            }

                            this.compRefInstancesMap.set(widgetItem.position, builderResult.componentRef.instance)

                            let properties = JSON.parse(widgetItem.properties);

                            builderResult.componentRef.instance.dataModel = this.ObjectDeepAssign(builderResult.componentRef.instance.dataModel, properties);
                            if(builderResult.componentRef.instance.dataModel){
                                builderResult.componentRef.instance.dataModel.PAGE_NAME = this.pageReq.page;
                            }
                           
                        
                            const submitData = this.submitData.filter(item => item.position == widgetItem.position);
                            let submitDataItem = submitData[0];


                            // widget submit data properties mapping
                            if (builderResult.componentRef.instance.dataModel.submitProperties && submitDataItem) {
                                // if (submitData.length == 0) {
                                //     console.log(widgetItem.position)
                                //     return;
                                // }
                                const submitProperties = JSON.parse(submitDataItem.properties);
                                const dataPositions = JSON.parse(submitDataItem.datapositions);
                                builderResult.componentRef.instance.dataModel.submitProperties = submitProperties;
                                Object.assign(builderResult.componentRef.instance.dataModel.submitProperties, dataPositions);
                                builderResult.componentRef.instance.dataModel.submitProperties.id = submitDataItem.id;
                                builderResult.componentRef.instance.dataModel.submitProperties.submitcode = submitDataItem.submitcode;
                            }

                            builderResult.componentRef.instance.dataModel.widgetinstanceid = widgetItem.id

                            builderResult.componentRef.instance.dataModel.globalParameters = this.globalParameters;

                            if (widgetItem.eventactions) {
                                let eventActionsMap = new Map(JSON.parse(widgetItem.eventactions))
                                builderResult.componentRef.instance.configModel.EventAction = eventActionsMap;
                            }

                            builderResult.componentRef.instance.configModel.EventAction.forEach((events: any, eventName: string) => {
                                builderResult.componentRef.instance.configModel.CompToCaller.addListener(eventName, (eventparams) => {
                                    events.forEach(eventItem => {
                                        this.componentEventHandler(builderResult.componentRef.instance.dataModel,eventItem, eventparams)
                                    });
                                }
                                );
                            });
                            builderResult.componentRef.instance.configModel.CompToCaller.addListener(WidgetConstants.ON_REQUEST, (eventparams) => {
                                    this.pageEventHandler(WidgetConstants.ON_REQUEST, eventparams)
                            });

                            builderResult.componentRef.instance.configModel.CompToCaller.addListener(WidgetConstants.ON_REQUEST_COMPLETED, (eventparams) => {
                                this.pageEventHandler(WidgetConstants.ON_REQUEST_COMPLETED, eventparams)
                            });

                            if (builderResult.componentRef.instance.InitComponent) {
                                builderResult.componentRef.instance.InitComponent();
                            }                            
                        }

                    } catch (e) {
                        console.error(e);
                        console.log("Error widget:", widgetItem)
                    }

                });

                // console.log("compRefInstancesMap", this.compRefInstancesMap);
            }

        }, error => {
            switch (error.code) {
                case ErrorCodes.INVALID_USER_ACCESS:
                    //this._notificationService.error('Invalid User Access');
                    break;
            }
        });
    }

    ObjectDeepAssign(target, source) {
        let output = Object.assign({}, target);
        Object.keys(source).forEach(key => {
            if (Object.prototype.toString.call(source[key]) == '[object Object]') {
                if (target[key]) {
                    const obj = this.ObjectDeepAssign(target[key], source[key])
                    Object.assign(output, { [key]: obj });
                } else {
                    Object.assign(output, { [key]: source[key] });
                }

            } else {
                Object.assign(output, { [key]: source[key] });
            }
        })
        return output;
    }

    componentEventHandler(wigDataContext: any,eventItem: any, eventparams: any) {
        this.eventHandler = this._eventActionServiceBase.getEventHandler(eventItem.action)
        this.eventHandler(wigDataContext, eventItem.params, eventparams, eventItem.posteventaction) //Executing method in current context
    }

    pageEventHandler(eventItem: any, eventparams: any) {
        switch(eventItem){
            case WidgetConstants.ON_REQUEST:
              
                 this.showSpinner()
                break;
            case WidgetConstants.ON_REQUEST_COMPLETED:
               
              
                    this.hideSpinner()
                            
                break;
        }
    }

    showSpinner(){
        if (this._baseSpinner) {
            this.requestCount++;
            this._baseSpinner.show()  
        }        
     }
   
     hideSpinner(){
        if(this._baseSpinner){
            this.requestCount--;
            if(this.requestCount == 0){
                this._baseSpinner.hide()
            }
        }  
     }

    RefreshData() {
        this.compRefInstancesMap.forEach(instance => {
            instance.configModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
        });

    }

    removeListeners() {
        this.compRefInstancesMap.forEach(instance => {
            instance.configModel.CompToCaller.removeAllListeners();
        });
    }

    OnPropChangedRemoveListeners() {
        this.compRefInstancesMap.forEach(instance => {
            instance.configModel.CompToCaller.removeAllListeners();
        });
    }

    async onSelectedWFPropChange() {
        await this.OnPropChangedRemoveListeners();
        await this.clearPlaceHolderRef();
        this.getPageData();
    }

    clearPlaceHolderRef() {
        this.placeHolders.forEach((pRef) => {
            let viewContainerRef = pRef.viewContainerRef;
            viewContainerRef.clear();
        })
    }

}
