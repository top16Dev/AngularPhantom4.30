import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { OrderComponent } from './components/order/order.component';
import { HomeComponent } from './components/home/home.component';
import { ProductService } from './services/product.service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import {DemoMaterialModule} from './material-module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    ThankyouComponent,
    OrderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot(),
    SlickCarouselModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
