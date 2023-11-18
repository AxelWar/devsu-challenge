import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FinancialProductsModule } from './features/financial-products/financial-products.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FinancialProductsModule,
    SharedModule,
    HttpClientModule,
    RouterTestingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
