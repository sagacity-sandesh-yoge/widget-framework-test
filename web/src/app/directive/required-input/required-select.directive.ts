import { Directive, DoCheck, ElementRef } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { DataHelper } from 'src/app/Utlity/DataHelper';

@Directive({
  selector: 'mat-select:not([required])'
})
export class RequiredSelectDirective implements DoCheck {
  constructor(private input: MatSelect) { }

  ngDoCheck() {
      DataHelper.setRequired(this.input);
  }
}