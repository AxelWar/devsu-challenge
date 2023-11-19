import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductRegisterComponent } from './product-register/product-register.component';
import { ProductsHomeComponent } from './products-home/products-home.component';

const routes: Routes = [
  { path: '', component: ProductsHomeComponent },
  { path: 'product-register', component: ProductRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancialProductsRoutingModule {}
