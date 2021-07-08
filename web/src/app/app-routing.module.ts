import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { ForgotPasswordContainerComponent } from "./modules/forgot-password/forgot-password-container/forgot-password-container.component";
import { ResolverService } from "./services/common/resolver.service";
import { LoginComponent } from "./views/login/login.component";
import { UsernameComponent } from "./views/username/username/username.component";

const routes: Routes = [
  {
    path: "",
    component: UsernameComponent,
    resolve: { products: ResolverService },
  },
  { path: "login", component: LoginComponent },
  { path: "forgotpassword", component: ForgotPasswordContainerComponent },
  {
    path: "admin",
    component: AdminLayoutComponent,
    resolve: { products: ResolverService },
    children: [
      {
        path: "company",
        loadChildren: () => import('../app/modules/company/company-module').then(m => m.CompanyModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
