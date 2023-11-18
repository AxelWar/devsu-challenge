import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRegisterComponent {}
