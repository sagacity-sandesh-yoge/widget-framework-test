import { Directive, DoCheck, ElementRef } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { DataHelper } from 'src/app/Utlity/DataHelper';

@Directive({
  selector: '[matInput]:not([required])'
})
export class RequiredInputDirective implements DoCheck {
  constructor(private input: MatInput) { }

  ngDoCheck() {
      DataHelper.setRequired(this.input);
  }
}