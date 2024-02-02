import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { FinancialProduct } from 'src/app/shared/interfaces/financial-product.interface';
import { FinancialProductsService } from '../../../shared/services/financial-products.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.scss'],
})
export class ProductRegisterComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  editMode = false;
  formSubscription!: Subscription;
  constructor(
    private fb: FormBuilder,
    private financialProductsService: FinancialProductsService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loadEditMode();
    this.initializeForm();
    this.setupDateRevisionListener();
    this.loadFormData();
    this.loadCurrentProduct();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: [{ value: '', disabled: true }],
    });
    const idValidators = [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ];

    const idAsyncValidators = !this.editMode
      ? this.validateProductID(this.financialProductsService)
      : [];

    this.productForm.addControl(
      'id',
      this.fb.control(
        { value: '', disabled: this.editMode },
        idValidators,
        idAsyncValidators
      )
    );
    this.setupDateRevisionListener();

    Object.keys(this.productForm.controls).forEach(field => {
      const control = this.productForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    this.formSubscription = this.productForm.valueChanges.subscribe(() => {
      const formValueIncludingDisabled = {
        ...this.productForm.getRawValue(),
        id: this.productForm.get('id')?.value,
      };
      localStorage.setItem(
        'productFormData',
        JSON.stringify(formValueIncludingDisabled)
      );
    });
  }

  validateProductID(
    financialProductsService: FinancialProductsService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return financialProductsService
        .verifyFinancialProduct(control.value)
        .pipe(
          map(isUsed => {
            return isUsed ? { invalidProductId: true } : null;
          }),
          catchError(() => of({ invalidProductId: true }))
        );
    };
  }

  loadEditMode() {
    const editModeStored = localStorage.getItem('productEditState');
    if (editModeStored) {
      this.editMode = JSON.parse(editModeStored);
    }
  }

  loadFormData() {
    const savedData = localStorage.getItem('productFormData');
    if (savedData && this.productForm) {
      this.productForm.patchValue(JSON.parse(savedData));
      this.productForm.get('id')?.disable();
    }
  }

  loadCurrentProduct() {
    const currentProduct = this.financialProductsService.getCurrentProduct();
    if (currentProduct) {
      this.editMode = true;
      localStorage.setItem('productEditState', JSON.stringify(this.editMode));
      this.productForm.patchValue({
        ...currentProduct,
        date_release: this.formatDateForInput(currentProduct.date_release),
        date_revision: this.formatDateForInput(currentProduct.date_revision),
      });

      if (!localStorage.getItem('originalProductData')) {
        localStorage.setItem(
          'originalProductData',
          JSON.stringify(currentProduct)
        );
      }

      this.productForm.get('id')?.disable();
    }
  }

  setupDateRevisionListener() {
    this.productForm
      .get('date_release')
      ?.valueChanges.subscribe(releaseDate => {
        if (releaseDate) {
          const revisionDate = this.calculateDateRevision(releaseDate);
          this.productForm
            .get('date_revision')
            ?.setValue(revisionDate, { emitEvent: false });
        }
      });
  }

  calculateDateRevision(releaseDateString: string): string {
    const releaseDate = new Date(releaseDateString);
    releaseDate.setFullYear(releaseDate.getFullYear() + 1);
    return releaseDate.toISOString().split('T')[0];
  }

  calculateNextYear(dateString: string): string {
    const date = new Date(dateString);
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData: FinancialProduct = this.productForm.getRawValue(); // Use getRawValue to include disabled fields
      productData.date_revision = this.calculateDateRevision(
        productData.date_release
      );
      if (this.editMode) {
        this.financialProductsService
          .updateFinancialProduct(productData)
          .subscribe(res => {
            if (res) {
              this.ngZone
                .run(() => this.router.navigate(['/financial-products']))
                .then();
            }
          });
      } else {
        this.financialProductsService
          .createFinancialProduct(productData)
          .subscribe(res => {
            if (res) {
              this.ngZone
                .run(() => this.router.navigate(['/financial-products']))
                .then();
            }
          });
      }
    }
  }

  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  resetForm() {
    if (this.editMode) {
      const originalData = localStorage.getItem('originalProductData');
      if (originalData) {
        const originalProduct = JSON.parse(originalData) as FinancialProduct;
        this.productForm.reset();
        this.productForm.patchValue({
          ...originalProduct,
          date_release: this.formatDateForInput(originalProduct.date_release),
          date_revision: this.calculateNextYear(originalProduct.date_release),
        });
        this.productForm.get('id')?.disable();
      }
    } else {
      this.productForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.financialProductsService.setCurrentProduct(null);
    localStorage.removeItem('productFormData');
    localStorage.removeItem('originalProductData');
    localStorage.removeItem('productEditState');
    this.formSubscription.unsubscribe();
  }
}
