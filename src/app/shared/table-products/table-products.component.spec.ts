import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared.module';
import { TableProductsComponent } from './table-products.component';

describe('TableProductsComponent', () => {
  let component: TableProductsComponent;
  let fixture: ComponentFixture<TableProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableProductsComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(TableProductsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
