import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WidgetConstants } from 'src/app/modules/widget-utility/widget-constants';
import { MethodCall } from '@angular/compiler';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { NotificationService } from './notification.service';
import { SaveFileService } from './save-file.service';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
import { APP_SETTING } from 'src/app/constants/app-repo.constants';

@Injectable({
    providedIn: 'root'
})
export class EventActionService implements OnDestroy {


    EventActionMap = new Map();
    globalParameters = new Map<string, any>(); // this variable not used, however it is taken for reference only
    compRefInstancesMap = new Map<string, any>();
    dynamicMethod: Function;
    instance: any;

    constructor(private _router: Router,
        private _serverApi: ServerApiInterfaceServiceService,
        private _notificationService: NotificationService,
        private _helperService: AppRepoHelperService,
        private _saveFileService: SaveFileService
    ) {
        this.EventActionMap.set("htmlToPdfFileDownload", this.ActionHtmlToPdfFileDownload);
        this.EventActionMap.set("htmlToPdfFilePrint", this.ActionHtmlToPdfFilePrint);
        this.EventActionMap.set("exportData", this.ActionExport);
        this.EventActionMap.set("applyFilter", this.ActionApplyFilter);
        this.EventActionMap.set("resetFilter", this.ActionResetFilter);
        this.EventActionMap.set("navigate", this.ActionNavigate);
        this.EventActionMap.set("refresh", this.ActionRefreshData);
        this.EventActionMap.set("dynamic", this.ActionDynamicMethod);
        this.EventActionMap.set("showPopup", this.ActionShowPopup);
        this.EventActionMap.set("redirect", this.ActionRedirect);
        this.EventActionMap.set("refreshWithReq", this.ActionSearch);
        this.EventActionMap.set("setPageProperties", this.ActionSetPageProp);
        this.EventActionMap.set("setBreadcrumbItem", this.ActionSetBreadcrumbItem);
        this.EventActionMap.set("setBreadcrumbsView", this.ActionSetBreadcrumbsView);
        this.EventActionMap.set("showPopupByPropChange", this.ActionShowPopupByPropChange);
        this.EventActionMap.set("executePageMethod", this.ActionExecutePageMethod);
        this.EventActionMap.set("onsubmitwithuserdata", this.ActionOnSubmitWithUserData);
        this.EventActionMap.set("onsubmit", this.ActionOnSubmit);
        this.EventActionMap.set("dynamicRefresh", this.ActionDynamicRefreshData);
        this.EventActionMap.set("dynamicRefreshArray", this.ActionDynamicRefreshDataArray);
        this.EventActionMap.set("dynamicToaster", this.ActionDynamicToasterNotification);
        this.EventActionMap.set("resetFormData", this.resetFormData);
        this.EventActionMap.set("setNavPathFromReq", this.ActionSetNavigationPathFromReq);
        this.EventActionMap.set("navigationWithRouteParams", this.ActionNavigationWithRouteParams);
        this.EventActionMap.set("processSubmitResponseSetKey", this.ActionProcessSubmitResponseSetKey);
        this.EventActionMap.set("setNavPathForInsertUpdate", this.ActionSetNavPathForInsertUpdate);
        this.EventActionMap.set("navigateWithParams", this.ActionNavigationWithStaticRouteParams);
        this.EventActionMap.set("dynamicNavigationWithRouteParams", this.ActionDynamicNavigationWithRouteParams);
        this.EventActionMap.set("setGlobalParams", this.ActionSetGlobaParams);
        this.EventActionMap.set("fileUploadWithUserData", this.ActionOnFileUploadWithUserData);
        this.EventActionMap.set("downloadFile", this.ActionDownload);
        this.EventActionMap.set("setNavigationData", this.ActionSetNavigationData);
        this.EventActionMap.set("copyWidgetData", this.ActionCopyWidgetData);
        this.EventActionMap.set("openFileInNewTab", this.ActionOpenFileInNewTab)
        this.EventActionMap.set("submitDataWithOrWithoutFileupload", this.ActionSubmitDataWithOrWithoutFileupload);
        this.EventActionMap.set("refreshEventAction", this.ActionRefreshAnyEventAction);
        this.EventActionMap.set("saveExcelFile", this.ActionSaveExcelFile);
        this.EventActionMap.set("navigateExternalUrl", this.NavigateExternalURL);
        this.EventActionMap.set("saveZipFile", this.ActionSaveZipFile);

    }


