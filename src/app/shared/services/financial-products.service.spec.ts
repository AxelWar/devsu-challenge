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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      providers: [FinancialProductsService],
    });
    service = TestBed.inject(FinancialProductsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('createFinancialProduct', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const financialProductStub: FinancialProduct = <FinancialProduct>{};
      service.createFinancialProduct(financialProductStub).subscribe(res => {
        expect(res).toEqual(financialProductStub);
      });
      const req = httpTestingController.expectOne(
        'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
      );
      expect(req.request.method).toEqual('POST');
      req.flush(financialProductStub);
      httpTestingController.verify();
    });
  });

  describe('updateFinancialProduct', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const financialProductStub: FinancialProduct = <FinancialProduct>{};
      service.updateFinancialProduct(financialProductStub).subscribe(res => {
        expect(res).toEqual(financialProductStub);
      });
      const req = httpTestingController.expectOne(
        'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
      );
      expect(req.request.method).toEqual('PUT');
      req.flush(financialProductStub);
      httpTestingController.verify();
    });
  });

  describe('getFinancialProducts', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getFinancialProducts().subscribe(res => {
        expect(res).toEqual([]);
      });
      const req = httpTestingController.expectOne(
        'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
      );
      expect(req.request.method).toEqual('GET');
      req.flush([]);
      httpTestingController.verify();
    });
  });

  it('verifyFinancialProduct should make GET request with correct URL and params', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const testAuthorId = '1';
    const testProductId = 'tarj-001';
    const expectedUrl = `${environment.apiUrl}/bp/products/verification`;

    // Call the service function
    service.verifyFinancialProduct(testProductId).subscribe();

    // Match the request based on URL and parameters
    const reqs = httpTestingController.match(
      request =>
        request.url === expectedUrl &&
        request.params.get('authorId') === testAuthorId &&
        request.params.get('id') === testProductId
    );

    // Expect that one request was matched
    expect(reqs.length).toEqual(1);

    // Expect that the matched request is a GET request
    const req = reqs[0];
    expect(req.request.method).toEqual('GET');

    // Flush the request (simulate the response)
    req.flush({
      /* Simulated response body */
    });

    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });

  it('setCurrentProduct test', done => {
    const spy = jest.spyOn(service['currentProductSubject'], 'next');

    // Subscribe to the subject to assert its emitted values
    service.currentProductSubject.subscribe(product => {
      expect(product).toEqual(mockProduct);

      // If you used a spy, you can also assert that 'next' was called with the correct parameter
      if (spy) {
        expect(spy).toHaveBeenCalledWith(mockProduct);
      }

      done(); // Complete the test when the assertion is done
    });

    // Call the method under test
    service.setCurrentProduct(mockProduct);
  });

  it('getCurrentProduct test', () => {
    service['currentProductSubject'].next(mockProduct);

    expect(service.getCurrentProduct()).toEqual(mockProduct);
  });
});
