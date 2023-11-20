import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FinancialProductsService } from '../../../shared/services/financial-products.service';
import { ProductsHomeComponent } from './products-home.component';
import { SharedModule } from '../../../shared/shared.module';

const products = [
  {
    id: '00122',
    name: 'Test Product',
    description: 'Test Description',
    logo: 'Test Logo URL',
    date_release: '2021-01-01',
    date_revision: '2022-01-01',
  },
  {
    id: '00133',
    name: 'Test Product',
    description: 'Test Description',
    logo: 'Test Logo URL',
    date_release: '2021-01-01',
    date_revision: '2022-01-01',
  },
];
describe('ProductsHomeComponent', () => {
  let component: ProductsHomeComponent;
  let fixture: ComponentFixture<ProductsHomeComponent>;
  let mockFinancialProductsService: any;
  let mockRouter: any;
  beforeEach(() => {
    mockFinancialProductsService = {
      getFinancialProducts: jest.fn(),
      setCurrentProduct: jest.fn(),
      /* deleteFinancialProduct: jest.fn(), */
    };
    mockRouter = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [ProductsHomeComponent],
      imports: [SharedModule],
      providers: [
        {
          provide: FinancialProductsService,
          useValue: mockFinancialProductsService,
        },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(ProductsHomeComponent);
    component = fixture.componentInstance;
  });

  it('should fetch financial products on initialization', () => {
    mockFinancialProductsService.getFinancialProducts.mockReturnValue(
      of(products)
    );

    fixture.detectChanges();

    expect(component.financialProducts).toEqual(products);
    expect(component.loading).toBe(false);
  });

  it('should handle errors while fetching financial products', () => {
    mockFinancialProductsService.getFinancialProducts.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    fixture.detectChanges();

    expect(component.error).toBe(true);
  });

  it('should filter products based on search query', () => {
    component.financialProducts = products;
    component.searchQuery = 'test';

    component.applyFilter();
  });

  it('should navigate to the add product page', () => {
    component.navigateToAddProduct();

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/financial-products/product-register',
    ]);
  });

  it('should set the current product and navigate to the edit product page', () => {
    component.navigateToEditProduct(products[0]);

    expect(mockFinancialProductsService.setCurrentProduct).toHaveBeenCalledWith(
      products[0]
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/financial-products/product-register',
    ]);
  });
});
