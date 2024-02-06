import { Component, OnDestroy, OnInit } from '@angular/core';
import { FinancialProduct } from '../../../shared/interfaces/financial-product.interface';
import { FinancialProductsService } from '../../../shared/services/financial-products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { emptyFinancialProduct } from '../../../shared/mocks/financial-product.mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss'],
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  financialProducts: FinancialProduct[] = [];
  loading = true;
  error = false;
  errorMessage!: string;
  filteredProducts: FinancialProduct[] = [];
  searchQuery = '';
  itemsPerPage = 5;
  currentPage = 1;
  displayedProducts: FinancialProduct[] = [emptyFinancialProduct];
  totalPages = 1;
  constructor(
    private financialProductsService: FinancialProductsService,
    private router: Router
  ) {}
  ngOnInit() {
    this.fetchFinancialProducts();
  }

  fetchFinancialProducts() {
    this.financialProductsService
      .getFinancialProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (financialProducts: FinancialProduct[]) => {
          this.financialProducts = financialProducts;
          this.filteredProducts = financialProducts;
          this.applyFilter();
          this.loading = false;
        },
        error: (errorService: HttpErrorResponse) => {
          this.loading = false;
          this.error = true;
          this.errorMessage = errorService.error.error.message;
        },
      });
  }

  get totalResults() {
    return this.filteredProducts.length;
  }

  applyFilter() {
    this.filteredProducts = this.searchQuery
      ? this.financialProducts.filter(
          product =>
            product.name.toLowerCase().includes(this.searchQuery) ||
            product.description.toLowerCase().includes(this.searchQuery)
        )
      : [...this.financialProducts];
    this.updatePagination();
  }

  onSearchChange(query: string) {
    this.searchQuery = query.toLowerCase();
    this.currentPage = 1;
    this.applyFilter();
  }

  onPageSizeChange(newSize: number) {
    this.itemsPerPage = newSize;
    this.currentPage = 1;
    this.updatePagination();
  }

  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  onPageChanged(event: { page: number; size: number }) {
    this.currentPage = event.page;
    this.itemsPerPage = event.size;
    this.applyPagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(
      this.filteredProducts.length / this.itemsPerPage
    );
    this.applyPagination();
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  navigateToAddProduct() {
    this.router.navigate(['/financial-products/product-register']);
  }

  navigateToEditProduct(product: FinancialProduct) {
    this.financialProductsService.setCurrentProduct(product);
    this.router.navigate(['/financial-products/product-register']);
  }

  deleteProduct(productId: string) {
    this.financialProductsService.deleteFinancialProduct(productId).subscribe({
      next: () => {
        this.fetchFinancialProducts();
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
