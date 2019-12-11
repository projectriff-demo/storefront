import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './login/auth.service';
import {CartService} from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StoreFront';

  constructor(private router: Router,
              private authService: AuthService,
              private cartService: CartService) {
  }

  showCart(): boolean {
    return this.router.url !== '/checkout';
  }

  showLogout() {
    return this.router.url !== '/login';
  }

  logOut() {
    this.authService.logOut();
    this.cartService.clear();
    this.router.navigate(['/login']);
  }
}
