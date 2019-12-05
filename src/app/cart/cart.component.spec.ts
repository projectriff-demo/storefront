import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartComponent} from './cart.component';
import {CartService} from './cart.service';
import {of, ReplaySubject} from 'rxjs';
import {CartItem} from './cart';
import {RouterTestingModule} from '@angular/router/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let dom;
  let removeItemCalled: boolean;
  const cartSubject = new ReplaySubject(1);

  beforeEach(async(() => {
    removeItemCalled = false;
    const cartServiceStub = {
      cart$: cartSubject.asObservable(), removeItem: (article: CartItem) => {
        removeItemCalled = true;
        return of();
      }
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CartComponent],
      providers: [
        {provide: CartService, useValue: cartServiceStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('lists articles in cart', () => {
    const cartItem = {name: 'name', sku: 'sku', description: 'description', priceInUsd: 2, inCart: 6} as CartItem;
    cartSubject.next({items: [cartItem]});
    fixture.detectChanges();

    const domItems = Array.from(dom.querySelectorAll('li.cart-item')).map((title: any) => title.textContent);
    expect(domItems.length).toEqual(1, '1 cart item should be displayed');
    expect(domItems[0]).toContain('name ($2.00 per unit)');
  });

  it('displays a removal from cart button', () => {
    const cartItem = {name: 'name', sku: 'sku', description: 'description', priceInUsd: 2, inCart: 6} as CartItem;
    cartSubject.next({items: [cartItem]});
    fixture.detectChanges();

    expect(Array.from(dom.querySelectorAll('.remove-from-cart')).length)
      .toEqual(1, 'there should be 1 removal button');
  });

  it('removes the select article from cart', () => {
    const cartItem = {name: 'name', sku: 'sku', description: 'description', priceInUsd: 2, inCart: 6} as CartItem;
    cartSubject.next({items: [cartItem]});
    fixture.detectChanges();

    dom.querySelector('.remove-from-cart').click();
    fixture.detectChanges();

    expect(removeItemCalled).toBeTruthy('remove item should have been called');
  });
});
