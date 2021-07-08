import { NgModule } from '@angular/core';
import { PlaceHolderComponent } from './place-holder/place-holder.component';
import { FilterComponent } from './filter/filter.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CommonModule } from '@angular/common';
import { RequiredInputDirective } from 'src/app/directive/required-input/required-input.directive';
import { RequiredSelectDirective } from 'src/app/directive/required-input/required-select.directive';
import { OptionalSelectDirective } from 'src/app/directive/optional-select/optional-select.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NestedWidgetLoaderComponent } from './nested-widget-loader/nested-widget-loader.component';
import { SagaTextboxComponent } from './controls/saga-textbox/saga-textbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SagaInputErrorMessageComponent } from './controls/saga-input-error-message/saga-input-error-message.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { TransformDateTimePipe } from 'src/app/pipe/transform-date-time/transform-date-time.pipe';
import { TransformDatePipe } from 'src/app/pipe/transform-date/transform-date.pipe';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    PlaceHolderComponent,
    FilterComponent,
    RequiredInputDirective,
    OptionalSelectDirective,
    RequiredSelectDirective,
    NestedWidgetLoaderComponent,
    SagaTextboxComponent,
    SagaInputErrorMessageComponent,
    TransformDatePipe,
    TransformDateTimePipe
  ],
  imports: [
     MaterialModule,
     CommonModule,
     FlexLayoutModule,
     FormsModule,
     ReactiveFormsModule,
     NgxDocViewerModule,
     DialogModule,
     FileUploadModule
    ],
  exports:[
    MaterialModule,
    PlaceHolderComponent,
    FilterComponent,
    RequiredInputDirective,
    OptionalSelectDirective,
      RequiredSelectDirective,
      FlexLayoutModule,
      NestedWidgetLoaderComponent,
      SagaTextboxComponent,
      SagaInputErrorMessageComponent,
      NgxDocViewerModule,
      TransformDatePipe,
    TransformDateTimePipe,
    FileUploadModule,
    ReactiveFormsModule
  ]
})
export class SharedAppModule { }
