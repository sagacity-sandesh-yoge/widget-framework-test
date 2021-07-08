import {
  Injectable,
  ComponentFactoryResolver,
  ComponentRef,
} from "@angular/core";
import { WIDGET_LIBRARY } from "src/app/app-constants";
import { PlaceHolderComponent } from "src/app/modules/shared/place-holder/place-holder.component";
import { CompanyFilterComponent } from "src/app/modules/widget-app/company/company-filter/company-filter.component";
import {
  CompanyFilterDataModel,
  CompanyFilterConfigModel,
} from "src/app/modules/widget-app/company/company-filter/company-filter.model";
import { CompanyFormComponent } from "src/app/modules/widget-app/company/company-form/company-form.component";
import {
  CompanyFormDataModel,
  CompanyFormConfigModel,
} from "src/app/modules/widget-app/company/company-form/company-form.model";
import {
  CompanyListBtnA1DataModel,
  CompanyListBtnA1ConfigModel,
} from "src/app/modules/widget-app/company/company-list-btn-a1/company-list-btn-a1-model";
import { CompanyListBtnA1Component } from "src/app/modules/widget-app/company/company-list-btn-a1/company-list-btn-a1.component";
import {
  MoreInfoFormDataModel,
  MoreInfoFormConfigModel,
} from "src/app/modules/widget-app/more-info-link-data/more-info-link-data-model";
import { MoreInfoLinkDataComponent } from "src/app/modules/widget-app/more-info-link-data/more-info-link-data.component";
import { AccordionA1Component } from "src/app/modules/widgets/accordion-a1/accordion-a1.component";
import {
  AccordionA1Model,
  AccordionA1ConfigModel,
} from "src/app/modules/widgets/accordion-a1/accordion.model";
import {
  AreaChartA1Model,
  AreaChartA1ConfigModel,
} from "src/app/modules/widgets/areachart/area-chart-a1/area-chart-a1-model";
import { AreaChartA1Component } from "src/app/modules/widgets/areachart/area-chart-a1/area-chart-a1.component";
import {
  BarChartA4Model,
  BarChartA4ConfigModel,
} from "src/app/modules/widgets/barchart/bar-chart-a4/bar-chart-a4-model";
import { BarChartA4Component } from "src/app/modules/widgets/barchart/bar-chart-a4/bar-chart-a4.component";
import {
  BarChartA5Model,
  BarChartA5ConfigModel,
} from "src/app/modules/widgets/barchart/bar-chart-a5/bar-chart-a5-model";
import { BarChartA5Component } from "src/app/modules/widgets/barchart/bar-chart-a5/bar-chart-a5.component";
import {
  StackedBarChartA1Model,
  StackedBarChartA1ConfigModel,
} from "src/app/modules/widgets/barchart/stacked-bar-chart-a1/stacked-bar-chart-a1-model";
import { StackedBarChartA1Component } from "src/app/modules/widgets/barchart/stacked-bar-chart-a1/stacked-bar-chart-a1.component";
import { CkEditorComponent } from "src/app/modules/widgets/ck-editor/ck-editor.component";
import {
  BarLineComboChartA1A1Model,
  BarLineComboChartA1ConfigModel,
} from "src/app/modules/widgets/comboChart/bar-line-combo-chart-a1/bar-line-combo-chart-a1-model";
import { BarLineComboChartA1Component } from "src/app/modules/widgets/comboChart/bar-line-combo-chart-a1/bar-line-combo-chart-a1.component";
import { DynamicTableComponent } from "src/app/modules/widgets/data-input/dynamic-table/dynamic-table.component";
import {
  DynamicTableDataModel,
  DynamicTableDataConfigModel,
} from "src/app/modules/widgets/data-input/dynamic-table/dynamic-table.model";
import {
  MatBDataA1Model,
  MatBDataA1ConfigModel,
} from "src/app/modules/widgets/data-input/mat-bil-a1/mat-b-a1/mat-b-a1-model";
import { MatBA1Component } from "src/app/modules/widgets/data-input/mat-bil-a1/mat-b-a1/mat-b-a1.component";
import {
  TableA2Model,
  TableA2ConfigModel,
} from "src/app/modules/widgets/data-input/table-a1/table-a2-model";
import { TableA2Component } from "src/app/modules/widgets/data-input/table-a1/table-a2.component";
import { DocumentViewerComponent } from "src/app/modules/widgets/document-viewer/document-viewer.component";
import {
  DocumentViewerDataModel,
  DocumentViewerConfigModel,
} from "src/app/modules/widgets/document-viewer/document-viewer.model";
import {
  DragdropModel,
  DragdropConfigModel,
} from "src/app/modules/widgets/drag-drop/dragdrop-model";
import { DragdropComponent } from "src/app/modules/widgets/drag-drop/dragdrop.component";
import {
  DynamicFilterDataModel,
  DynamicFilterConfigModel,
} from "src/app/modules/widgets/dynamic-filter/dynamic-filter-model";
import { DynamicFilterComponent } from "src/app/modules/widgets/dynamic-filter/dynamic-filter.component";
import {
  FileUploadModel,
  FileUploadConfigModel,
} from "src/app/modules/widgets/file-upload/file-upload-model";
import { FileUploadComponent } from "src/app/modules/widgets/file-upload/file-upload.component";
import {
  HorizontalStepperModel,
  HorizontalStepperConfigModel,
} from "src/app/modules/widgets/horizontal-stepper/horizontal-stepper-model";
import { HorizontalStepperComponent } from "src/app/modules/widgets/horizontal-stepper/horizontal-stepper.component";
import {
  LineChartA2Model,
  LineChartA2ConfigModel,
} from "src/app/modules/widgets/linechart/line-chart-a2/line-chart-a2-model";
import { LineChartA2Component } from "src/app/modules/widgets/linechart/line-chart-a2/line-chart-a2.component";
import {
  PieChartA2Model,
  PieChartA2ConfigModel,
} from "src/app/modules/widgets/piechart/pie-chart-a2/pie-chart-a2-model";
import { PieChartA2Component } from "src/app/modules/widgets/piechart/pie-chart-a2/pie-chart-a2.component";
import {
  PieChartA3Model,
  PieChartA3ConfigModel,
} from "src/app/modules/widgets/piechart/pie-chart-a3/pie-chart-a3-model";
import { PieChartA3Component } from "src/app/modules/widgets/piechart/pie-chart-a3/pie-chart-a3.component";
import {
  PieGridA1Model,
  PieGridA1ConfigModel,
} from "src/app/modules/widgets/piegrid/pie-grid-a1/pie-grid-a1-model";
import { PieGridA1Component } from "src/app/modules/widgets/piegrid/pie-grid-a1/pie-grid-a1.component";
import {
  ProgressA1Model,
  ProgressA1ConfigModel,
} from "src/app/modules/widgets/progressbar/progress-bar-a1/progress-a1-model";
import { ProgressBarA1Component } from "src/app/modules/widgets/progressbar/progress-bar-a1/progress-bar-a1.component";
import {
  ProgressA2Model,
  ProgressA2ConfigModel,
} from "src/app/modules/widgets/progressbar/progress-bar-a2/progress-bar-a2-model";
import { ProgressBarA2Component } from "src/app/modules/widgets/progressbar/progress-bar-a2/progress-bar-a2.component";
import {
  StatReportA1Model,
  StatReportA1ConfigModel,
} from "src/app/modules/widgets/statreport/stat-report-a1/stat-report-a1-model";
import { StatReportA1Component } from "src/app/modules/widgets/statreport/stat-report-a1/stat-report-a1.component";
import {
  StepperA1Model,
  StepperA1ConfigModel,
} from "src/app/modules/widgets/stepper/stepper-a1/stepper-a1-model";
import { StepperA1Component } from "src/app/modules/widgets/stepper/stepper-a1/stepper-a1.component";
import {
  VerticalMenuDataModel,
  VerticalMenuConfigModel,
} from "src/app/modules/widgets/vertical-menu/vertical-menu-model";
import { VerticalMenuComponent } from "src/app/modules/widgets/vertical-menu/vertical-menu.component";

