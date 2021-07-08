import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopupModel } from 'src/app/models/common/popup-model';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { EventActionService } from 'src/app/services/common/event-action.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { SessionStorageService } from 'src/app/services/common/session-storage.service';
import { ComponentBuilderService } from 'src/app/services/component-builder/component-builder.service';
import { WidgetBase } from '../../widget-utility/widget-base';

@Component({
  selector: 'app-forgot-password-container',
  templateUrl: './forgot-password-container.component.html',
  styleUrls: ['./forgot-password-container.component.css']
})
export class ForgotPasswordContainerComponent extends WidgetBase implements OnInit, AfterViewInit, OnDestroy {

  uid: any;
  instance: any;
  popupHolderInstance: any;
  pageInstance: any;
  display: boolean;
  collapse: boolean;
  errorMessage: any;
  popupModel: PopupModel;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _sessionStorageService: SessionStorageService,
    private _componentBuilderService: ComponentBuilderService,
    private _eventActionService: EventActionService,
    private _router: Router,
    private route: ActivatedRoute,
    private _spinner: NgxSpinnerService,
    private _notificationService: NotificationService
  ) {
    super(
      _serverApi,
      _componentBuilderService,
      _eventActionService,
      _sessionStorageService,
      _router,
      _spinner
    );
    this.pageReq = { page: "forgot-pass-page" };
    this.pageprop = Object();
    this.instance = this;
    this.pageInstance = this;
    this.popupHolderInstance = this;
    this.popupModel = new PopupModel();
    this.pageDataApiUrl = "/v1/registration/getpagedata";
    this.pageSubmitDataApiUrl = "/v1/registration/getpagesubmitdata";
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    super.initBase();
  }

  ngOnDestroy(): void {
    super.removeListeners();
  }

}
