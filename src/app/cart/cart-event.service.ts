import {Injectable} from '@angular/core';
import {CartEvent, CheckoutEvent} from './cart-events';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartEventService {

  constructor(private httpClient: HttpClient) {
  }

  publishCartEvent(event: CartEvent): Observable<any> {
    return this.httpClient.post('/cart-events', event).pipe(this.catchingError());
  }

  publishCheckoutEvent(event: CheckoutEvent): Observable<any> {
    return this.httpClient.post('/checkout-events', event).pipe(this.catchingError());
  }

  private catchingError() {
    return catchError((err) => {
      console.error(err);
      return of({});
    });
  }
}