    ActionHtmlToPdfFileDownload(wigDataContext: any, params: any, eventparams: any) {


            let page = this.instance;
            let isValid = true;
            let skipSpinner;
            var submitData = Object();
            submitData.id = eventparams.id;
            submitData.updateId = eventparams.updateId;
            submitData.queryAction = eventparams.queryAction;
            if(params[0].submitcode){
                submitData.executeactionsubmitcode = params[0].submitcode
        }
            if (params[0].dataposition) {
                eventparams.positions = params[0].dataposition
        }
    
            params.forEach(param => {
                if (param.skipSpinner) {
                    skipSpinner = param.skipSpinner
                }
            })
            try {
    
                eventparams.positions.forEach(position => {
                    var compInstance = this.compRefInstancesMap.get(position);
                    if(compInstance && compInstance.GetValue){
                        const data = compInstance.GetValue();
                        Object.assign(submitData, data);
                    }
                   
                });
    
                const apiUrlConst = eventparams.apiSubmitUrl;
                if (!skipSpinner) {
                    page.showSpinner()
                } 
                this._serverApi.post<any, any>(apiUrlConst, submitData).subscribe(
                    response => {
                        if (!skipSpinner) {
                            page.hideSpinner();
                        }
                        if (response) {
                            const instance = this.compRefInstancesMap.get(params[0].Htmlposition);
                            instance.generatePDF(response.data[0].htmlcontent);

                            //this._saveFileService.downloadHtmlToPDFFile(response.data[0].htmlcontent,'abc.pdf');
                        } error => {
                            if (!skipSpinner) {
                                page.hideSpinner();
                            }
                            this._notificationService.error("Download failed");
                        }
                    },error => {
                        if (!skipSpinner) {
                            page.hideSpinner();
                        }
    
                        this._notificationService.error("Something went wrong!");
                       
                    }
                );
    
            } catch (e) {
                console.error("ActionHtmlToPdfFileDownload error:", e);
            }
    
    }
    ActionHtmlToPdfFilePrint(wigDataContext: any, params: any, eventparams: any) {


        let page = this.instance;
        let isValid = true;
        let skipSpinner;
        var submitData = Object();
        submitData.id = eventparams.id;
        submitData.updateId = eventparams.updateId;
        submitData.queryAction = eventparams.queryAction;
        if(params[0].submitcode){
            submitData.executeactionsubmitcode = params[0].submitcode
    }
        if (params[0].dataposition) {
            eventparams.positions = params[0].dataposition
    }

        params.forEach(param => {
            if (param.skipSpinner) {
                skipSpinner = param.skipSpinner
            }
        })
        try {

            eventparams.positions.forEach(position => {
                var compInstance = this.compRefInstancesMap.get(position);
                if(compInstance && compInstance.GetValue){
                    const data = compInstance.GetValue();
                    Object.assign(submitData, data);
                }
               
            });

            const apiUrlConst = eventparams.apiSubmitUrl;
            if (!skipSpinner) {
                page.showSpinner()
            }
          

            this._serverApi.post<any, any>(apiUrlConst, submitData).subscribe(
                response => {
                    if (!skipSpinner) {
                        page.hideSpinner();
                    }
                    if (response) {
                        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
                        WindowPrt.document.write(response.data[0].htmlcontent);
                        WindowPrt.document.close();
                        WindowPrt.focus();
                        WindowPrt.print();
                        WindowPrt.close();
                    } error => {
                        if (!skipSpinner) {
                            page.hideSpinner();
                        }
                        this._notificationService.error("Print failed");
                    }
                },error => {
                    if (!skipSpinner) {
                        page.hideSpinner();
                    }

                    this._notificationService.error("Something went wrong!");
                   
                }
            );

        } catch (e) {
            console.error("ActionHtmlToPdfFileDownload error:", e);
        }

}

    ActionCopyWidgetData(wigDataContext: any, params: any, eventparams: any){
        try {
            if (params[0]) {
                params[0].positions.forEach(item => {                     
                    const srcCompInstance = this.compRefInstancesMap.get(item.src);
                    const data = srcCompInstance.GetValue();

                    const targCompInstance = this.compRefInstancesMap.get(item.target);
                    targCompInstance.setFormData(data, eventparams);
               
                });               
            }
        }
        catch {
            console.error("Error : error occured while copying form data", eventparams)
        }
       
    }

    getEventHandler(eventName: string) {
        if (this.EventActionMap.has(eventName)) {
            return this.EventActionMap.get(eventName); //This methods will be executed by caller context
        } else {
            return null;
        }
    }

    
    NavigateExternalURL(wigDataContext: any, params: any, eventparams: any){

        try{
            let page = this.instance; 
            let locationcode = params.locationcode;

            let urlData = this._helperService.getAppSTByCode(locationcode.code);
            if (urlData){
                window.open(urlData.Value, "_blank");
            }
        }
        catch {
            console.error("Error : error occured while redirecting to url", eventparams)
        }
    }

