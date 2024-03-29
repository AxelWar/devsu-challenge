import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { mockProducts } from 'src/app/shared/mocks/financial-product.mock';
import { FinancialProductsServiceStub } from 'src/app/shared/mocks/financial-products.mock.service';
import { FinancialProductsService } from '../../../shared/services/financial-products.service';
import { SharedModule } from '../../../shared/shared.module';
import { ProductsHomeComponent } from './products-home.component';
import { DialogService } from 'src/app/shared/services/dialog.service';

describe('ProductsHomeComponent', () => {
  let component: ProductsHomeComponent;
  let fixture: ComponentFixture<ProductsHomeComponent>;
  let financialProductsService: FinancialProductsService;
  let httpMock: HttpTestingController;
  let dialogService: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsHomeComponent],
      imports: [
        SharedModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        DialogService,
        {
          provide: FinancialProductsService,
          useClass: FinancialProductsServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsHomeComponent);
    component = fixture.componentInstance;
    financialProductsService = TestBed.inject(FinancialProductsService);
    dialogService = TestBed.inject(DialogService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('Should get products', () => {
    jest
      .spyOn(financialProductsService, 'getFinancialProducts')
      .mockReturnValue(of(mockProducts));

    component.ngOnInit();

    expect(component.financialProducts).toEqual(mockProducts);
    expect(component.filteredProducts).toEqual(mockProducts);
    expect(component.loading).toEqual(false);
  });

  it('should handle error on fetchFinancialProducts', () => {
    // Arrange: set up the service to return an error when getFinancialProducts is called
    const errorResponse = new Error(
      'An error occurred; please try again later.'
    );
    jest
      .spyOn(financialProductsService, 'getFinancialProducts')
      .mockReturnValue(throwError(() => errorResponse));

    // Act: call the method
    component.fetchFinancialProducts();

    // Assert: verify that the method handled the error correctly
    expect(component.loading).toBeFalsy();
    expect(component.error).toBeTruthy();
  });

  it('Should change page', () => {
    jest
      .spyOn(financialProductsService, 'getFinancialProducts')
      .mockReturnValue(of(mockProducts));

    component.ngOnInit();
    component.onPageChanged({ page: 2, size: 5 });

    expect(component.currentPage).toBe(2);
  });

  it('Should change page', () => {
    jest
      .spyOn(financialProductsService, 'getFinancialProducts')
      .mockReturnValue(of(mockProducts));

    component.ngOnInit();
    component.onPageSizeChange(10);

    // mockProducts haves a total of 6 products,
    // giving a total of 2 pages with a setting of 5 items per page
    // changing it to 10 it woll change totalPages to 1
    expect(component.totalPages).toBe(1);
  });

  it('Should filter on search change', () => {
    jest
      .spyOn(financialProductsService, 'getFinancialProducts')
      .mockReturnValue(of(mockProducts));

    component.ngOnInit();
    component.onSearchChange('tarj-003');

    expect(component.searchQuery).toEqual('tarj-003');
    expect(component.currentPage).toEqual(1);
    expect(component.filteredProducts[0].name).toBe('tarj-003');
    expect(component.totalPages).toBe(1);
  });

  it('should delete a financial product', () => {
    const productId = 'Pichincha';
    jest
      .spyOn(financialProductsService, 'deleteFinancialProduct')
      .mockReturnValue(of('Deleted'));
    jest.spyOn(dialogService, 'open').mockResolvedValue(true);

    component.deleteProduct(productId);

    financialProductsService
      .deleteFinancialProduct(productId)
      .subscribe((data: string) => {
        expect(data).toBe(`${productId} Deleted Successfully`);
      });
  });

  it('should trigger click function when the anchor tag inside the dropdown is clicked for edit option', () => {
    const dropdownToggle = fixture.debugElement.query(
      By.css('.dropdown-toggle')
    );
    dropdownToggle.nativeElement.click();
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(
      By.css('a#edit-item')
    ).nativeElement;
    const clickSpy = jest.spyOn(component, 'navigateToEditProduct');

    anchor.click();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should trigger click function when the anchor tag inside the dropdown is clicked for delete option', () => {
    const dropdownToggle = fixture.debugElement.query(
      By.css('.dropdown-toggle')
    );
    dropdownToggle.nativeElement.click();
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(
      By.css('a#delete-item')
    ).nativeElement;
    const clickSpy = jest.spyOn(component, 'deleteProduct');

    anchor.click();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should navigate to add new product when button is clicked', () => {
    const button = fixture.debugElement.query(
      By.css('button#add-button')
    ).nativeElement;
    const clickSpy = jest.spyOn(component, 'navigateToAddProduct');

    button.click();

    expect(clickSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
