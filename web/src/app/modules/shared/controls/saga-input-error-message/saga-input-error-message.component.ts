import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-saga-input-error-message',
  templateUrl: './saga-input-error-message.component.html',
  styleUrls: ['./saga-input-error-message.component.css']
})
export class SagaInputErrorMessageComponent implements OnInit {
  @Input() isSubmitted:any;
  @Input() wgFC:any;
  @Input() formControlName:any;
  constructor() { }

  ngOnInit(): void {
  }

}
