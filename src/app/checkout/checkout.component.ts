import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../cart/cart.service';
import {Observable, Subscription} from 'rxjs';
import {Cart, sortByName, totalPrice} from '../cart/cart';
import {CartEventService} from '../cart/cart-event.service';
import {CheckoutEvent} from '../cart/cart-events';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  price = totalPrice;

  cart$: Observable<Cart>;

  sortByName = sortByName;

  private checkoutSubscription: Subscription;

  constructor(private cartService: CartService,
              private cartEventService: CartEventService) {
  }

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
    this.checkoutSubscription = this.cartEventService.publishCheckoutEvent({user: 'demo'} as CheckoutEvent).subscribe();
  }

  ngOnDestroy(): void {
    if (this.checkoutSubscription) {
      this.checkoutSubscription.unsubscribe();
    }
  }
}
