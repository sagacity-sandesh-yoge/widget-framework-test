import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { LoginAPIRequest } from 'src/app/models/dto/user-management/login-request';
import { LoginAPIResponse } from 'src/app/models/dto/user-management/login-response';
import { NotificationService } from 'src/app/services/common/notification.service';
import { SessionStorageService } from 'src/app/services/common/session-storage.service';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { StartUpService } from 'src/app/services/common/startup.service';
import { HttpHeaders } from '@angular/common/http';
import { customRequiredValidator } from 'src/app/services/common/validation.service';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isInvalidUser: boolean = false;
  messageSuccess = false;
  // key: string = "6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1";
  @Input() siteKey: string = '6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1';
  @Input() type: 'audio' | 'image' = 'image';

  recaptchaResponse: any[];
  data: LoginAPIRequest;


  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _router: Router,
    private _notificationService: NotificationService,
    private _sessionStorageService: SessionStorageService,
    private _formbuilder: FormBuilder,
    private _startupService: StartUpService,
    private route: ActivatedRoute,
    private _appRepoHelperService: AppRepoHelperService) {

    this.data = new LoginAPIRequest();
  }

  ngOnInit() {
    this._sessionStorageService.clearSessionStorage();
    this.route.params.subscribe(params => {
      this.data.username = params.username;
      this.data.usertypeid = params.usertypeid;
    });
    this.initializeForm();
    $('.carousel').carousel({
      interval: 2000
    })
  }

  initializeForm(): void {

    this.loginForm = this._formbuilder.group({
      userpassword: ["", customRequiredValidator]
    });
  }
  resolved(captchaResponse: any[]) {
    this.recaptchaResponse = captchaResponse;
    console.log(this.recaptchaResponse);
  }

  back() {
    this._router.navigate(['/']); 
  }
  authenticateUser() {
    let userpassword = this.loginForm.get("userpassword").value;
    this.AuthenticateAndRedirect(userpassword)
  }

  AuthenticateAndRedirect(userpassword: string) {

    const userdata = new LoginAPIRequest();
    userdata.username = this.data.username;
    userdata.usertypeid = this.data.usertypeid;
    userdata.userpassword = userpassword;
    userdata.validateusername = false;

    let offset:any = new Date().getTimezoneOffset();
    offset = `${offset * (-1)}`;
    let headers: any = new HttpHeaders({
      ClientTZOffSet:  offset
    });

    this._serverApi
      .post<LoginAPIRequest, LoginAPIResponse>("/v1/login", userdata, headers)
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

  onLoginSuccess(response: any) {
    this.isInvalidUser = false;

    if (response.useruid != null && response.useruid != 0) {
      this.isInvalidUser = false;

      this._sessionStorageService.saveCurrentUser(response);

      this._router.navigate(['/admin/company/list']);

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

}
