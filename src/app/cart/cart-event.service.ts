import {Injectable} from '@angular/core';
import {CartEvent, CheckoutEvent} from './cart-events';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartEventService {

  constructor(private httpClient: HttpClient) {
  }

  publishCartEvent(event: CartEvent): Observable<any> {
    return this.httpClient.post('/cart-events', event);
  }

  publishCheckoutEvent(event: CheckoutEvent): Observable<any> {
    return this.httpClient.post('/checkout-events', event);
  }
}
