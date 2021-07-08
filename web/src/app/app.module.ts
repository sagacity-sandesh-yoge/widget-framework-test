import { DatePipe } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MsalModule } from "@azure/msal-angular";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { AppHttpInterceptorService } from "./app-http-interceptor.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpErrorInterceptorService } from "./http-error-interceptor.service";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { RegistrationLayoutComponent } from "./layout/registration-layout/registration-layout.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { UserPasswordChangeComponent } from "./layout/user-password-change/user-password-change.component";
// import { CompanyModule } from "./modules/company/company-module";
import { ForgotPasswordContainerComponent } from "./modules/forgot-password/forgot-password-container/forgot-password-container.component";
import { SharedAppModule } from "./modules/shared/shared.module";
import { AreaChartA1Component } from "./modules/widgets/areachart/area-chart-a1/area-chart-a1.component";
import { BarChartA4Component } from "./modules/widgets/barchart/bar-chart-a4/bar-chart-a4.component";
import { BarChartA5Component } from "./modules/widgets/barchart/bar-chart-a5/bar-chart-a5.component";
import { BarLineComboChartA1Component } from "./modules/widgets/comboChart/bar-line-combo-chart-a1/bar-line-combo-chart-a1.component";
import { MatBA1Component } from "./modules/widgets/data-input/mat-bil-a1/mat-b-a1/mat-b-a1.component";
import { LineChartA2Component } from "./modules/widgets/linechart/line-chart-a2/line-chart-a2.component";
import { PieChartA2Component } from "./modules/widgets/piechart/pie-chart-a2/pie-chart-a2.component";
import { PieGridA1Component } from "./modules/widgets/piegrid/pie-grid-a1/pie-grid-a1.component";
import { ProgressBarA1Component } from "./modules/widgets/progressbar/progress-bar-a1/progress-bar-a1.component";
import { ProgressBarA2Component } from "./modules/widgets/progressbar/progress-bar-a2/progress-bar-a2.component";
import { StatReportA1Component } from "./modules/widgets/statreport/stat-report-a1/stat-report-a1.component";
import { StepperA1Component } from "./modules/widgets/stepper/stepper-a1/stepper-a1.component";
import { ShortNumberPipe } from "./pipe/shortNumber/short-number.pipe";
import { ServerApiInterfaceServiceService } from "./server-api-interface-service.service";
import { NotificationService } from "./services/common/notification.service";
import { LoginComponent } from "./views/login/login.component";
import { UsernameComponent } from "./views/username/username/username.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CompanyModule } from "./modules/company/company-module";
import { BrowserModule } from "@angular/platform-browser";

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    SidebarComponent,
    RegistrationLayoutComponent,
    UsernameComponent,
    UserPasswordChangeComponent,
    ForgotPasswordContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CompanyModule,
    SharedAppModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), 
    MsalModule.forRoot({
      auth: {
        clientId: environment.uiClienId, // This is your client ID
        authority: 'https://login.microsoftonline.com/' + environment.tenantId, // This is your tenant info
        redirectUri:  environment.redirectUrl, // This is your redirect URI
        postLogoutRedirectUri: environment.redirectUrl 
      }
    },
    {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ],
      extraQueryParameters: {}
    }),

     FlexLayoutModule
  ],
  providers: [
    ServerApiInterfaceServiceService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptorService,
      multi: true
    },
    DatePipe,
    ShortNumberPipe,

  ],
  // entryComponents: [
  //   BarChartA4Component,
  //   BarChartA5Component,
  //   PieChartA2Component,
  //   LineChartA2Component,
  //   ProgressBarA2Component,

  //   BarLineComboChartA1Component,
  //   PieGridA1Component,
  //   AreaChartA1Component,
  //   ProgressBarA1Component,
  //   StepperA1Component,

  //   StatReportA1Component,
  //   MatBA1Component
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
