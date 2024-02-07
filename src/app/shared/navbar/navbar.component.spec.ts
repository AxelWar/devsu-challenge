import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared.module';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [SharedModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home when logo is clicked', () => {
    jest.spyOn(router, 'navigate');
    const button = fixture.debugElement.query(
      By.css('a.clickable')
    ).nativeElement;
    const clickSpy = jest.spyOn(component, 'routerNavigate');

    button.click();

    expect(clickSpy).toHaveBeenCalled();
  });
});
