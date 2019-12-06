import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../cart/cart.service';
import {Observable, Subscription} from 'rxjs';
import {Cart, sortByName, totalPrice} from '../cart/cart';
import {CartEventService} from '../cart/cart-event.service';
import {CheckoutEvent} from '../cart/cart-events';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  price = totalPrice;

  cart$: Observable<Cart>;

  sortByName = sortByName;

  constructor(private cartService: CartService,
              private router: Router) {
  }

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
  }

  confirmOrder() {
    this.cartService.checkOutCart().subscribe(_ => {
      this.router.navigateByUrl('');
    });
  }
}
