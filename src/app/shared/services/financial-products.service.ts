import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FinancialProduct } from '../interfaces/financial-product.interface';

@Injectable({
  providedIn: 'root',
})
export class FinancialProductsService {
  private apiUrl = `${environment.apiUrl}/bp/products`;
  private url = `${environment.apiUrl}/bp/products`;
  private authorId = '1';
  private headers = new HttpHeaders().set('authorId', this.authorId);
  currentProductSubject = new BehaviorSubject<FinancialProduct | null>(null);
  constructor(private http: HttpClient) {}

  getCurrentProduct(): FinancialProduct | null {
    return this.currentProductSubject.value;
  }

  setCurrentProduct(product: FinancialProduct | null): void {
    this.currentProductSubject.next(product);
  }

  getFinancialProducts(): Observable<FinancialProduct[]> {
    return this.http
      .get<FinancialProduct[]>(this.url, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  createFinancialProduct(
    product: FinancialProduct
  ): Observable<FinancialProduct> {
    const headers = new HttpHeaders().set('authorId', this.authorId);
    return this.http
      .post<FinancialProduct>(this.apiUrl, product, { headers })
      .pipe(catchError(this.handleError));
  }

  updateFinancialProduct(
    product: FinancialProduct
  ): Observable<FinancialProduct> {
    return this.http
      .put<FinancialProduct>(this.apiUrl, product, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  deleteFinancialProduct(productId: string): Observable<string> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http
      .delete<string>(url, {
        headers: this.headers,
        responseType: 'text' as 'json',
      })
      .pipe(catchError(this.handleError));
  }

  verifyFinancialProduct(productId: string): Observable<boolean> {
    const params = new HttpParams()
      .set('authorId', this.authorId)
      .set('id', productId);
    const url = `${this.apiUrl}/verification`;
    return this.http
      .get<boolean>(url, { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('An error occurred; please try again later.')
    );
  }
}
