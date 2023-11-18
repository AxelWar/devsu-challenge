import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FinancialProduct } from '../interfaces/financial-product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FinancialProductsService {
  private apiUrl = `${environment.apiUrl}/bp/products`;

  constructor(private http: HttpClient) {}

  getFinancialProducts(authorId: string): Observable<FinancialProduct[]> {
    const headers = new HttpHeaders().set('authorId', authorId);
    return this.http
      .get<FinancialProduct[]>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError));
  }

  createFinancialProduct(
    product: FinancialProduct,
    authorId: string
  ): Observable<FinancialProduct> {
    const headers = new HttpHeaders().set('authorId', authorId);
    return this.http
      .post<FinancialProduct>(this.apiUrl, product, { headers })
      .pipe(catchError(this.handleError));
  }

  updateFinancialProduct(
    product: FinancialProduct,
    authorId: string
  ): Observable<FinancialProduct> {
    const headers = new HttpHeaders().set('authorId', authorId);
    return this.http
      .put<FinancialProduct>(this.apiUrl, product, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteFinancialProduct(productId: string, authorId: string): Observable<any> {
    const headers = new HttpHeaders().set('authorId', authorId);
    const url = `${this.apiUrl}/${productId}`;
    return this.http
      .delete(url, { headers })
      .pipe(catchError(this.handleError));
  }

  verifyFinancialProduct(
    productId: string,
    authorId: string
  ): Observable<boolean> {
    const headers = new HttpHeaders().set('authorId', authorId);
    const params = new HttpParams().set('id', productId);
    const url = `${this.apiUrl}/verification`;
    return this.http
      .get<boolean>(url, { headers, params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error has occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
