import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {Component} from '@angular/core';
import {CartService} from './cart/cart.service';
import {Cart} from './cart/cart';
import {AuthService} from './login/auth.service';
import {of} from 'rxjs';

describe('AppComponent', () => {
  let cartServiceSpy;
  let authServiceSpy;
  let fixture;
  let component;
  let dom;
  let loginDom;

  beforeEach(async(() => {
    cartServiceSpy = jasmine.createSpyObj<CartService>(['clear']);
    authServiceSpy = jasmine.createSpyObj<AuthService>(['logOut', 'getLogin$']);
    authServiceSpy.getLogin$.and.returnValue(of('some-username'));
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: 'login', component: FakeLoginComponent}
      ])],
      declarations: [
        AppComponent,
        FakeCartComponent,
        FakeLoginComponent
      ],
      providers: [
        {provide: CartService, useValue: cartServiceSpy},
        {provide: AuthService, useValue: authServiceSpy}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    loginDom = TestBed.createComponent(FakeLoginComponent).debugElement.nativeElement;
  });

  it('shows the cart', () => {
    expect(dom.querySelector('#fake-cart'))
      .toBeTruthy('cart should be included');
  });

  it('logs out', () => {
    dom.querySelector('#logout').click();

    expect(cartServiceSpy.clear).toHaveBeenCalled();
    expect(authServiceSpy.logOut).toHaveBeenCalled();
    expect(loginDom.querySelector('#fake-login'))
      .toBeTruthy('should show login after logout');
  });
});

@Component({
  selector: 'app-cart',
  template: '<p id="fake-cart">yay</p>',
})
class FakeCartComponent {

}

@Component({
  selector: 'app-login',
  template: '<p id="fake-login">yay</p>',
})
class FakeLoginComponent {

}
