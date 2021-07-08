import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _toastnotificationservice: ToastrService) { }
  toasterPosition = { positionClass: 'toast-top-right' }
  
  error(errMsg: string) {
    
    this._toastnotificationservice.error(errMsg,null, this.toasterPosition)
  }
  success(successMsg: string) {
    this._toastnotificationservice.success(successMsg,null, this.toasterPosition);
  }
  info(info:string){
    this._toastnotificationservice.info(info ,null, this.toasterPosition);
  }
  warning(warningMsg:string) {
    this._toastnotificationservice.warning(warningMsg ,null, this.toasterPosition);
  }
}