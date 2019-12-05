import {TestBed} from '@angular/core/testing';

import {CartEventService} from './cart-event.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CartEvent, CheckoutEvent} from './cart-events';

describe('CartEventService', () => {

  let httpMock;
  let service: CartEventService;
  const events = new Map();
  events.set('cart', {
    user: 'demo',
    action: 'remove',
    product: 'some-sku',
    quantity: 1
  } as CartEvent);
  events.set('checkout', {user: 'demo'} as CheckoutEvent);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartEventService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(CartEventService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  events.forEach((event, eventType) => {
    it(`submits ${eventType} events`, (done) => {
      service.publish(event).subscribe(() => {
        done();
      });

      const req = httpMock.expectOne('/cart-events');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(event);
      req.flush(null);
    });
  });
});
