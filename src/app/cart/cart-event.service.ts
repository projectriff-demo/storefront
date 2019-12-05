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

  publish(event: CartEvent | CheckoutEvent): Observable<any> {
    return this.httpClient.post('/cart-events', event);
  }
}
