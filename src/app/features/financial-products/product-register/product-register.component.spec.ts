import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { mockProduct } from 'src/app/shared/mocks/financial-product.mock';
import { FinancialProductsService } from 'src/app/shared/services/financial-products.service';
import { ProductRegisterComponent } from './product-register.component';
import { FinancialProductsServiceStub } from 'src/app/shared/mocks/financial-products.mock.service';
import { LocalStorageMock } from 'src/app/shared/mocks/local-storage.mock.service';

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
          useClass: FinancialProductsServiceStub,
        },
      ],
    }).compileComponents();
    window.localStorage = new LocalStorageMock();
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
    jest
      .spyOn(financialProductsService, 'getCurrentProduct')
      .mockReturnValue(mockProduct);
    component.loadCurrentProduct();
    expect(component.productForm.get('name')?.value).toEqual(mockProduct.name);
  });

  it('should reset form to empty when reset button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button.reset-button');
    component.editMode = false;

    button.click();

    expect(button).toBeTruthy(); // Verify that the button is found
    expect(component.productForm.get('name')?.value).toBe(null);
  });

  it('should reset form to original state when reset button is clicked', () => {
    jest
      .spyOn(financialProductsService, 'getCurrentProduct')
      .mockReturnValue(mockProduct);
    component.loadCurrentProduct();
    const button = fixture.nativeElement.querySelector('button.reset-button');
    component.editMode = true;

    button.click();

    expect(button).toBeTruthy(); // Verify that the button is found
    expect(component.productForm.get('name')?.value).toBe(mockProduct.name);
  });

  it('should call createFinancialProduct and navigate on a valid submission for a new product submit', () => {
    component.ngOnInit();
    component.editMode = false;
    component.productForm.controls['id'].setValue('001');
    component.productForm.controls['name'].setValue('Test Product');
    component.productForm.controls['description'].setValue('Test Description');
    component.productForm.controls['logo'].setValue('Test Logo URL');
    component.productForm.controls['date_release'].setValue('2021-01-01');
    component.productForm.controls['date_revision'].setValue('2022-01-01');
    jest
      .spyOn(financialProductsService, 'createFinancialProduct')
      .mockReturnValue(of(mockProduct));
    jest.spyOn(router, 'navigate');

    component.onSubmit();

    expect(component.productForm.valid).toBeTruthy();
    expect(
      financialProductsService.createFinancialProduct
    ).toHaveBeenCalledWith(mockProduct);
    expect(router.navigate).toHaveBeenCalledWith(['/financial-products']);
  });

  it('should call the updateFinancialProduct method and navigate on a valid submission when edit', () => {
    component.editMode = true;
    jest
      .spyOn(financialProductsService, 'getCurrentProduct')
      .mockReturnValue(mockProduct);
    jest
      .spyOn(financialProductsService, 'updateFinancialProduct')
      .mockReturnValue(of(mockProduct));
    jest.spyOn(router, 'navigate');

    component.loadCurrentProduct();
    component.onSubmit();

    expect(component.productForm.valid).toBeTruthy();
    expect(
      financialProductsService.updateFinancialProduct
    ).toHaveBeenCalledWith(mockProduct);
    expect(router.navigate).toHaveBeenCalledWith(['/financial-products']);
  });

  it('should set and get an item correctly', () => {
    localStorage.setItem(
      'productFormData',
      '{"name":"tarj-001","description":"tarj-00001","logo":"https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_1280.jpg","date_release":"2024-02-01","date_revision":"2025-02-01","id":"tarj-001"}'
    );
    component.ngOnInit();

    expect(localStorage.getItem('productFormData')).toBe(
      '{"name":"tarj-001","description":"tarj-00001","logo":"https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_1280.jpg","date_release":"2024-02-01","date_revision":"2025-02-01","id":"tarj-001"}'
    );
  });

  it('should load edit mode correctly', () => {
    localStorage.setItem('productEditState', 'true');

    component.ngOnInit();

    expect(component.editMode).toBe(JSON.parse('true'));
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });
});
