import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckoutComponent} from './checkout.component';
import {CartService} from '../cart/cart.service';
import {of} from 'rxjs';
import {Cart, CartItem} from '../cart/cart';
import {CartEventService} from '../cart/cart-event.service';
import {CheckoutEvent} from '../cart/cart-events';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('CheckoutComponent', () => {
  let fixture: ComponentFixture<CheckoutComponent>;
  let component: CheckoutComponent;
  let dom;
  const cart: Cart = {
    items: [
      {sku: 'sku1', priceInUsd: 22, inCart: 7, description: 'description1', quantity: 475} as CartItem,
      {sku: 'sku2', priceInUsd: 33, inCart: 3, description: 'description2', quantity: 475} as CartItem
    ]
  };
  let checkOutCartSpy: jasmine.Spy;

  beforeEach(async(() => {
    checkOutCartSpy = jasmine.createSpy('checkout');
    checkOutCartSpy.and.returnValue(of());
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CheckoutComponent],
      providers: [
        {provide: CartService, useValue: {cart$: of(cart), checkOutCart: checkOutCartSpy}},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('lists items in cart', () => {
    const skus = Array.from(dom.querySelectorAll('tr:not(.last) td:nth-child(1)'))
      .map((td: any) => td.textContent);

    expect(skus).toEqual(cart.items.map(_ => _.sku));
  });

  it('shows the total price', () => {
    const textContent = dom.querySelector('#total').textContent;

    expect(textContent).toEqual('$253.00');
  });

  it('checks out cart on button click', () => {
    dom.querySelector('tr.last .btn').click();

    expect(checkOutCartSpy).toHaveBeenCalled();
  });
});
