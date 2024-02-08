import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { mockProduct } from './financial-product.mock';
import { FinancialProductsServiceStub } from './financial-products.mock.service';

describe('FinancialProductsServiceStub', () => {
  let service: FinancialProductsServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [FinancialProductsServiceStub],
    });

    service = TestBed.inject(FinancialProductsServiceStub);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('verifyFinancialProduct should return obs true', () => {
    jest.spyOn(service, 'verifyFinancialProduct').mockReturnValue(of(false));
    service.verifyFinancialProduct('tarj-001').subscribe(data => {
      expect(data).toBe(of(false));
    });
  });

  it('verifyFinancialProduct should return obs true', () => {
    service.verifyFinancialProduct('').subscribe(data => {
      expect(data).toBe(of(true));
    });
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

  it('should return success message when deleting a product', done => {
    const productId = '123';
    const expectedMessage = `${productId} Deleted Successfully`;

    // Call the deleteFinancialProduct method
    service.deleteFinancialProduct(productId).subscribe({
      next: message => {
        expect(message).toEqual(expectedMessage);
        done();
      },
      error: () => {
        // Fail the test if an error occurs
        done.fail('Should not have failed!');
      },
    });
  });
});
