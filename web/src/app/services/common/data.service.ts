import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';  
  
@Injectable()  
export class DataService {  
  
  private selectedRows = new SelectionModel<any>(true, []);

  getSelectedRows() {  
    return this.selectedRows;  
  }  
}  