import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableProductsComponent {}
