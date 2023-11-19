import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared.module';
import { TooltipIconComponent } from './tooltip-icon.component';

describe('TooltipIconComponent', () => {
  let component: TooltipIconComponent;
  let fixture: ComponentFixture<TooltipIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipIconComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(TooltipIconComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
