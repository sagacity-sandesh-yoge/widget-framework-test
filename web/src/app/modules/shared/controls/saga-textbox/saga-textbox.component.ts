import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-saga-textbox',
  templateUrl: './saga-textbox.component.html',
  styleUrls: ['./saga-textbox.component.css']
})
export class SagaTextboxComponent implements OnInit {
  @Input() formControlName: any;
  @Input() labelName: any;
  constructor() { }

  ngOnInit(): void {
  }

}
