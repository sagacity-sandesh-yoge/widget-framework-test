import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WidgetBase } from 'src/app/modules/widget-utility/widget-base';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { EventActionService } from 'src/app/services/common/event-action.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { SessionStorageService } from 'src/app/services/common/session-storage.service';
import { ComponentBuilderService } from 'src/app/services/component-builder/component-builder.service';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.css']
})
export class UserPasswordChangeComponent extends WidgetBase implements OnInit, AfterViewInit, OnDestroy {

  isShow = true;
  height2;
  instance: any;
  popupHolderInstance: any;
  pageInstance: any;

  constructor(private _sessionStorageService: SessionStorageService,
    private _serverApi: ServerApiInterfaceServiceService,
    private _componentBuilderService: ComponentBuilderService,
    private _eventActionService: EventActionService,
    private _spinner: NgxSpinnerService,
    private _notificationService: NotificationService,
    private _router: Router) {
    super(_serverApi, _componentBuilderService, _eventActionService,_sessionStorageService,_router)
   
    this.pageReq = { "page": "user-password-change" }
    this.pageprop = Object(); 
    this.instance = this;
    this.pageInstance = this;
  }
  
  ngOnInit() {

  }

  ngAfterViewInit(): void {
    super.initBase();
  }

  ngOnDestroy(): void {
    super.removeListeners();
  }

}
