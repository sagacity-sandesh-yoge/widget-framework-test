import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() collapse: boolean;
  toggleIcon:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