@Injectable({
  providedIn: "root",
})
export class ComponentBuilderService {
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

  CreateComponet(componetName: string, holderRef: PlaceHolderComponent) {
    let componentFactory;
    let componentRef: ComponentRef<any>;
    let isSuccess: boolean = false;

    let viewContainerRef = holderRef.viewContainerRef;

    viewContainerRef.clear();

    switch (componetName) {
      case WIDGET_LIBRARY.CONST_BAR_CHART_A4_NAME:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            BarChartA4Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = BarChartA4Model.getInstance();
        componentRef.instance.configModel = BarChartA4ConfigModel.getInstance();
        isSuccess = true;
        break;
      case WIDGET_LIBRARY.CONST_PIE_CHART_A2_NAME:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            PieChartA2Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = PieChartA2Model.getInstance();
        componentRef.instance.configModel = PieChartA2ConfigModel.getInstance();
        isSuccess = true;
        break;
      case WIDGET_LIBRARY.CONST_PIE_CHART_A3_NAME:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            PieChartA3Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = PieChartA3Model.getInstance();
        componentRef.instance.configModel = PieChartA3ConfigModel.getInstance();
        isSuccess = true;
        break;
      case WIDGET_LIBRARY.CONST_LINE_CHART_A2_NAME:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            LineChartA2Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = LineChartA2Model.getInstance();
        componentRef.instance.configModel =
          LineChartA2ConfigModel.getInstance();
        isSuccess = true;
        break;
      case WIDGET_LIBRARY.CONST_PROGRESS_BAR_A2_NAME:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            ProgressBarA2Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = ProgressA2Model.getInstance();
        componentRef.instance.configModel = ProgressA2ConfigModel.getInstance();
        isSuccess = true;
        break;
      case WIDGET_LIBRARY.CONST_BAR_LINE_COMBO_CHART_A1_NAME:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            BarLineComboChartA1Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel =
          BarLineComboChartA1A1Model.getInstance();
        componentRef.instance.configModel =
          BarLineComboChartA1ConfigModel.getInstance();
        isSuccess = true;
        break;
      case WIDGET_LIBRARY.CONST_PIE_GRID_A1_NAME:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            PieGridA1Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = PieGridA1Model.getInstance();
        componentRef.instance.configModel = PieGridA1ConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.CONST_PROGRESS_BAR_A1_NAME:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            ProgressBarA1Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = ProgressA1Model.getInstance();
        componentRef.instance.configModel = ProgressA1ConfigModel.getInstance();
        isSuccess = true;
        break;
      case WIDGET_LIBRARY.CONST_AREA_CHART_A1_NAME:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            AreaChartA1Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = AreaChartA1Model.getInstance();
        componentRef.instance.configModel =
          AreaChartA1ConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.CONST_STEPPER_A1_NAME:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            StepperA1Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = StepperA1Model.getInstance();
        componentRef.instance.configModel = StepperA1ConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.CONST_STAT_REPORT_A1_NAME:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            StatReportA1Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = StatReportA1Model.getInstance();
        componentRef.instance.configModel =
          StatReportA1ConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.CONST_Mat_B_A1:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            MatBA1Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = MatBDataA1Model.getInstance();
        componentRef.instance.configModel = MatBDataA1ConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.CONST_FILE_UPLOAD:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            FileUploadComponent
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = FileUploadModel.getInstance();
        componentRef.instance.configModel = FileUploadConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.CONST_DRAG_DROP:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            DragdropComponent
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = DragdropModel.getInstance();
        componentRef.instance.configModel = DragdropConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.CONST_HORIZONTAL_STEPPER:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            HorizontalStepperComponent
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = HorizontalStepperModel.getInstance();
        componentRef.instance.configModel =
          HorizontalStepperConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.CONST_VERTICAL_MENU:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            VerticalMenuComponent
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = VerticalMenuDataModel.getInstance();
        componentRef.instance.configModel =
          VerticalMenuConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.CONST_TABLE_A2:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            TableA2Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = TableA2Model.getInstance();
        componentRef.instance.configModel = TableA2ConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.CONST_COMPANY_FILTER:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            CompanyFilterComponent
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = CompanyFilterDataModel.getInstance();
        componentRef.instance.configModel =
          CompanyFilterConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.MORE_INFO_LINK_FORM:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            MoreInfoLinkDataComponent
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = MoreInfoFormDataModel.getInstance();
        componentRef.instance.configModel =
          MoreInfoFormConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.CONST_BAR_CHART_A5_NAME:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            BarChartA5Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = BarChartA5Model.getInstance();
        componentRef.instance.configModel = BarChartA5ConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.CONST_ACCORDION_A1:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            AccordionA1Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = AccordionA1Model.getInstance();
        componentRef.instance.configModel =
          AccordionA1ConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.STACKED_BAR_CHART_A1:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            StackedBarChartA1Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = StackedBarChartA1Model.getInstance();
        componentRef.instance.configModel =
          StackedBarChartA1ConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.DYNAMIC_TABLE:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            DynamicTableComponent
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = DynamicTableDataModel.getInstance();
        componentRef.instance.configModel =
          DynamicTableDataConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.DYNAMIC_FILTER:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            DynamicFilterComponent
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = DynamicFilterDataModel.getInstance();
        componentRef.instance.configModel =
          DynamicFilterConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.DOCUMENT_VIEWER:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            DocumentViewerComponent
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = DocumentViewerDataModel.getInstance();
        componentRef.instance.configModel =
          DocumentViewerConfigModel.getInstance();
        isSuccess = true;
        break;

      case WIDGET_LIBRARY.COMPANY_LIST_BTN_A1:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            CompanyListBtnA1Component
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel =
          CompanyListBtnA1DataModel.getInstance();
        componentRef.instance.configModel =
          CompanyListBtnA1ConfigModel.getInstance();
        isSuccess = true;
        break;
      case WIDGET_LIBRARY.COMPANY_FORM_A1:
        componentFactory =
          this._componentFactoryResolver.resolveComponentFactory(
            CompanyFormComponent
          );
        componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.dataModel = CompanyFormDataModel.getInstance();
        componentRef.instance.configModel =
          CompanyFormConfigModel.getInstance();
        isSuccess = true;
        break;
    }

    return { isSuccess, componentRef };
  }
}
