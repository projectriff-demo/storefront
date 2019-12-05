import {TestBed} from '@angular/core/testing';

import {CartService} from './cart.service';
import {StorageService} from '../storage/storage.service';
import {Article} from '../article/article';
import {toCartItem} from './cart';
import {ArticleService} from '../article/article.service';
import {of} from 'rxjs';
import {CartEventService} from './cart-event.service';
import {CartEvent} from './cart-event';


describe('CartService', () => {
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;
  let cartEventServiceSpy: jasmine.SpyObj<CartEventService>;
  let service: CartService;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj(['save', 'get']);
    articleServiceSpy = jasmine.createSpyObj(['findAll']);
    articleServiceSpy.findAll.and.returnValue(of([]));
    cartEventServiceSpy = jasmine.createSpyObj(['publish']);
    return TestBed.configureTestingModule({
      providers: [
        {provide: StorageService, useValue: storageServiceSpy},
        {provide: ArticleService, useValue: articleServiceSpy},
        {provide: CartEventService, useValue: cartEventServiceSpy},
      ]
    });
  });

  describe('with an empty initial cart =>', () => {

    beforeEach(() => {
      service = TestBed.get(CartService);
    });

    it('saves article to storage', () => {
      const article = {name: 'name', sku: 'sku', description: 'description', priceInUsd: 2} as Article;
      const expectedCart = {items: [toCartItem(article, 1)]};
      service.addItem(article);

      expect(storageServiceSpy.save).toHaveBeenCalledWith('cart', expectedCart);
      expect(cartEventServiceSpy.publish).toHaveBeenCalledWith({action: 'add', sku: article.sku, newCart: expectedCart} as CartEvent);
    });
  });

  describe('with a desynchronized initial cart =>', () => {
    const inventoryArticle1 = {name: 'name', sku: 'sku', description: 'description', priceInUsd: 25} as Article;
    const initialQuantityInCart = 2;
    const initialCartItem1 = toCartItem({
      name: 'outdated name',
      sku: 'sku',
      description: 'outdated description',
      priceInUsd: -2
    } as Article, initialQuantityInCart);
    const initialCartItem2 = toCartItem({
      name: 'unavailable name',
      sku: 'unavailable sku',
      description: 'unavailable description',
      priceInUsd: 35
    } as Article, initialQuantityInCart);
    const reconciledCartItem1 = toCartItem(inventoryArticle1, initialQuantityInCart);

    beforeEach(() => {
      // given items in locally-stored cart
      storageServiceSpy = jasmine.createSpyObj(['save', 'get']);
      storageServiceSpy.get.and.returnValue({items: [initialCartItem1, initialCartItem2]});
      TestBed.overrideProvider(StorageService, {useValue: storageServiceSpy});
      // given articles in actual inventory
      articleServiceSpy = jasmine.createSpyObj(['findAll']);
      articleServiceSpy.findAll.and.returnValue(of([inventoryArticle1]));
      TestBed.overrideProvider(ArticleService, {useValue: articleServiceSpy});
    });

    beforeEach(() => {
      service = TestBed.get(CartService);
    });

    it('synchronizes cart with actual inventory on init', (done: DoneFn) => {
      service.cart$.subscribe((cart) => {
        expect(cart.items).toContain(reconciledCartItem1);
        expect(cart.items).not.toContain(initialCartItem2);
        done();
      });
    });

    it('aggregates articles before storing materialized cart', () => {
      service.addItem(inventoryArticle1);

      expect(storageServiceSpy.save)
        .toHaveBeenCalledWith('cart', {items: [toCartItem(inventoryArticle1, initialQuantityInCart + 1)]});
    });

    it('removes articles', () => {
      const cart = {items: []};

      service.removeItem(initialCartItem1);

      expect(storageServiceSpy.save).toHaveBeenCalledWith('cart', cart);
      expect(cartEventServiceSpy.publish).toHaveBeenCalledWith({
        action: 'remove',
        sku: initialCartItem1.sku,
        newCart: cart
      } as CartEvent);
    });
  });
});
