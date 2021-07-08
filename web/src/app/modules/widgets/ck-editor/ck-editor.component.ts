import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter } from 'protractor';
import { EVENT_NAME } from 'src/app/constants/db.constants';
import { IWidget } from 'src/app/data';
import { ServerApiInterfaceServiceService } from 'src/app/server-api-interface-service.service';
import { AppRepoHelperService } from 'src/app/services/common/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/common/app-repo.service';
import { ValidationService } from 'src/app/services/common/validation.service';
import { IWidgetSubmit } from '../../widget-utility/iwidget';
import { WidgetComponentBase } from '../../widget-utility/widget-component-base';
import { CKEditorConfigModel, CKEditorDataModel } from './ck-editor-model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {  CKEditor5, CKEditorComponent as CKEditor} from '@ckeditor/ckeditor5-angular';


@Component({
  selector: 'app-ck-editor',
  templateUrl: './ck-editor.component.html',
  styleUrls: ['./ck-editor.component.css']
})
export class CkEditorComponent extends WidgetComponentBase
  implements OnInit, IWidget, IWidgetSubmit {
    
  dataModel: CKEditorDataModel;
  configModel: CKEditorConfigModel;
  clickEvent = EVENT_NAME.ON_ITEM_CLICK;
  html: string;
  public Editor = ClassicEditor;
  FormData: any;
  @ViewChild('editor', { static: true }) ckEditor: CKEditor;
  initValue: any;
  display:any
  updateHtml: any;
  config:CKEditor5.Config;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private router: Router,
    public formBuilder: FormBuilder,
    private _appRepoService: AppRepoService,
    private datepipe: DatePipe,
    private _appRepoHelperService: AppRepoHelperService,
    public _validationService: ValidationService
  ) {
    super(formBuilder, _serverApi, datepipe, _validationService);
    this.dataModel = this.dataModel;
    this.configModel = this.configModel;
  }

  ngOnInit(): void {
    this.wgOnInint();

    this.config = {
      toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
        }
    }
  }
  myCustomSaveContent(element_id, html, body) {
    // Do some custom HTML cleanup
    console.log("myCustomSaveContent");
    html = html.replace(/a/g, "b");

    return html;
  }



  GetValue() {
    return this.FormData;
  }
  Reset() { }
  ngAfterViewInit() {
    // this.tEditor.writeValue(this.initValue)

  }

  handleEvent(e) {
    console.log(e);
  }

  ConvertData(response: any) {

    let decodedHtml = this.toHTML(response.data[0].certificate);
    this.initValue = decodedHtml;
     this.ckEditor.writeValue(decodedHtml)
  }
  setFieldData() { }
  setMode(responseDataModel: any) { }
  SetValue(responseDataModel: any) { }

  toHTML(input): any {
    if (!input) {
      return null;
    }
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
  }

  saveContent(event: any) {
    console.log(event);
    let content = event?.event?.content;
    this.updateHtml = content;
  }

  getContent() {
    return this.updateHtml ? this.updateHtml : this.initValue;
  }

  submit() {

  }
  next() {

  }
  showApprove() {
    this.updateHtml = this.ckEditor.editorInstance.getData();
    this.display = true;
    console.log('this.tEditor', this.ckEditor)
  }
}
