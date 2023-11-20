import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, Observable, of } from 'rxjs';

import { ProductRegisterComponent } from './product-register.component';
import { FinancialProductsService } from '../../../shared/services/financial-products.service';
import { Router } from '@angular/router';
import { FinancialProduct } from 'src/app/shared/interfaces/financial-product.interface';

class MockFinancialProductsService {
  private currentProduct: FinancialProduct | null = null;

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

describe('ProductRegisterComponent', () => {
  let component: ProductRegisterComponent;
  let fixture: ComponentFixture<ProductRegisterComponent>;
  let financialProductsService: FinancialProductsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [ProductRegisterComponent],
      providers: [
        {
          provide: FinancialProductsService,
          useClass: MockFinancialProductsService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRegisterComponent);
    component = fixture.componentInstance;
    financialProductsService = TestBed.inject(FinancialProductsService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.productForm).toBeDefined();
    expect(component.productForm.get('name')).toBeDefined();
    expect(component.productForm.get('description')).toBeDefined();
  });

  it('should patch form values when loading current product', () => {
    const mockProduct = {
      id: '001',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'Test Logo URL',
      date_release: '2021-01-01',
      date_revision: '2022-01-01',
    };
    jest
      .spyOn(financialProductsService, 'getCurrentProduct')
      .mockReturnValue(mockProduct);
    component.loadCurrentProduct();
    expect(component.productForm.get('name')?.value).toEqual(mockProduct.name);
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });
});
