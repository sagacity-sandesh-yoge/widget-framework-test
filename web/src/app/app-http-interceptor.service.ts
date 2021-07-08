import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './services/common/local-storage.service';
import { SessionStorageService } from './services/common/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptorService implements HttpInterceptor {

  clientid = "";
  workflowtype = "";
  sessiontoken = "";
  userroleid ;

  constructor(private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService
    ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let interceptedReq = req;

    // clone the request to add the new header.
    if (this._sessionStorageService.getCurrentUser()) {
      this.sessiontoken = this._sessionStorageService.getCurrentUser().sessiontoken;
      this.clientid = this._sessionStorageService.getCurrentUser().clientid;
      this.userroleid = this._sessionStorageService.getCurrentUser().userroleid;
      interceptedReq = req.clone(
        {
          headers: req.headers
            .set('Authorization', this.sessiontoken)
            .set('ClientID', this.clientid)
        
        });
    }

    return next.handle(interceptedReq) as any;
  }


}
