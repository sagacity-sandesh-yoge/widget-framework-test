import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarChartA4Component } from './barchart/bar-chart-a4/bar-chart-a4.component';
import { LineChartA2Component } from './linechart/line-chart-a2/line-chart-a2.component';
import { PieChartA2Component } from './piechart/pie-chart-a2/pie-chart-a2.component';
import { ProgressBarA2Component } from './progressbar/progress-bar-a2/progress-bar-a2.component';
import { BarLineComboChartA1Component } from './comboChart/bar-line-combo-chart-a1/bar-line-combo-chart-a1.component'
import { PieGridA1Component } from './piegrid/pie-grid-a1/pie-grid-a1.component';
import { AreaChartA1Component } from './areachart/area-chart-a1/area-chart-a1.component';
import { ProgressBarA1Component } from './progressbar/progress-bar-a1/progress-bar-a1.component';
import { ProgressBarColor } from './progressbar/progress-bar-a1/progress-a1-bar-color';
import { StepperA1Component } from './stepper/stepper-a1/stepper-a1.component';

import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { StatReportA1Component } from './statreport/stat-report-a1/stat-report-a1.component';
import { DialogModule } from 'primeng/dialog';
import { SharedAppModule } from '../shared/shared.module';
import { HorizontalStepperComponent } from './horizontal-stepper/horizontal-stepper.component';
import { VerticalMenuComponent } from './vertical-menu/vertical-menu.component';
import { RouterModule } from '@angular/router';
import { CkEditorComponent } from './ck-editor/ck-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DataCountCardA1Component } from './data-count-card-a1/data-count-card-a1.component';
import { DataCountCardA2Component } from './data-count-card-a2/data-count-card-a2.component';
import { DataCountCardA3Component } from './data-count-card-a3/data-count-card-a3.component';
import { PieChartA3Component } from './piechart/pie-chart-a3/pie-chart-a3.component';
import { BarChartA5Component } from './barchart/bar-chart-a5/bar-chart-a5.component';
import { AccordionA1Component } from './accordion-a1/accordion-a1.component';
import { StackedBarChartA1Component } from './barchart/stacked-bar-chart-a1/stacked-bar-chart-a1.component';
import { DynamicFilterComponent } from './dynamic-filter/dynamic-filter.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { MatBA1Component } from './data-input/mat-bil-a1/mat-b-a1/mat-b-a1.component';
import { DragdropComponent } from './drag-drop/dragdrop.component';
import { DynamicTableComponent } from './data-input/dynamic-table/dynamic-table.component';
import { TableA2Component } from './data-input/table-a1/table-a2.component';
import { DragDropModule } from 'primeng/dragdrop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TransformDateTimePipe } from 'src/app/pipe/transform-date-time/transform-date-time.pipe';
import { TransformDatePipe } from 'src/app/pipe/transform-date/transform-date.pipe';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    BarChartA4Component,
    ProgressBarA2Component,
    PieChartA2Component,
    LineChartA2Component,
    BarLineComboChartA1Component,
    PieGridA1Component,
    StepperA1Component,
    ProgressBarColor,
    AreaChartA1Component,
    ProgressBarA1Component,
    StatReportA1Component,
    HorizontalStepperComponent,
    VerticalMenuComponent,
    CkEditorComponent,
    DataCountCardA1Component,
    DataCountCardA2Component,
    DataCountCardA3Component,
    PieChartA3Component,
    BarChartA5Component,
    AccordionA1Component,
    StackedBarChartA1Component,
    DynamicFilterComponent,
    DocumentViewerComponent,
    MatBA1Component,
    DragdropComponent,
    DynamicTableComponent,
    TableA2Component,
    FileUploadComponent
    // TransformDateTimePipe,
    // TransformDatePipe
  ],
  imports: [
    CommonModule,
    MatCardModule,
    NgxChartsModule,
    MatProgressBarModule,
    MatSelectModule,
    DialogModule,
    RouterModule,
    CKEditorModule,
    SharedAppModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    NgbModule,
    EditorModule
  ],
  exports: [
    BarChartA4Component,
    ProgressBarA2Component,
    PieChartA2Component,
    LineChartA2Component,
    BarLineComboChartA1Component,
    PieGridA1Component,
    AreaChartA1Component,
    ProgressBarA1Component,
    StepperA1Component,
    StatReportA1Component,
    HorizontalStepperComponent,
    DataCountCardA1Component,
    DataCountCardA2Component,
    DataCountCardA3Component,
    BarChartA5Component,
    MatBA1Component,
    DragdropComponent,
    DynamicTableComponent
  ]
})
export class WidgetsModule { }
