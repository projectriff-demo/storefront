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

  private cartEventSubscriptions: Subscription[];
  private cartSubscription: Subscription;
  private firstSubscription = true;

  cart$: Observable<Cart>;
  hiddenCart = true;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
    this.cartEventSubscriptions = [];
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
