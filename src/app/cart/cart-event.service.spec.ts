import {TestBed} from '@angular/core/testing';

import {CartEventService} from './cart-event.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CartEvent, CheckoutEvent} from './cart-events';

describe('CartEventService', () => {

  let httpMock;
  let service: CartEventService;
  const cartEvent = {
    user: 'demo',
    action: 'remove',
    product: 'some-sku',
    quantity: 1
  } as CartEvent;
  const checkoutEvent = {user: 'demo'} as CheckoutEvent;

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

  it(`submits cart events`, (done) => {
    service.publishCartEvent(cartEvent).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne('/cart-events');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(cartEvent);
    req.flush(null);
  });

  it(`submits checkout events`, (done) => {
    service.publishCheckoutEvent(checkoutEvent).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne('/checkout-events');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(checkoutEvent);
    req.flush(null);
  });
});
