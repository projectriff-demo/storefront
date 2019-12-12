import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/auth.guard';
import {environment} from '../environments/environment';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: HomeComponent},
      {path: 'checkout', component: CheckoutComponent}]
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: environment.enableRouteTracing})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
