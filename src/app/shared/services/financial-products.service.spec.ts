import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { FinancialProduct } from '../interfaces/financial-product.interface';
import { mockProduct } from '../mocks/financial-product.mock';
import { SharedModule } from '../shared.module';
import { FinancialProductsService } from './financial-products.service';

describe('FinancialProductsService', () => {
  let service: FinancialProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      providers: [FinancialProductsService],
    });
    service = TestBed.inject(FinancialProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('makes expected calls createFinancialProduct', () => {
    const financialProductStub: FinancialProduct = <FinancialProduct>{};
    service.createFinancialProduct(financialProductStub).subscribe(res => {
      expect(res).toEqual(financialProductStub);
    });
    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/bp/products`
    );
    expect(req.request.method).toEqual('POST');
    req.flush(financialProductStub);
    httpTestingController.verify();
  });

  it('makes expected calls updateFinancialProduct', () => {
    const financialProductStub: FinancialProduct = <FinancialProduct>{};
    service.updateFinancialProduct(financialProductStub).subscribe(res => {
      expect(res).toEqual(financialProductStub);
    });
    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/bp/products`
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(financialProductStub);
    httpTestingController.verify();
  });

  it('makes expected calls getFinancialProducts', () => {
    service.getFinancialProducts().subscribe(res => {
      expect(res).toEqual([]);
    });
    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/bp/products`
    );
    expect(req.request.method).toEqual('GET');
    req.flush([]);
    httpTestingController.verify();
  });

  it('makes DELETE calls', () => {
    const productId = 'productId';
    const response = 'Deleted Successfully';
    const httpTestingController = TestBed.inject(HttpTestingController);
    service.deleteFinancialProduct(productId).subscribe(res => {
      expect(res).toEqual(response);
    });
    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/bp/products?id=${productId}`
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush(response);
    httpTestingController.verify();
  });

  it('verifyFinancialProduct should make GET request with correct URL and params', () => {
    const testAuthorId = '1';
    const testProductId = 'tarj-001';
    const expectedUrl = `${environment.apiUrl}/bp/products/verification`;

    service.verifyFinancialProduct(testProductId).subscribe();

    const reqs = httpTestingController.match(
      request =>
        request.url === expectedUrl &&
        request.params.get('authorId') === testAuthorId &&
        request.params.get('id') === testProductId
    );

    expect(reqs.length).toEqual(1);

    const req = reqs[0];
    expect(req.request.method).toEqual('GET');

    req.flush({
      mockProduct,
    });

    httpTestingController.verify();
  });

  it('setCurrentProduct test', done => {
    const spy = jest.spyOn(service['currentProductSubject'], 'next');

    service.currentProductSubject.subscribe(product => {
      expect(product).toEqual(mockProduct);

      if (spy) {
        expect(spy).toHaveBeenCalledWith(mockProduct);
      }

      done();
    });
    service.setCurrentProduct(mockProduct);
  });

  it('getCurrentProduct test', () => {
    service['currentProductSubject'].next(mockProduct);

    expect(service.getCurrentProduct()).toEqual(mockProduct);
  });

  it('should handle HTTP error safely', () => {
    const errorMessage = 'test 404 error';
    const statusText = 'Not Found';
    const status = 404;

    service.getFinancialProducts().subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: error => {
        expect(error.message).toContain(errorMessage);
      },
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/bp/products`
    );

    req.flush(errorMessage, { status: status, statusText: statusText });
  });
});
