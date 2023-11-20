import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FinancialProduct } from '../interfaces/financial-product.interface';
import { FinancialProductsService } from './financial-products.service';
import { SharedModule } from '../shared.module';

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
      const financialProductStub: FinancialProduct = <any>{};
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
      const financialProductStub: FinancialProduct = <any>{};
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
});
