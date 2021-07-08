import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/common/notification.service';
import { SessionStorageService } from 'src/app/services/common/session-storage.service';
import { StartUpService } from 'src/app/services/common/startup.service';
import { LoginAPIRequest } from 'src/app/models/dto/user-management/login-request';
import { LoginAPIResponse } from 'src/app/models/dto/user-management/login-response';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { customRequiredValidator } from 'src/app/services/common/validation.service';
import { AppRepoService } from 'src/app/services/common/app-repo.service';
import { APP_SETTING } from 'src/app/constants/app-repo.constants';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit, OnDestroy {

  usernameForm: FormGroup;
  isInvalidUser: boolean = false;
  messageSuccess = false;
  // key: string = "6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1";
  @Input() siteKey: string = '6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1';
  @Input() type: 'audio' | 'image' = 'image';
  
  recaptchaResponse: any[];
  private msalLoginSuccess: Subscription;
  private msalLoginFailure: Subscription;


  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _router: Router,
    private _notificationService: NotificationService,
    private _sessionStorageService: SessionStorageService,
    private _formbuilder: FormBuilder,
    private _helperService: AppRepoHelperService,
    private _startupService : StartUpService,
    private _appRepoHelperService: AppRepoHelperService,
    private _msalService: MsalService,
    private _broadcastService: BroadcastService
  ) { }

  ngOnInit() {
    this._sessionStorageService.clearSessionStorage();
    this.msalEventHandler();   
    this.initializeForm();
    $('.carousel').carousel({
      interval: 2000
    })
  }

  initializeForm(): void {

    this.usernameForm = this._formbuilder.group({
      userid: ["", customRequiredValidator]
    });
  }
  resolved(captchaResponse: any[]) {
    this.recaptchaResponse = captchaResponse;
    console.log(this.recaptchaResponse);
  }

  authenticateUser() {
     const userid = this.getUserName();
     this.AuthenticateAndRedirect(userid);
  }

  getUserName(){
    return this.usernameForm.get("userid").value;
  }

  AuthenticateAndRedirect(userid: string) {

    const userdata = new LoginAPIRequest();
    userdata.username = userid;
    userdata.validateusername = true;

    this._serverApi
      .post<any, any>("/v1/login", userdata)
      .subscribe(
        response => {
          this.onLoginSuccess(response);
        },
        error => {
          this.isInvalidUser = true;
          switch (error.code) {
            case ErrorCodes.ERR_INVALID_USER_NAME:
              this._notificationService.error("Invalid User Name");
              break;
            case ErrorCodes.ERR_INVALID_USER_PASSWORD:
              this._notificationService.error("Invalid Password");
              break;
            case ErrorCodes.ERR_DATABASE:
              this._notificationService.error("Server Error");
              break;   
          }
        }
      );
  }


  onKey(event) {
    this.isInvalidUser = false;
  }

  onLoginSuccess(response:any){

    
    if (response.username !== undefined && response.username != null && response.usertypeid != null)
    {
      // this.msalLogin();
      this.isInvalidUser = false;
      let SAMLConfig:any = this._appRepoHelperService.getAppSTByCode(APP_SETTING.USE_SAML);
      let SAMLConfigJSON = SAMLConfig && SAMLConfig.Value ? JSON.parse(SAMLConfig.Value) : null;
      let enableSAML: boolean = false;
      if(SAMLConfigJSON){
        enableSAML = SAMLConfigJSON.enable;
      }
      if(enableSAML && response.isorganizationaluser){
         this.msalLogin(); 
      } else {
        this._router.navigate(['/login',response], { skipLocationChange: true });
      }
      
    }
    else {
        switch (response.ErrorCode) {
          case ErrorCodes.ERR_INVALID_USER_NAME:
            this._notificationService.error("Invalid User Name");
            break;
          case ErrorCodes.ERR_INVALID_USER_PASSWORD:
            this._notificationService.error("Invalid Password");
            break;
          case ErrorCodes.ERR_DATABASE:
            this._notificationService.error("Server Error");
            break;
        }
      }
    }

    msalLogin() {
      const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

      if (isIE) {
          this._msalService.loginRedirect({
            extraScopesToConsent: ["user.read", "openid", "profile"],
            loginHint: this.getUserName()
          });
        } else {
          this._msalService.loginPopup({
            extraScopesToConsent: ["user.read", "openid", "profile"],
            loginHint: this.getUserName()
          });
        }
   }

   msalEventHandler(){
    this.msalLoginFailure = this._broadcastService.subscribe("msal:loginFailure", (payload:any) => {
      this._notificationService.error("Login Failed");
      console.log('msal:loginFailure', payload);
    });
  
    this.msalLoginSuccess = this._broadcastService.subscribe("msal:loginSuccess",(payload:any) => {
      console.log('msal:loginSuccess', payload);
      this._serverApi.validateToken("/v1/validateMSALIdToken", {}).subscribe((response:any)=>{
          if(response && response.useruid){
              this._sessionStorageService.saveCurrentUser(response);
              this._router.navigate(['/admin/dashboard']);
          }else{
            switch (response.ErrorCode) {
              case ErrorCodes.ERR_INVALID_USER_NAME:
                this._notificationService.error("Invalid User Name");
                break;
              case ErrorCodes.ERR_INVALID_USER_PASSWORD:
                this._notificationService.error("Invalid Password");
                break;
              case ErrorCodes.ERR_DATABASE:
                this._notificationService.error("Server Error");
                break;
            }
          }
      });
    });
  }

  ngOnDestroy(){
    if(this.msalLoginSuccess) {
      this.msalLoginSuccess.unsubscribe();
    }
    if(this.msalLoginFailure) {
      this.msalLoginFailure.unsubscribe();
    }
  }
     
}
