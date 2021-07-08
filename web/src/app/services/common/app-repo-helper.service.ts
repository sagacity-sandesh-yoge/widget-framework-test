import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Injectable, OnDestroy, Inject, LOCALE_ID } from '@angular/core';
import { AppRepoService } from './app-repo.service';

@Injectable({
    providedIn: 'root'
})

export class AppRepoHelperService {
    constructor(public _appRepoService: AppRepoService,
        @Inject(LOCALE_ID) private locale: string) { }

    getAppSTByCode(code: any) {
      return this._appRepoService.appRepo.appSettingsMap.get(code);
    }

    getMDataByCAT(categoryCode: any) {
        return this._appRepoService.appRepo.masterDataByCategoryCode.get(categoryCode);
    }

    getMDataByCode(code: any) {
        return this._appRepoService.appRepo.masterDataByCode.get(code);
    }

    setNavigationData(key, value) {
        this._appRepoService.appRepo.navigationData.set(key, value)
    }
    getNavigationData(key) {
     return  this._appRepoService.appRepo.navigationData.get(key)
    }

    convertDBDateToISO(dateValue:any){
        return dateValue ? (new Date(dateValue)).toISOString() : dateValue;       
    }
}