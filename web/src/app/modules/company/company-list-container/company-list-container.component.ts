import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PopupModel } from 'src/app/models/common/popup-model';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { EventActionService } from 'src/app/services/common/event-action.service';
import { SessionStorageService } from 'src/app/services/common/session-storage.service';
import { ComponentBuilderService } from 'src/app/services/component-builder/component-builder.service';
import { WidgetBase } from '../../widget-utility/widget-base';

@Component({
  selector: 'app-company-list-container',
  templateUrl: './company-list-container.component.html',
  styleUrls: ['./company-list-container.component.css']
})
export class CompanyListContainerComponent extends WidgetBase implements OnInit, AfterViewInit, OnDestroy {
  id: any;
  instance: any;
  popupHolderInstance: any;
  pageInstance: any;
  collapse:boolean;
  expand_collapse_flag:boolean;
  infoModel: PopupModel;

  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _sessionStorageService: SessionStorageService,
    private _componentBuilderService: ComponentBuilderService,
    private _eventActionService: EventActionService,
    private _router: Router,
    private route: ActivatedRoute) {
     super(_serverApi, _componentBuilderService, _eventActionService,_sessionStorageService,_router)

    this.pageReq = { page: 'company-list' };
    this.pageprop = Object();
    this.instance = this;
    this.pageInstance = this;
    this.popupHolderInstance = this;
    this.infoModel = new PopupModel();
  }

  ngOnInit(): void {
    this.expand_collapse_flag=false;
  }
  
  ExpandCollapse()
  {
    this.expand_collapse_flag = !this.expand_collapse_flag;
  }

  ngAfterViewInit(): void {
    super.initBase();
  }

  ngOnDestroy(): void {
    super.removeListeners();
  }

}

