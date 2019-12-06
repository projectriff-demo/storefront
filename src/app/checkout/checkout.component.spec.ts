import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckoutComponent} from './checkout.component';
import {CartService} from '../cart/cart.service';
import {of} from 'rxjs';
import {Cart, CartItem} from '../cart/cart';
import {CartEventService} from '../cart/cart-event.service';
import {CheckoutEvent} from '../cart/cart-events';

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
  let cartEventServiceSpy: jasmine.SpyObj<CartEventService>;

  beforeEach(async(() => {
    cartEventServiceSpy = jasmine.createSpyObj(['publishCheckoutEvent']);
    cartEventServiceSpy.publishCheckoutEvent.and.returnValue(of());
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      providers: [
        {provide: CartService, useValue: {cart$: of(cart)}},
        {provide: CartEventService, useValue: cartEventServiceSpy},
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

  it('sends checkout event on page load', () => {
    expect(cartEventServiceSpy.publishCheckoutEvent)
      .toHaveBeenCalledWith({user: 'demo'} as CheckoutEvent);
  });

  it('lists items in cart', () => {
    const skus = Array.from(dom.querySelectorAll('tr td:nth-child(1):not(#total)'))
      .map((td: any) => td.textContent);

    expect(skus).toEqual(cart.items.map(_ => _.sku));
  });

  it('shows the total price', () => {
    const textContent = dom.querySelector('#total').textContent;

    expect(textContent).toEqual('Total price: $253.00');
  });
});
