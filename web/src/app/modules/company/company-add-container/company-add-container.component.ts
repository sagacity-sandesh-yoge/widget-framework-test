import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ServerApiInterfaceServiceService } from "src/app/server-api-interface-service.service";
import { EventActionService } from "src/app/services/common/event-action.service";
import { NotificationService } from "src/app/services/common/notification.service";
import { SaveFileService } from "src/app/services/common/save-file.service";
import { SessionStorageService } from "src/app/services/common/session-storage.service";
import { ComponentBuilderService } from "src/app/services/component-builder/component-builder.service";
import { WidgetBase } from "../../widget-utility/widget-base";
import { FormModeConstant } from "../../widget-utility/widget-constants";

@Component({
  selector: "app-company-add-container",
  templateUrl: "./company-add-container.component.html",
  styleUrls: ["./company-add-container.component.css"],
})
export class CompanyAddContainerComponent
  extends WidgetBase
  implements OnInit, AfterViewInit, OnDestroy
{
  id: any;
  instance: any;
  popupHolderInstance: any;
  pageInstance: any;
  collapse: boolean;
  display: boolean;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _sessionStorageService: SessionStorageService,
    private _componentBuilderService: ComponentBuilderService,
    private _eventActionService: EventActionService,
    private _router: Router,
    private route: ActivatedRoute,
    private _spinner: NgxSpinnerService,
    private _saveFileService: SaveFileService,
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

    this.pageReq = { page: "company-add" };
    this.pageprop = Object();
    this.instance = this;
    this.pageInstance = this;
    this.popupHolderInstance = this;
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
