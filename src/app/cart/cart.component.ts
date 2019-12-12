import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from './cart.service';
import {Observable, Subscription} from 'rxjs';
import {Cart, CartItem, sortByName} from './cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  private cartEventSubscriptions: Subscription[];
  private cartSubscription: Subscription;
  private firstSubscription = true;

  cart$: Observable<Cart>;
  hiddenCart = true;
  sortByName = sortByName;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
    this.cartEventSubscriptions = [];
    this.cartSubscription = this.cart$.subscribe((cart) => {
      if (this.firstSubscription) { // keep cart hidden on first load
        this.firstSubscription = false;
      } else if (cart.items.length > 0) {
        this.hiddenCart = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    this.cartEventSubscriptions.forEach((ces) => {
      ces.unsubscribe();
    });
  }

  toggle() {
    this.hiddenCart = !this.hiddenCart;
  }

  removeItem(item: CartItem) {
    this.cartEventSubscriptions.push(this.cartService.removeItem(item).subscribe());
  }
}
