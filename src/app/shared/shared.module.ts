import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { FinancialProductsService } from './services/financial-products.service';
import { TableProductsComponent } from './table-products/table-products.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NavbarComponent,
    SearchProductComponent,
    TableProductsComponent,
  ],
  imports: [CommonModule],
  exports: [
    ConfirmDialogComponent,
    NavbarComponent,
    SearchProductComponent,
    TableProductsComponent,
  ],
  providers: [FinancialProductsService],
})
export class SharedModule {}