       // navigate action
    ActionNavigate(wigDataContext: any, params: any, eventparams: any) {

        // {
        //     "action": "navigate",
        //     "params": {
        //         "staticKeys": [],
        //         "eventParamKeys": [
        //             {
        //                 "getKey": "caseId",
        //                 "setKey": "CaseId"
        //             },
        //             {
        //                 "getKey": "dispachRegid",
        //                 "setKey": "dispachRegid"
        //             }
        //         ],
        //         "globalParamKeys": [
        //             "caseId",
        //             "dispachRegid",
        //             "mode"
        //         ],
        //         "location": {
        //             "path": "/admin/case/disp/add-dispatch-register"
        //         }
        //     }
        // }


        //Static Keys is parameterized key passed to the navigation data
        let statickeys = params.staticKeys;
        //Get value of these keys from event params        
        let eventParamKeys = params.eventParamKeys;
        let globalParamKeys = params.globalParamKeys;
        let location = params.location;

        let page = this.instance;     
        let navigationData = new Map<string,object>();
        let globalNavigationKeys =[];

        let staticKeysMap = new Map<string,object>(statickeys);

        staticKeysMap.forEach((value,key) => {
            navigationData.set(key, value);
        });


        let findProp = function(obj, prop, defval?){
            if (typeof defval == 'undefined') defval = null;
            prop = prop.split('.');
            for (var i = 0; i < prop.length; i++) {
                if(typeof obj[prop[i]] == 'undefined')
                    return defval;
                obj = obj[prop[i]];
            }
            return obj;
        }

        eventParamKeys.forEach(item => {           
            navigationData.set(item.setKey,findProp(eventparams.dataContext, item.getKey));
        });

        globalParamKeys.forEach(item => {
            globalNavigationKeys.push(item);
        });

        navigationData.forEach((value,key) => {
            globalNavigationKeys.push(key);
            this.instance.globalParameters.set(key,value);   
        });

        this.instance.globalParameters.set("navigationDataKeys",globalNavigationKeys);    

        if(location.path){
            this._router.navigate([params.location.path]);
        }else{
            this._router.navigate([findProp(eventparams.dataContext, params.location.eventParamKey)]);
        }
    }

    ActionDynamicNavigationWithRouteParams(wigDataContext: any, params: any, eventparams: any) {
        var navigationData = eventparams[params.navigationKey]
        var location = params.locationKey ? eventparams[params.locationKey] : params.location;
        this._router.navigate([location, navigationData]);
    }

    ActionNavigationWithStaticRouteParams(wigDataContext: any, params: any, eventparams: any) {
        this._router.navigate([params.location, eventparams.apireqdata[params.getkey]]);
    }

    ActionNavigationWithRouteParams(wigDataContext: any, params: any, eventparams: any) {
        var navigationData = eventparams.dataContext[params.getkey]
        this._router.navigate([params.location, navigationData]);
    }

   

    ActionSetNavigationData(wigDataContext: any, params: any, eventparams: any) {
        let keys = params.globalParamKeys;
        let page = this.instance;      
        page.globalParameters["navigationDataKeys"] = keys;    
    }

    ActionProcessSubmitResponseSetKey(wigDataContext: any, params: any, eventparams: any) {
      if (!eventparams.dataContext) {
            eventparams.dataContext = {}
        }
        eventparams.dataContext[params.setkey] = eventparams.responseData[0].insertedid
    }

    ActionSetNavigationPathFromReq(wigDataContext: any, params: any, eventparams: any) {
        if (!eventparams.dataContext) {
            eventparams.dataContext = {}
        }
       
        eventparams.dataContext[params.getkey] = eventparams.reqData[params.getkey]
    }

    ActionSetNavPathForInsertUpdate(wigDataContext: any, params: any, eventparams: any) {
        let page = this.instance;
        if (!eventparams.dataContext) {
            eventparams.dataContext = {}
        }
        if (eventparams.queryAction === "insert") {
            eventparams.dataContext[params.setkey] = eventparams.responseData[0].insertedid;
        } else {
            eventparams.dataContext[params.getkey] = eventparams.reqData[params.getkey]
        }

        //This code will be used further and need to change previous references
        page.globalParameters[params.setkey] = eventparams.dataContext[params.setkey];
    }

    resetFormData(wigDataContext: any, params: any, eventparams: any) {
        try {
            if ((params[0])) {
                if (params[0].position) {
                    const instance = this.compRefInstancesMap.get(params[0].position);
                    const mode = params[0].mode;
                    instance.dataModel.mode = mode;
                    instance.resetForm(mode);
                }
            }
        }
        catch {
            console.error("Error : error occured while reseting form data", eventparams)
        }

    }

    // dynamic refresh widget data
    ActionDynamicRefreshData(wigDataContext: any, params: any, eventparams: any) {
        let position: any;
        let src = eventparams;
        Object.keys(params).forEach((key) => {
            // console.log(`key = param[key] :  ${key} = ${param[key]}`);
            eval(`${key} = ${params[key]}`);
        });
        const instance = this.compRefInstancesMap.get(position);
        instance.configModel.CallerToComp.emit(
            WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
        );
    }

    ActionDynamicRefreshDataArray(wigDataContext: any, params: any, eventparams: any) {
        params.position.forEach(position => {
            const instance = this.compRefInstancesMap.get(position);
            instance.configModel.CallerToComp.emit(
                WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            )
        });

    }


