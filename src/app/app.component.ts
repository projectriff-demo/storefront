import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './login/auth.service';
import {CartService} from './cart/cart.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'StoreFront';
  username$: Observable<string>;

  constructor(private router: Router,
              private authService: AuthService,
              private cartService: CartService) {
  }


  ngOnInit(): void {
    this.username$ = this.authService.getLogin$();
  }

  showCart(): boolean {
    return this.router.url !== '/checkout' && this.showLogout();
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
