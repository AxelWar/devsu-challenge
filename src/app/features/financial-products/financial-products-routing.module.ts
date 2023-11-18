import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductRegisterComponent } from './product-register/product-register.component';

const routes: Routes = [
  { path: '', component: ProductsHomeComponent },
  { path: 'register', component: ProductRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancialProductsRoutingModule {}
