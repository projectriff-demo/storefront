import {TestBed} from '@angular/core/testing';

import {CartEventService} from './cart-event.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Cart} from './cart';
import {CartEvent} from './cart-event';

describe('CartEventService', () => {

  let httpMock;
  let service: CartEventService;
  const event = {
    user: 'demo',
    action: 'remove',
    product: 'some-sku',
    quantity: 1
  } as CartEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartEventService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(CartEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('submits events', (done) => {
    service.publish(event).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne('/cart-events');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(event);
    req.flush(null);
  });
});
