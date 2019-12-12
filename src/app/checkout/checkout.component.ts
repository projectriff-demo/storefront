import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart/cart.service';
import {Observable} from 'rxjs';
import {Cart, sortByName, totalPrice} from '../cart/cart';
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
