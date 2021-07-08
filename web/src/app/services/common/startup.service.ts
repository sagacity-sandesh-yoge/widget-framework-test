import { Injectable, OnDestroy, Inject, LOCALE_ID } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { NotificationService } from '../common/notification.service';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { AppRepoService } from '../common/app-repo.service';
import { CategoryCodeConstant } from 'src/app/modules/widget-utility/widget-constants';
import { AppRepoHelperService } from './app-repo-helper.service';
import { getLocaleDateFormat, FormatWidth, getLocaleDateTimeFormat, getLocaleTimeFormat } from '@angular/common';
import { APP_SETTING, LOCAL_MASTER_DATA, OPERATORS } from 'src/app/constants/app-repo.constants';
import { MasterDataModel } from 'src/app/models/common/master-data-model';
import { MASTER_DATA } from 'src/app/constants/db.constants';

@Injectable({
    providedIn: 'root'
})
export class StartUpService implements OnDestroy {

    filterOperators : MasterDataModel[];
    constructor(
        private _serverApi: ServerApiInterfaceServiceService,
        private _notificationService: NotificationService,
        private _appRepoService: AppRepoService,
        private _appRepoHelperService: AppRepoHelperService,

        @Inject(LOCALE_ID) private locale: string
    ) { }


    Init() {
        const masterDataPromise = this.GetStartUpData();
        const appSettingsPromise = this.GetAppSettings();
        return Promise.all([masterDataPromise, appSettingsPromise])
    }

    GetStartUpData() {
        return new Promise((resolve, reject) => {

            this._serverApi.get<any>('/v1/utility/getapplicationdata').subscribe(resp => {
                if (resp) {
                    this.SetStartupDataMap(resp);
                    resolve(resp);
                }
            }, error => {
                switch (error.code) {
                    case ErrorCodes.INVALID_USER_ACCESS:
                        this._notificationService.error('Invalid User Access');
                        break;
                }
                reject()
            });
        });
    }

    SetStartupDataMap(resp) {
        this._appRepoService.appRepo.masterDataByCode =  new Map<string, MasterDataModel>();
        this._appRepoService.appRepo.masterDataByCategoryCode =   new Map<string, MasterDataModel[]>(); 
        resp.data.forEach((element: any) => {
            this._appRepoService.appRepo.masterDataByCode.set(element.code, element);
            const dataByCategoryCode: any = this._appRepoService.appRepo.masterDataByCategoryCode.get(element.categorycode);
            if (!dataByCategoryCode) {
                this._appRepoService.appRepo.masterDataByCategoryCode.set(element.categorycode, [element]);
            } else {
                dataByCategoryCode.push(element);
            }
        });

        this.SetLocalData();
    }

    GetAppSettings() {
        return new Promise((resolve, reject) => {

            this._serverApi.get<any>('/v1/utility/appsettings').subscribe(resp => {
                if (resp) {
                    this.SetAppSettingsMap(resp);
                    resolve(resp)
                }
            }, error => {
                switch (error.code) {
                    case ErrorCodes.INVALID_USER_ACCESS:
                        this._notificationService.error('Invalid User Access');
                        break;
                }
                reject()
            });
        });
    }

    SetAppSettingsMap(resp) {
        resp.data.forEach((element: any) => {
            this._appRepoService.appRepo.appSettingsMap.set(element.Code, element);
        });
        //this.setDateFormat();
    }

    public setDateFormat() {
        let globalDateFormat = this._appRepoHelperService.getAppSTByCode(APP_SETTING.USE_GLOBAL_DATE_TIME_FORMAT);
        if(globalDateFormat.Value !== 'true'){
            const dateFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);// M/d/yy         
            const dataTimeFormat = getLocaleDateTimeFormat(this.locale, FormatWidth.Short);// {1}, {0}
            const timeFormat = getLocaleTimeFormat(this.locale, FormatWidth.Short);// h:mm a

            const dateFormatFromDB = this._appRepoHelperService.getAppSTByCode(APP_SETTING.DATE_FORMAT.toString());
            dateFormatFromDB.Value = dateFormat;

            const dateTimeFormatFromDB = this._appRepoHelperService.getAppSTByCode(APP_SETTING.DATE_TIME_FORMAT.toString());
            dateTimeFormatFromDB.Value = `${dateFormat} ${timeFormat}`;
        }
    }

    SetLocalData(){
        this.filterOperators =  [
            {id: 1, categorycode: LOCAL_MASTER_DATA.FILTER_OPERATORS, code: OPERATORS.GRATER_THAN, value: OPERATORS.GRATER_THAN, displayname: OPERATORS.GRATER_THAN},
            {id: 2, categorycode: LOCAL_MASTER_DATA.FILTER_OPERATORS, code: OPERATORS.LESS_THAN_EQUAL_TO,value: OPERATORS.LESS_THAN_EQUAL_TO,displayname: OPERATORS.LESS_THAN_EQUAL_TO},
            {id: 3, categorycode: LOCAL_MASTER_DATA.FILTER_OPERATORS, code: OPERATORS.GREATER_THAN_EQUAL_TO,value: OPERATORS.GREATER_THAN_EQUAL_TO,displayname: OPERATORS.GREATER_THAN_EQUAL_TO},
            {id: 4, categorycode: LOCAL_MASTER_DATA.FILTER_OPERATORS, code: OPERATORS.EQUAL_TO,value: OPERATORS.EQUAL_TO ,displayname: OPERATORS.EQUAL_TO},
            {id: 5, categorycode: LOCAL_MASTER_DATA.FILTER_OPERATORS, code: OPERATORS.NOT_EQUAL_TO,value: OPERATORS.NOT_EQUAL_TO,displayname: OPERATORS.NOT_EQUAL_TO },
            {id: 6, categorycode: LOCAL_MASTER_DATA.FILTER_OPERATORS, code: OPERATORS.BETWEEN,value: OPERATORS.BETWEEN, displayname: OPERATORS.BETWEEN}
          ]
        this._appRepoService.appRepo.masterDataByCategoryCode.set(LOCAL_MASTER_DATA.FILTER_OPERATORS, this.filterOperators);

    }

    ngOnDestroy(): void {
    }

}