import { Observable, of } from 'rxjs';
import { FinancialProduct } from '../interfaces/financial-product.interface';
import { mockProduct } from './financial-product.mock';

export class FinancialProductsServiceStub {
  currentProduct: FinancialProduct | null = null;

  verifyFinancialProduct(productId: string): Observable<boolean> {
    if (productId.length > 0) {
      return of(false);
    } else {
      return of(true);
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
    this.currentProduct = product;
    return of(product);
  }

  getCurrentProduct(): FinancialProduct | null {
    return this.currentProduct;
  }

  setCurrentProduct(product: FinancialProduct | null): void {
    this.currentProduct = product;
  }

  deleteFinancialProduct(productId: string): Observable<string> {
    return of(`${productId} Deleted Successfully`);
  }

  getFinancialProducts(): Observable<FinancialProduct[]> {
    return of([mockProduct]);
  }
}
