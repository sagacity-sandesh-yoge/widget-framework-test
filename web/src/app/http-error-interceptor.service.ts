import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiErrorService } from './services/common/api-error.service';
import { NotificationService } from './services/common/notification.service';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private _notificationService: NotificationService,
    private _router: Router) { }
  _apiErrorService: ApiErrorService;
  

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // TODO: send the error to remote logging infrastructure
          console.log('interceptor error', error);
          switch (error.status) {
            case 401:
              // user is not autheticated, redirect to login page

              this._notificationService.error('Un-Authorised');
              this._router.navigate(['/']);
              break;
            case 403:
              this._notificationService.error('Access Denied');
              this._router.navigate(['/']);
              // No access to a resource, redirect to login or not authorized page
              break;
            case 404:
              // not found, display error to user
              break;
            case 503:
              // site under maintaince
              break;
            default:
              // display error occured to user.
              break;
          }

          switch (error.status) {
            case 403:             
            case 404:             
            case 503:
              console.log('throwError-->',error)
              return throwError(error);
              break;
             
          }
          if (error.error) {
            if (error.error.code < 5000) {
              this.handleGenericErrors(error.error.code);
              return;
            }
            console.log('throwError-->',error)
            return throwError(error.error);
          }


        })
      )
  }
  handleGenericErrors(code) {
    switch (code) {
      case 3001:
        this._notificationService.error('Data Mismatch');
        break;
      case 3002:
        this._notificationService.error('Invalid Token');
        break;
      case 3003:
        this._notificationService.error('UnAuthorised');
        break;
      case 3004:
        this._notificationService.error('Invalid user');
        break;
      case 3006:
        this._notificationService.error('Duplicate Data');
        break;
      case 3007:
        this._notificationService.error('Data not available');
        break;
      default:
        break;
    }
    this._notificationService.error('SYSTEM ERROR');
  }

}
