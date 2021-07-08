import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { WidgetAppModule } from "../widget-app/widget-app.module";
import { WidgetsModule } from "../widgets/widgets.module";
import { SharedAppModule } from "../shared/shared.module";
import { CompanyListContainerComponent } from "./company-list-container/company-list-container.component";
import { CompanyRoutingModule } from "./company-routing.module";
import { CompanyAddContainerComponent } from "./company-add-container/company-add-container.component";
import { DialogModule } from "primeng/dialog";
import { CompanyFilterComponent } from "../widget-app/company/company-filter/company-filter.component";
import { MatRadioModule } from "@angular/material/radio/radio-module";

@NgModule({
  declarations: [CompanyListContainerComponent, CompanyAddContainerComponent, CompanyFilterComponent],
  imports: [
    CompanyRoutingModule,
    CommonModule,
    DialogModule,
    FormsModule,
    SharedAppModule,
    WidgetsModule,
    MatCardModule,
    MatRadioModule,
    WidgetAppModule
  ],
})
export class CompanyModule {}
