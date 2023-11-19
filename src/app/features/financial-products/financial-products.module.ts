import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FinancialProductsRoutingModule } from './financial-products-routing.module';
import { ProductRegisterComponent } from './product-register/product-register.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsHomeComponent, ProductRegisterComponent],
  imports: [
    CommonModule,
    FinancialProductsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FinancialProductsModule {}
