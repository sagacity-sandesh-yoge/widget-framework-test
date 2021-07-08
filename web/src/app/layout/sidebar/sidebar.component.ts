import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/services/common/local-storage.service';
import { SessionStorageService } from 'src/app/services/common/session-storage.service';
import { Router } from '@angular/router';
import { WidgetBase } from 'src/app/modules/widget-utility/widget-base';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { ComponentBuilderService } from 'src/app/services/component-builder/component-builder.service';
import { EventActionService } from 'src/app/services/common/event-action.service';
declare var $: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends WidgetBase implements OnInit, AfterViewInit, OnDestroy {

  isShow = true;
  height2;

  pageprop: any;

  constructor(private _sessionStorageService: SessionStorageService,
    private _serverApi: ServerApiInterfaceServiceService,
    private _componentBuilderService: ComponentBuilderService,
    private _eventActionService: EventActionService,
    private _router: Router) {
    super(_serverApi, _componentBuilderService, _eventActionService,_sessionStorageService,_router)
   // alert(this._sessionStorageService.getCurrentUser().username);
      this.pageReq = { "page":"sidebar"}
        //this.pageReq = { "page": "navin" }

    // this.pageReq = { "page": "management" }
    this.pageprop = Object();
  }

  ngOnInit() {

    this.htmlbodyHeightUpdate();
    $(window).resize(() => {
      this.htmlbodyHeightUpdate();
    });
    $(window).scroll(() => {
      this.height2 = $('.main').height()
      this.htmlbodyHeightUpdate();
    });
  }

  ngAfterViewInit(): void {
    super.initBase();
  }

  htmlbodyHeightUpdate() {
    var height3 = $(window).height();
    var height1 = $('.nav').height() + 50;
    this.height2 = $('.main').height();
    if (this.height2 > height3) {
      $('html').height(Math.max(height1, height3, this.height2) + 10);
      $('body').height(Math.max(height1, height3, this.height2) + 10);
    }
    else {
      $('html').height(Math.max(height1, height3, this.height2));
      $('body').height(Math.max(height1, height3, this.height2));
    }

  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  onLogout() {
    this._serverApi.post<any, any>(this.pageDataApiUrl, this.pageReq).subscribe(response => {
    if (this._sessionStorageService.getCurrentUser()) {
      this._sessionStorageService.clearSessionStorage()
    }
    this._router.navigate(['/']);
  })
}


  openlist2(event) {
    // document.getElementById(event.target.id).click();
  }

  ngOnDestroy(): void {
    super.removeListeners();
  }


}
