import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsHomeComponent } from './products-home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductsHomeComponent', () => {
  let component: ProductsHomeComponent;
  let fixture: ComponentFixture<ProductsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsHomeComponent],
      imports: [SharedModule, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ProductsHomeComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
