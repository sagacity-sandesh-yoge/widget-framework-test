import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompanyListContainerComponent } from './company-list-container/company-list-container.component';
import { CompanyAddContainerComponent } from './company-add-container/company-add-container.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: CompanyListContainerComponent,
    children: [
      
    ]
  },
  {
    path: "add",
    component: CompanyAddContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
