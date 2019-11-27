import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from './cart.service';
import {Observable, Subscription} from 'rxjs';
import {Cart, CartItem} from './cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  private cartSubscription: Subscription;
  private firstSubscription = true;

  cart$: Observable<Cart>;
  hiddenCart = true;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
    this.cartSubscription = this.cart$.subscribe((_) => {
      if (this.firstSubscription) { // keep cart hidden on first load
        this.firstSubscription = false;
      } else {
        this.hiddenCart = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  toggle() {
    this.hiddenCart = !this.hiddenCart;
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
  }

  sortByName(items: CartItem[]) {
    return items.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
}
