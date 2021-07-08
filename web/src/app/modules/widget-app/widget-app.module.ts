import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragDropDirective } from "src/app/drag-drop.directive";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EditorModule } from "@tinymce/tinymce-angular";
import { SharedAppModule } from "../shared/shared.module";
import { MoreInfoLinkDataComponent } from "./more-info-link-data/more-info-link-data.component";
import { DataService } from "src/app/services/common/data.service";
import { DragDropModule } from "primeng/dragdrop";
import { CompanyFormComponent } from "./company/company-form/company-form.component";
import { CompanyListBtnA1Component } from "./company/company-list-btn-a1/company-list-btn-a1.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";


@NgModule({
  declarations: [
    DragDropDirective,
    CompanyListBtnA1Component,
    CompanyFormComponent,
    MoreInfoLinkDataComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule,
    DragDropModule,
    NgbModule,
    EditorModule,
    CommonModule,
    NgxChartsModule,
    DialogModule,
    RouterModule,
    SharedAppModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    NgbModule,
    EditorModule
  ],
  exports: [DragDropModule, MoreInfoLinkDataComponent],
  providers: [DataService],
})
export class WidgetAppModule {}
