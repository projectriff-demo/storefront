import {Injectable} from '@angular/core';
import {CartEvent} from './cart-event';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartEventService {

  constructor(private httpClient: HttpClient) {
  }

  publish(event: CartEvent): Observable<any> {
    return this.httpClient.post('/cart-events', event);
  }
}
