import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginationControlComponent } from './pagination-control/pagination-control.component';
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NavbarComponent,
    SearchInputComponent,
    PaginationControlComponent,
  ],
  imports: [CommonModule],
  exports: [
    ConfirmDialogComponent,
    NavbarComponent,
    SearchInputComponent,
    PaginationControlComponent,
  ],
})
export class SharedModule {}
