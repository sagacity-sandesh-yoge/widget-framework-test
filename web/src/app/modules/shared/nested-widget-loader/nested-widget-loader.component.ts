import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { EventActionService } from 'src/app/services/common/event-action.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { SessionStorageService } from 'src/app/services/common/session-storage.service';
import { ComponentBuilderService } from 'src/app/services/component-builder/component-builder.service';
import { WidgetBase } from '../../widget-utility/widget-base';

@Component({
  selector: 'app-nested-widget-loader',
  templateUrl: './nested-widget-loader.component.html',
  styleUrls: ['./nested-widget-loader.component.css']
})
export class NestedWidgetLoaderComponent extends WidgetBase
implements OnInit, AfterViewInit, OnDestroy {
id: any;
instance: any;
popupHolderInstance: any;
pageInstance: any;
@Input() pageName:string;

constructor(
  private _serverApi: ServerApiInterfaceServiceService,
  private _notificationService: NotificationService,
  private _sessionStorageService: SessionStorageService,
  private _componentBuilderService: ComponentBuilderService,
  private _eventActionService: EventActionService,
  private _router: Router,
  private route: ActivatedRoute,
  private _spinner: NgxSpinnerService
) {
  super(_serverApi, _componentBuilderService, _eventActionService, _sessionStorageService, _router, _spinner);
  this.pageReq = { page: this.pageName };
  this.pageprop = Object();
  this.instance = this;
  this.pageInstance = this;
  this.popupHolderInstance = this;
}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.pageReq = { page: this.pageName };
    super.initBase();
  }

  ngOnDestroy(): void {
    super.removeListeners();
  }
}