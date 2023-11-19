import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../shared/shared.module';
import { ProductRegisterComponent } from './product-register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductRegisterComponent', () => {
  let component: ProductRegisterComponent;
  let fixture: ComponentFixture<ProductRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductRegisterComponent],
      imports: [SharedModule, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ProductRegisterComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
