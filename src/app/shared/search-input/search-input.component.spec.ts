import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchChange event on input change', () => {
    const mockEvent = { target: { value: 'test search' } } as unknown as Event;
    const spy = jest.spyOn(component.searchChange, 'emit');

    component.onSearchChange(mockEvent);

    expect(spy).toHaveBeenCalledWith('test search');
  });

  it('should render input element', () => {
    const inputElement = compiled.querySelector('input');
    expect(inputElement).toBeTruthy();
  });
});
