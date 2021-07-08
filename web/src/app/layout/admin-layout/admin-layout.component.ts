import { Component, OnInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/common/session-storage.service';
import { Router } from '@angular/router';
import { WidgetBase } from 'src/app/modules/widget-utility/widget-base';
import { ComponentBuilderService } from 'src/app/services/component-builder/component-builder.service';
import { EventActionService } from 'src/app/services/common/event-action.service';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
import { MsalService } from '@azure/msal-angular';
import { SaveFileService } from 'src/app/services/common/save-file.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { environment } from 'src/environments/environment';
// import { MsalService } from '@azure/msal-angular';
declare var $: any;
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent extends WidgetBase implements OnInit {

  userName;
  lastname: any;
  firstname: string;
  middlename: string;
  nametitle: string;
  constructor(private _sessionStorageService: SessionStorageService,
    private _serverApi: ServerApiInterfaceServiceService,
    private _componentBuilderService: ComponentBuilderService,
    private _eventActionService: EventActionService,
    private _appRepoHelperService: AppRepoHelperService,
    private _notificationService: NotificationService,
    private _saveFileService: SaveFileService,
    private _router: Router,
    private _msalService: MsalService
  ) {
    super(_serverApi, _componentBuilderService, _eventActionService, _sessionStorageService, _router)
  }

  ngOnInit() {
    this.getUserDetails();
    this.hoveractive();
  }
  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    $('.toggleopen').toggleClass('d-none');

  }
  getUserDetails() {
    this.userName = this._sessionStorageService.getCurrentUser().username;
    this.lastname = this._sessionStorageService.getCurrentUser().lastname;
    this.firstname = this._sessionStorageService.getCurrentUser().firstname;
    this.middlename = this._sessionStorageService.getCurrentUser().middlename;
    this.nametitle = this._sessionStorageService.getCurrentUser().nametitle;

  }

  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    $('.toggleopen').toggleClass('d-none');

  }


  hoveractive() {
    // alert("asfa");
    $('nav.sidebar').addClass('hover');
  }


  toggleclick() {
    //  alert("Sdfa");
    $('.navbar-toggler-icon').toggleClass('d-none');
    $('#navbar-close').toggleClass('d-none');
    $('.main').toggleClass('marginl200');
    $('.sidebar').toggleClass('marginl0');



  }

  downloadUserManual()
  {
    let url= 'UM.pdf'
    // let reqData = Object();
    // reqData.data = Object();  
    // reqData.data.nodelist = "/D:/Github/ARAI/cmvrtas/technical/src/web/src/assets/documents/2447060.png";
    // const downloadApiUrl = "/v1/utility/downloadfile";    
    this._saveFileService.downloadDocFile(url);
    // this._serverApi.download(downloadApiUrl,reqData.data).subscribe(
    //   (response) => {
    //     if (response) {
    //       let file = "file";
    //       this._saveFileService.saveFile(reqData.data.nodelist, file);
    //     } else {
    //       this._notificationService.error("Downloading failed");
    //     }
    //   },
    //   (error) => {
    //     // TODO: this code need to move in common place
    //     this._notificationService.error("Downloading failed");
    //   }
    // );
  }

  onLogout() {
    this._serverApi.post<any, any>(this.pageDataApiUrl, this.pageReq).subscribe(response => {
      // TODO: will implement as per requirement
      let currentUser = this._sessionStorageService.getCurrentUser();
      if (currentUser && currentUser.isorganizationaluser && sessionStorage.getItem("msal.idtoken")) {


        this._msalService.logout();
        // if (this._sessionStorageService.getCurrentUser()) {
        //   this._sessionStorageService.clearSessionStorage()
        // }
      } else {
        if (this._sessionStorageService.getCurrentUser()) {
          this._sessionStorageService.clearSessionStorage()
        }
        this._router.navigate(['/']);
      }
      //  this._msalService.logout();
      // if (this._sessionStorageService.getCurrentUser()) {
      //   this._sessionStorageService.clearSessionStorage()
      // }
      // this._router.navigate(['/']);
    })
  }


  showUserProfile() {
    const uid = this._sessionStorageService.getCurrentUser().useruid;
    if (!this.isARAIUser()) {
      this._router.navigate(['/admin/user-management/user/edit', uid]);
    }
    else {
      this._router.navigate(['/admin/user-management/user/view', uid]);
    }

  }

  isProfileMenuShow() {
    return false;
  }

  isARAIUser() {
    return this._sessionStorageService.getCurrentUser()?.isorganizationaluser;
  }

  changePassword() {
    this._router.navigate(['/admin/change-password']);
  }

}
