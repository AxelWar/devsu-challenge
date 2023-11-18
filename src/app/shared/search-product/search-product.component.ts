import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchProductComponent {}
