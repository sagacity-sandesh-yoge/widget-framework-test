import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../environments/environment';
import { SessionStorageService } from './services/common/session-storage.service';
import { map } from 'rxjs/operators';
import { DataHelper } from './Utlity/DataHelper';

export class ServerAPIErrorModel {
  handled: boolean;
  error: any;

  constructor(handled: boolean, error: any) {
    this.handled = handled;
    this.error = error;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ServerApiInterfaceServiceService {
  sessiontoken: string;
  clientid: string;
  userroleid;
  constructor(private http: HttpClient,
    private _sessionStorageService: SessionStorageService) { }

  get<T>(url: string, queryParams?: any): Observable<T> {

    let httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }),
      
      params: new HttpParams()
    };

    if (queryParams) {
      httpOptions.params = new HttpParams().set('param', JSON.stringify(queryParams))
    }
    return this.http.get<T>(environment.baseurl + url, httpOptions);

  }

  post<T, R>(url: string, request: T, headers?:any): Observable<R> {
    let offset:any = new Date().getTimezoneOffset();
    offset = `${offset * (-1)}`;
    headers =  new HttpHeaders({
      ClientTZOffSet:  offset
    }); 
    let httpOptions = {
      headers: headers ? headers : new HttpHeaders(),
      params: new HttpParams()
    };
    if(request)
    {
     request = DataHelper.getTrimData(request);
    }
    return this.http.post<R>(environment.baseurl + url, request, httpOptions);

  }

  validateToken<T, R>(url: string, request: T, headers?:any): Observable<R> {
    let offset:any = new Date().getTimezoneOffset();
    offset = `${offset * (-1)}`;
    let token:any = sessionStorage.getItem("msal.idtoken");
    headers =  new HttpHeaders({
      ClientTZOffSet:  offset,
      Token: token
    }); 
    let httpOptions = {
      headers: headers ? headers : new HttpHeaders(),
      params: new HttpParams()
    };
    if(request)
    {
     request = DataHelper.getTrimData(request);
    }
    return this.http.post<R>(environment.baseurl + url, request, httpOptions);

  }

  upload<T, R>(url, data): Observable<R> {
    const uploadURL = environment.baseurl + url;
    
    /*This code can be workout in next branch */
    // if(data)
    // {
    //   for (const pair of data.entries()) {
    //     data.entries[pair] = DataHelper.getTrimData(pair);
    //     console.log(data.entries[pair]);
    // }
   //  }
   let offset:any = new Date().getTimezoneOffset();
   offset = `${offset * (-1)}`;
    let headers =  new HttpHeaders({
     ClientTZOffSet:  offset
   }); 

    return this.http.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events',
      headers: headers ? headers : new HttpHeaders(),
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        
          case HttpEventType.Sent:
          console.log(event);
          break
        break;
        
        default:
         console.log( `Unhandled event: ${event.type}`);
      }
    })
    );
  }


  download(url: string, queryParams?: any) : Observable<any>{
    return this.http.get(environment.baseurl + url + '?reqparams=' + JSON.stringify(queryParams), {
      headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
         
        }),
       responseType: 'blob'
    });
  }

  exportFile(url: string, request?: any,headers?:any) : Observable<any>{

    return this.http.post(environment.baseurl + url, request, {observe: 'body', responseType: 'blob'});
  }

  
  downloadTextFile(url: string, queryParams?: any) : Observable<any>{
    return this.http.get(environment.baseurl + url + '?reqparams=' + JSON.stringify(queryParams), {
      headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
         
        }),
       responseType: 'text'
    });
  }

  downloadZipFile(url: string, queryParams?: any) {
    return this.http.get(environment.baseurl + url + '?reqparams=' + JSON.stringify(queryParams), {
      responseType: 'arraybuffer'
    });
  }


}
