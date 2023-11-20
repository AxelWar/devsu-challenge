import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationControlComponent } from './pagination-control.component';
import { SharedModule } from '../shared.module';

describe('PaginationControlComponent', () => {
  let component: PaginationControlComponent;
  let fixture: ComponentFixture<PaginationControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationControlComponent],
      imports: [SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChanged event when onPrevious is called and currentPage is more than 1', () => {
    component.currentPage = 2;
    jest.spyOn(component.pageChanged, 'emit');
    component.onPrevious();
    expect(component.pageChanged.emit).toHaveBeenCalledWith({
      page: 1,
      size: component.pageSize,
    });
  });

  it('should not emit pageChanged event when onPrevious is called and currentPage is 1', () => {
    component.currentPage = 1;
    jest.spyOn(component.pageChanged, 'emit');
    component.onPrevious();
    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('should emit pageChanged event when onNext is called and currentPage is less than totalPages', () => {
    component.currentPage = 1;
    component.totalPages = 2;
    jest.spyOn(component.pageChanged, 'emit');
    component.onNext();
    expect(component.pageChanged.emit).toHaveBeenCalledWith({
      page: 2,
      size: component.pageSize,
    });
  });

  it('should not emit pageChanged event when onNext is called and currentPage is equal to totalPages', () => {
    component.currentPage = 2;
    component.totalPages = 2;
    jest.spyOn(component.pageChanged, 'emit');
    component.onNext();
    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('should emit pageSizeChange event when onPageSizeChange is called', () => {
    const mockEvent = { target: { value: '10' } } as unknown as Event;
    jest.spyOn(component.pageSizeChange, 'emit');
    component.onPageSizeChange(mockEvent);
    expect(component.pageSizeChange.emit).toHaveBeenCalledWith(10);
  });
});
