import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {Globals} from './globals';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule {
}
