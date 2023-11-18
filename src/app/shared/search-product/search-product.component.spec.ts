import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchProductComponent } from './search-product.component';
import { SharedModule } from '../shared.module';

describe('SearchProductComponent', () => {
  let component: SearchProductComponent;
  let fixture: ComponentFixture<SearchProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchProductComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(SearchProductComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
