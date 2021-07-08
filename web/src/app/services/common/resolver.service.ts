import { Injectable } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { NotificationService } from '../common/notification.service';
import { AppRepoService } from '../common/app-repo.service';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { StartUpService } from './startup.service';

@Injectable({
    providedIn: 'root'
})
export class ResolverService implements Resolve<Promise<any>> {

    constructor(
        private _startUpService: StartUpService
    ) { }


    resolve() {
        return this._startUpService.Init();
    }
}