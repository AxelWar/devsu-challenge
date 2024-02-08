import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true when onConfirm is called', () => {
    // Spy on the confirm EventEmitter's emit method
    jest.spyOn(component.confirm, 'emit');

    // Call the onConfirm method
    component.onConfirm();

    // Expect the emit method to have been called with true
    expect(component.confirm.emit).toHaveBeenCalledWith(true);
  });

  it('should emit false when onCancel is called', () => {
    // Reuse the spy from the previous test or set up a new one if needed
    jest.spyOn(component.confirm, 'emit');

    // Call the onCancel method
    component.onCancel();

    // Expect the emit method to have been called with false
    expect(component.confirm.emit).toHaveBeenCalledWith(false);
  });
});
