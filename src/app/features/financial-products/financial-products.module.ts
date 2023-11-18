import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialProductsRoutingModule } from './financial-products-routing.module';
import { ProductRegisterComponent } from './product-register/product-register.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@NgModule({
  declarations: [ProductsHomeComponent, ProductRegisterComponent],
  imports: [
    CommonModule,
    FinancialProductsRoutingModule,
    HttpClientTestingModule,
  ],
  exports: [ProductsHomeComponent, ProductRegisterComponent],
})
export class FinancialProductsModule {}
