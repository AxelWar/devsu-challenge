import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { mockProduct } from './financial-product.mock';
import { FinancialProductsServiceStub } from './financial-products.mock.service';

describe('FinancialProductsServiceStub', () => {
  let service: FinancialProductsServiceStub;
  // Create variables for services
  // Create universal mocks here

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Add any imported components/modules here
      imports: [],
      providers: [FinancialProductsServiceStub],
    });

    service = TestBed.inject(FinancialProductsServiceStub);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('verifyFinancialProduct should...', () => {
    jest.spyOn(service, 'verifyFinancialProduct').mockReturnValue(of(false));
    expect(service.verifyFinancialProduct('tarj-001')).toBeDefined();
  });

  it('createFinancialProduct should...', () => {
    service.setCurrentProduct(mockProduct);
    expect(service.createFinancialProduct(mockProduct)).toBeDefined();
  });

  it('updateFinancialProduct should...', () => {
    service.updateFinancialProduct(mockProduct);
    expect(service.currentProduct).toBe(mockProduct);
  });

  it('getCurrentProduct should...', () => {
    service.setCurrentProduct(mockProduct);
    expect(service.getCurrentProduct()).toBe(mockProduct);
  });

  it('setCurrentProduct should...', () => {
    service.setCurrentProduct(mockProduct);

    expect(service.currentProduct).toBe(mockProduct);
  });
});
