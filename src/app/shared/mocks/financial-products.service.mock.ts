import { Observable, of, EMPTY } from 'rxjs';
import { FinancialProduct } from '../interfaces/financial-product.interface';

export class FinancialProductsServiceStub {
  currentProduct: FinancialProduct | null = null;

  verifyFinancialProduct(productId: string): Observable<boolean> {
    if (productId.length > 0) {
      return of(false);
    } else {
      return EMPTY;
    }
  }

  createFinancialProduct(
    product: FinancialProduct
  ): Observable<FinancialProduct> {
    return of(product);
  }

  updateFinancialProduct(
    product: FinancialProduct
  ): Observable<FinancialProduct> {
    return of(product);
  }

  getCurrentProduct(): FinancialProduct | null {
    return this.currentProduct;
  }

  setCurrentProduct(product: FinancialProduct | null): void {
    this.currentProduct = product;
  }
}