    ActionDynamicToasterNotification(wigDataContext: any, params: any, eventparams: any) {
        let src = eventparams;
        let toaster = Object();
        try {
            Object.keys(params).forEach((key) => {
                eval(`${key} = ${params[key]}`);
            });
            if (toaster.issuccess) {
                this._notificationService.success(toaster.msg);
            } else {
                this._notificationService.error(toaster.msg);
            }

        } catch (e) {
            console.error("ActionDynamicSendToasterNotification error:", e);
        }

    }



    //Info: Here this refers to the caller componet hence any variable with "this." should be present 
    //caller compoent with same variable name e.g. in this case  "_router" should be present in caller

    // apply filter action
    ActionApplyFilter(wigDataContext: any, params: any, eventparams: any) {

        let page = this.instance.pageInstance;
        let src = eventparams;
        let targ;

        params.forEach(param => {
            try {
                let filterPosition = Object.keys(param).find((key) => key == "page.filterposition");
                filterPosition = param[filterPosition].replace(/'/g, "");
                const filterCompInstance = page.compRefInstancesMap.get(filterPosition);

                let gridPosition = Object.keys(param).find((key) => key == "page.gridposition");
                gridPosition = param[gridPosition].replace(/'/g, "");
                const gridCompInstance = page.compRefInstancesMap.get(gridPosition);

                const isvalid = filterCompInstance.Validate();
                if (!isvalid) {
                    page.collapse = false;
                    return false;
                }
                page.collapse = true;
                var filterData = filterCompInstance.GetValue();
               
                //gridCompInstance.dataModel.apireqdata.wf = 'filter';
                if(gridCompInstance){
                targ = gridCompInstance.dataModel;
                Object.keys(param).forEach((key) => {
                    eval(`${key} = ${param[key]}`);
                });
                gridCompInstance.dataModel.apireqdata.fromlimit = 0;
                Object.assign(gridCompInstance.dataModel.apireqdata, filterData);
                gridCompInstance.ResetPagination();
                gridCompInstance.configModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
            }
            } catch (e) {
                console.error("ActionApplyFilter error:", e);
            }
        });
    }

    ActionResetFilter(wigDataContext: any, params: any, eventparams: any) {

        let page = this.instance.pageInstance;
        let src = eventparams;
        let targ;

        params.forEach(param => {
            try {
                let filterPosition = Object.keys(param).find((key) => key == "page.filterposition");
                filterPosition = param[filterPosition].replace(/'/g, "");
                const filterCompInstance = page.compRefInstancesMap.get(filterPosition);

                let gridPosition = Object.keys(param).find((key) => key == "page.gridposition");
                gridPosition = param[gridPosition].replace(/'/g, "");
                const gridCompInstance = page.compRefInstancesMap.get(gridPosition);

                filterCompInstance.Reset();

                var filterData = filterCompInstance.GetValue();
                //gridCompInstance.dataModel.apireqdata.wf = undefined;
                if (gridCompInstance) {
                    targ = gridCompInstance.dataModel;
                    Object.keys(param).forEach((key) => {
                        eval(`${key} = ${param[key]}`);
                    });
                    Object.assign(gridCompInstance.dataModel.apireqdata, filterData);
                    gridCompInstance.ResetPagination();
                    gridCompInstance.configModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
                }
            } catch (e) {
                console.error("ActionResetFilter error:", e);
            }
        });
    }

  

    // refresh widget data
    ActionRefreshData(wigDataContext: any, params: any, eventparams: any) {
        const instance = this.compRefInstancesMap.get(params.position);
        instance.configModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
    }

    // refresh any event
    ActionRefreshAnyEventAction(wigDataContext: any, params: any, eventparams: any) {
        let targ;
        let page = this.instance.pageInstance;
        params.forEach(param => {
            try {
                var position = Object.keys(param).find((key) => key == "page.position");
                position = param[position].replace(/'/g, "");

                const compInstance = page.compRefInstancesMap.get(position);
                targ = compInstance.dataModel;
          
                let refreshEventName;
                Object.keys(param).forEach((key) => {
                    eval(`${key} = ${param[key]}`);
                });

                let data = eventparams.reqData;
                if(data){
                    data.eventparamsData = eventparams;
                }               
                compInstance.configModel.CallerToComp.emit(refreshEventName, data);

            } catch (e) {
                console.error("ActionRefreshAnyEventAction error:", e);
            }
        });
       
    }

    ActionDynamicMethod(wigDataContext: any, params: any, eventparams: any) {

        try {
            this.dynamicMethod = new Function(params)();
            this.dynamicMethod(eventparams)
        } catch (e) {
            console.error("Error occured while compiling/executing dynamic method", params, e)
        }

    }

    ActionShowPopup(wigDataContext: any, params: any, eventparams: any) {

        let popupHolderInstance = this.instance.popupHolderInstance
        let page = this.instance.pageInstance;
        let src = eventparams;
        let targ;

        params.forEach(param => {
            try {
                var position = Object.keys(param).find((key) => key == "page.position");
                position = param[position].replace(/'/g, "");

                const compInstance = page.compRefInstancesMap.get(position);
                targ = compInstance.dataModel;
                Object.keys(param).forEach((key) => {
                    // console.log(`key = param[key] :  ${key} = ${param[key]}`);
                    eval(`${key} = ${param[key]}`);
                });
                compInstance.configModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);

            } catch (e) {
                console.error("ActionShowPopup error:", e);
            }
        });

        popupHolderInstance.showDialog();

    }

    ActionShowPopupByPropChange(wigDataContext: any, params: any, eventparams: any) {

        let page = this.instance.pageInstance;
        let src = eventparams;
        let targ;

        params.forEach(param => {
            try {
                var position = Object.keys(param).find((key) => key == "page.position");

                let compInstance;

                if (position) {
                    position = param[position].replace(/'/g, "");
                    compInstance = page.compRefInstancesMap.get(position);
                    targ = compInstance.dataModel;
                }

                Object.keys(param).forEach((key) => {
                    // console.log(`key = param[key] :  ${key} = ${param[key]}`);
                    eval(`${key} = ${param[key]}`);
                });

                if (position) {
                    compInstance.configModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
                }

            } catch (e) {
                console.error("ActionShowPopupByPropChange error:", e);
            }
        });

    }

    // redirect to redirection url in new window
    ActionRedirect(wigDataContext: any, params: any, eventparams: any) {
        const url = eventparams.redirectionurl + params.location
        window.open(url);
    }

    ActionSearch(wigDataContext: any, params: any, eventparams: any) {
        let page = this.instance;
        let src = eventparams;
        let targ;

        params.forEach(param => {
            try {
                var position = Object.keys(param).find((key) => key == "page.position");

                let compInstance;

                if (position) {
                    position = param[position].replace(/'/g, "");
                    compInstance = page.compRefInstancesMap.get(position);
                    targ = compInstance.dataModel;
                }

                Object.keys(param).forEach((key) => {
                    // console.log(`key = param[key] :  ${key} = ${param[key]}`);
                    eval(`${key} = ${param[key]}`);
                });
                compInstance.configModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);

            } catch (e) {
                console.error("ActionSearch error:", e);
            }
        });

    }

    ActionSetPageProp(wigDataContext: any, params: any, eventparams: any) {
        let page = this.instance;
        let src = eventparams;
        params.forEach(param => {
            try {

                Object.keys(param).forEach((key) => {
                    // console.log(`key = param[key] :  ${key} = ${param[key]}`);
                    eval(`${key} = ${param[key]}`);
                });

            } catch (e) {
                console.error("ActionSetPageProp error:", e);
            }
        });
    }

    ActionSetGlobaParams(wigDataContext: any, params: any, eventparams: any) {
        let page = this.instance;
        let src = eventparams;
        let targ;

        params.forEach(param => {
            try {
                var position = Object.keys(param).find((key) => key == "page.position");

                let compInstance;

                if (position) {
                    position = param[position].replace(/'/g, "");
                    compInstance = page.compRefInstancesMap.get(position);
                    if(compInstance){
                        targ = compInstance.dataModel;
                    }                    
                }

                Object.keys(param).forEach((key) => {
                    targ?.globalParameters.set(key, eval(param[key]));
                });


            } catch (e) {
                console.error("ActionSetGlobaParams error:", e);
            }
        });
    }

    ActionSetBreadcrumbItem(wigDataContext: any, params: any, eventparams: any) {
        let src = eventparams;
        let targ;
        params.forEach(param => {
            var position = Object.keys(param).find((key) => key == "position");
            position = param[position].replace(/'/g, "");

            const compInstance = this.compRefInstancesMap.get(position);
            targ = compInstance.dataModel;
            eval(`compInstance.dataModel.items.push(${param["propname"]})`);
        });
    }

    ActionSetBreadcrumbsView(wigDataContext: any, params: any, eventparams: any) {
        let page = this.instance;
        page.viewMap.forEach(element => {
            if (params[0].breadcrumbCode == element.name) {
                eval('this.' + element.value + "=false");
            } else {
                eval('this.' + element.value + "=true");
            }
        });
    }


    ActionOpenFileInNewTab(wigDataContext: any, params: any, eventparams: any) {
        let page = this.instance;
        let skipSpinner;
        let reqData = Object();
        reqData.data = Object();
        
        if (params.downloadKey instanceof Array) {
            params.downloadKey.forEach(element => {
                reqData.data[element]=eventparams[element]
            })
        }
        else {
            reqData.data.nodelist = eventparams[params.downloadKey];
        }
        
        const downloadApiUrl = wigDataContext.downloadApiUrl ? wigDataContext.downloadApiUrl:"/v1/utility/downloadfile";
        if (params.skipSpinner) {
            skipSpinner = params.skipSpinner
        }
        if (!skipSpinner) {
            page.showSpinner()
        }
        this._serverApi.downloadTextFile(downloadApiUrl, reqData.data)
            .subscribe(response => {
                if (!skipSpinner) {
                    page.hideSpinner()
                }
                this._saveFileService.openFileInNewTab(response);
            },
                error => {
                    if (!skipSpinner) {
                        page.hideSpinner()
                    }
                    this._notificationService.error("Operation failed");
                });
    }

    ActionDownload(wigDataContext: any, params: any, eventparams: any) {
        let page = this.instance;
        let skipSpinner;
        let reqData = Object();
        reqData.data = Object();
        
        if (params.downloadKey instanceof Array) {
            params.downloadKey.forEach(element => {
                reqData.data[element]=eventparams[element]
            })
        }
        else {
            reqData.data.nodelist = eventparams[params.downloadKey];
        }
        
        const downloadApiUrl = wigDataContext.downloadApiUrl ? wigDataContext.downloadApiUrl:"/v1/utility/downloadfile";
        if (params.skipSpinner) {
            skipSpinner = params.skipSpinner
        }
        if (!skipSpinner) {
            page.showSpinner()
        }
        this._serverApi.download(downloadApiUrl, reqData.data)
            .subscribe(response => {
                if (!skipSpinner) {
                    page.hideSpinner()
                }
                this._saveFileService.saveFile(response, eventparams[params.fileNameKey]);
            },
                error => {
                    if (!skipSpinner) {
                        page.hideSpinner()
                    }
                    this._notificationService.error("Download failed");
                });
    }

    
    ActionExport(wigDataContext: any, params: any, eventparams: any) {
        let page = this.instance;
        let skipSpinner;
        let targ;
        let reqData = Object();
        reqData.data = Object();
        params.forEach(param => {
            try {
                let filterPosition = Object.keys(param).find((key) => key == "page.filterposition");
                filterPosition = param[filterPosition].replace(/'/g, "");
                const filterCompInstance = page.compRefInstancesMap.get(filterPosition);

                let gridPosition = Object.keys(param).find((key) => key == "page.gridposition");
                gridPosition = param[gridPosition].replace(/'/g, "");
                const gridCompInstance = page.compRefInstancesMap.get(gridPosition);
                let filterData = {};
                if(filterCompInstance){
                    const isvalid = filterCompInstance.Validate();
                    if (!isvalid) {
                        page.collapse = false;
                        return false;
                    }
                    page.collapse = true;
                    filterData = filterCompInstance.GetValue();
                }                
               
                if(gridCompInstance){
                targ = gridCompInstance.dataModel;
                Object.keys(param).forEach((key) => {
                    eval(`${key} = ${param[key]}`);
                });
                Object.assign(gridCompInstance.dataModel.apireqdata, filterData);

                Object.assign(reqData.data, gridCompInstance.dataModel.apireqdata);
                reqData.data.id = gridCompInstance.dataModel.widgetinstanceid;
            }
            } catch (e) {
                console.error("ActionExport error:", e);
            }
        });
  
        const exportApiUrl = "/v1/widget/getwidgetexceldata";
        if (params.skipSpinner) {
            skipSpinner = params.skipSpinner
        }
        if (!skipSpinner) {
            page.showSpinner()
        }
 
        const exportCurrentDate = new Date().toLocaleDateString();
        this._serverApi.exportFile(exportApiUrl, reqData.data)
            .subscribe(response => {
                if (!skipSpinner) {
                    page.hideSpinner()
                }
                this._saveFileService.saveFile(response,  reqData.data["filename"] + "_" + exportCurrentDate + ".xlsx");
            },
            error => {
                if (!skipSpinner) {
                    page.hideSpinner()
                }
                this._notificationService.error("Export failed");
            });
    }

    ActionExecutePageMethod(wigDataContext: any, params: any, eventparams?: any) {
        let page = this.instance;
        params.forEach(param => {
            eval('page.' + param.methodname + '(eventparams,wigDataContext,params)');
        });
    }

    ActionOnSubmitWithUserData(wigDataContext: any, params: any, eventparams: any, posteventaction: any) {

        let page = this.instance;
        let isValid = true;
        let skipSpinner;
        var submitData = Object();
        submitData.id = eventparams.id;
        submitData.updateId = eventparams.updateId;
        submitData.queryAction = eventparams.queryAction;
        if(params[0].submitcode){
            submitData.executeactionsubmitcode = params[0].submitcode
    }
        if (params[0].dataposition) {
            eventparams.positions = params[0].dataposition
    }

        params.forEach(param => {
            if (param.skipSpinner) {
                skipSpinner = param.skipSpinner
            }
        })
        try {

            if (!eventparams.positions && eventparams.positions.length == 0) {
                console.error("ActionOnSubmitWithUserData error: submit data positions not found");
                return
            }

            eventparams.positions.forEach(position => {
                var compInstance = this.compRefInstancesMap.get(position);
                if(compInstance){
                    const isvalid = compInstance.Validate();
                    if (!isvalid && isValid) {
                        isValid = isvalid;
                    }
                }
               
            });

            if (!isValid) { return; }

            eventparams.positions.forEach(position => {
                var compInstance = this.compRefInstancesMap.get(position);
                if(compInstance && compInstance.GetValue){
                    const data = compInstance.GetValue();
                    Object.assign(submitData, data);
                }
               
            });

            const apiUrlConst = eventparams.apiSubmitUrl;
            if (!skipSpinner) {
                page.showSpinner()
            }

            this._serverApi.post<any, any>(apiUrlConst, submitData).subscribe(
                response => {
                    if (!skipSpinner) {
                        page.hideSpinner();
                    }

                    if (response) {
                        if (posteventaction && posteventaction.success) {
                            posteventaction.success.forEach(item => {
                                eventparams.reqData = submitData
                                eventparams.responseData = response.data;
                                page._eventActionService.ActionHandler(wigDataContext, item, page, eventparams)
                            });
                        }
                    } error => {
                        if (!skipSpinner) {
                            page.hideSpinner();
                        }
                        this._notificationService.error("Submit request failed");
                    }
                },error => {
                    if (!skipSpinner) {
                        page.hideSpinner();
                    }

                    this._notificationService.error("Something went wrong!");
                   
                }
            );

        } catch (e) {
            console.error("ActionOnSubmitWithUserData error:", e);
        }

    }

    ActionOnFileUploadWithUserData(wigDataContext: any, params: any, eventparams: any, posteventaction: any) {

        let page = this.instance;
        let isValid = true;
        let skipSpinner;
        var submitData = Object();
        submitData.id = eventparams.id;
        submitData.updateId = eventparams.updateId;
        submitData.queryAction = eventparams.queryAction;
        submitData.executeactionsubmitcode = eventparams.submitcode
        params.forEach(param => {
            if (param.skipSpinner) {
                skipSpinner = param.skipSpinner
            }
        })

        if (eventparams.paramkeys) {
            eventparams.paramkeys.forEach(element => {
                const val = eventparams[element]
                submitData[element] = val;
            });
        }

        let filesData = eventparams.fileData
        const formData: FormData = new FormData();
        for (const file of filesData.files) {
            formData.append('files', file);

        }

        try {

            if (!eventparams.positions && eventparams.positions.length == 0) {
                console.error("ActionOnSubmitWithUserData error: submit data positions not found");
                return
            }

            eventparams.positions.forEach(position => {
                var compInstance = this.compRefInstancesMap.get(position);
                if(compInstance && compInstance.Validate){
                    const isvalid = compInstance.Validate();
                    if (!isvalid && isValid) {
                        isValid = isvalid;
                    }
                }
                
            });

            if (!isValid) { return; }

            eventparams.positions.forEach(position => {
                var compInstance = this.compRefInstancesMap.get(position);
                if(compInstance && compInstance.GetValue){
                    const data = compInstance.GetValue();
                    Object.assign(submitData, data);
                }
                
            });

            formData.append('requestData', JSON.stringify(submitData));

            const apiUrlConst = eventparams.apiUploadUrl;
            if (!skipSpinner) {
                page.showSpinner()
            }
            this._serverApi.upload<any, any>(apiUrlConst, formData).subscribe(
                response => {

                    if (response && response.status == 'progress') {
                        //todo implement progress bar
                    }
                    else if (response) {
                        if (!skipSpinner) {
                            page.hideSpinner();
                        }
                        //this._notificationService.success('File Uploaded');
                        if (posteventaction && posteventaction.success) {
                            posteventaction.success.forEach(item => {
                                eventparams.reqData = submitData
                                eventparams.responseData = response;
                                page._eventActionService.ActionHandler(wigDataContext, item, page, eventparams)
                            });
                        }
                    }

                }, error => {
                    if (!skipSpinner) {
                        page.hideSpinner();
                    }
                    if (posteventaction && posteventaction.failure) {
                        posteventaction.failure.forEach(item => {
                            eventparams.reqData = submitData
                            eventparams.responseData = error;
                            page._eventActionService.ActionHandler(wigDataContext, item, page, eventparams)
                        });
                    }
                    else{
                        this._notificationService.error("Upload request failed");
                    }
                }
            );

        } catch (e) {
            console.error("ActionOnSubmitWithUserData error:", e);
        }

    }

    ActionSubmitDataWithOrWithoutFileupload(wigDataContext: any, params: any, eventparams: any, posteventaction: any){
        let page = this.instance;
        let skipSpinner;
        params.forEach(param => {
            if (param.skipSpinner) {
                skipSpinner = param.skipSpinner
            }
        });

        try {

            params.forEach(param => {
            try {

                 //get position of fileupload widget
                var keyname = Object.keys(param).find((key) => key == "fileupload.position");

                let compInstance;

                if (keyname) {
                    let position = param[keyname].replace(/'/g, "");
                    compInstance = page.compRefInstancesMap.get(position);
                    
                    if (compInstance && compInstance.GetValue){
                        const data = compInstance.GetValue();

                        let event = Object();
                        event.params = params;
                        if (data?.uploadedFiles.length) {

                            //If submit data with fileupload
                            eventparams.fileData = Object();
                            eventparams.fileData.files = data.uploadedFiles;
                            event.action = "fileUploadWithUserData";
                            page._eventActionService.ActionHandler(wigDataContext, event, page, eventparams, posteventaction);
                        }
                        else{
                            event.action = "onsubmitwithuserdata";
                            page._eventActionService.ActionHandler(wigDataContext, event, page, eventparams, posteventaction);
                        }
                    }                 
                }    
                } catch (e) {
                    console.error("ActionSubmitDataWithOrWithoutFileupload error:", e);
                }
            });

        } catch (e) {
            console.error("ActionSubmitDataWithOrWithoutFileupload error:", e);
        }

    }
   
    ActionOnSubmit(wigDataContext: any, params: any, eventparams: any, posteventaction: any) {

        let instance = this;

        let page = this.instance;
        let src = eventparams;
        let targ;  
        let req = Object();
        let skipSpinner;
        params.forEach(param => {
            if (param.skipSpinner) {
                skipSpinner = param.skipSpinner
            }
        })
        if(params && params[0].submitcode){
            req.executeactionsubmitcode = params[0].submitcode
        }
        if (params[0].dataposition) {
            req.positions = params[0].dataposition
        }

        try {

            params.forEach(param => {

                var position = Object.keys(param).find((key) => key == "page.position");

                let compInstance;

                if (position) {
                    position = param[position].replace(/'/g, "");
                    compInstance = this.compRefInstancesMap.get(position);
                    targ = compInstance.dataModel;
                }

                Object.keys(param).forEach((key) => {
                    if (key != "page.position") {
                        // console.log(`key = param[key] :  ${key} = ${param[key]}`);
                        eval(`${key} = ${param[key]}`);
                    }
                });


            });
        
            const apiUrlConst = targ.submitProperties.apiSubmitUrl;
            if (!skipSpinner) {
                page.showSpinner()
            }

            //  req.id = targ.submitProperties.id
            this._serverApi.post<any, any>(apiUrlConst, req).subscribe(
                response => {
                    if (response) {
                        if (!skipSpinner) {
                            page.hideSpinner();
                        }
                        if (posteventaction && posteventaction.success) {
                            posteventaction.success.forEach(item => {
                                eventparams.reqData = req
                                eventparams.responseData = response.data;
                                page._eventActionService.ActionHandler(wigDataContext, item, page, eventparams);
                            });
                        }
                    }
                },error => {
                    if (!skipSpinner) {
                        page.hideSpinner();
                    }
                }
            );

        } catch (e) {
            console.error("ActionOnSubmit error:", e);
        }

    }

    ActionHandler(wigDataContext: any, event, pageInstance, srcEventParams,posteventaction) {
        let eventHandler = pageInstance._eventActionService.getEventHandler(event.action);
        pageInstance.eventHandler = eventHandler;
        pageInstance.eventHandler(wigDataContext, event.params, srcEventParams,posteventaction);
    }

    ActionSaveExcelFile(wigDataContext: any, params: any, eventparams: any) {
        let page = this.instance;
        let src = eventparams;
        let targ;
        let data = src?.responseData[0]?.excelData?.data;
        let fileName;
        let exportCurrentDate = new Date().toLocaleDateString();
        let type = src?.responseData[0]?.excelData?.type;

        Object.keys(params).forEach((key) => {
            eval(`${key} = ${params[key]}`);
        });

        //type: ["base64", "memoryStream", "byteArray"]
        switch (type) {
            case "memoryStream":
                this._saveFileService.saveFile(data, fileName);
                break
            case "byteArray":
                this._saveFileService.saveFile(data, fileName);
                break
            default:
                this._saveFileService.saveExcelFile(data, fileName)
                break;
        }
       
    }

    ActionSaveZipFile(wigDataContext: any, params: any, eventparams: any) {
        let page = this.instance;
        let src = eventparams;
        let targ;
        let data = src?.responseData[0]?.zipData?.data;
        let fileName;
        let exportCurrentDate = new Date().toLocaleDateString();
        let type = src?.responseData[0]?.zipData?.type;

        Object.keys(params).forEach((key) => {
            eval(`${key} = ${params[key]}`);
        });

        //type: ["base64", "memoryStream", "byteArray"]
        switch (type) {
            case "memoryStream":
                this._saveFileService.saveZipFile(data, fileName);
                break
            case "byteArray":
                this._saveFileService.saveZipFile(data, fileName);
                break
            default:
                this._saveFileService.saveZipFileV2(data, fileName)
                break;
        }
       
    }

    ngOnDestroy(): void {
    }

}