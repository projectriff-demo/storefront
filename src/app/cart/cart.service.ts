import {Injectable} from '@angular/core';
import {Article} from '../article/article';
import {StorageService} from '../storage/storage.service';
import {Cart, CartItem, toCartItem} from './cart';
import {Observable, ReplaySubject} from 'rxjs';
import {ArticleService} from '../article/article.service';
import {CartEventService} from './cart-event.service';
import {CartEvent} from './cart-event';

@Injectable({providedIn: 'root'})
export class CartService {

  private cart: Cart;
  private cartSubject = new ReplaySubject<Cart>(1);
  public cart$ = this.cartSubject.asObservable();

  constructor(private storageService: StorageService,
              private articleService: ArticleService,
              private cartEventService: CartEventService) {

    this.articleService.findAll()
      .subscribe(inventory => {
        const cart = this.storageService.get('cart') || {items: []};
        cart.items = cart.items
          .map(cartItem => {
            const article = inventory.find(item => item.sku === cartItem.sku);
            if (!article) {
              return null;
            }
            return {...article, inCart: cartItem.inCart};
          })
          .filter(_ => _ !== null);
        this.updateStoredCart(cart);
      });
  }

  // add item once to cart
  addItem(article: Article): Observable<any> {
    this.updateStoredCart({items: this.mergeItems(article)} as Cart);
    return this.cartEventService.publish({
      user: 'demo',
      action: 'add',
      product: article.sku,
      quantity: 1
    } as CartEvent);
  }

  // entirely remove an item from cart (whether there are 1 or 23 of them)
  removeItem(cartItem: CartItem): Observable<any> {
    this.updateStoredCart({items: this.cart.items.filter(i => i.sku !== cartItem.sku)});
    return this.cartEventService.publish({
      user: 'demo',
      action: 'remove',
      product: cartItem.sku,
      quantity: cartItem.inCart
    } as CartEvent);
  }

  private mergeItems(article: Article): CartItem[] {
    const items = this.cart.items;
    let found = false;
    for (const item of items) {
      if (item.sku === article.sku) {
        found = true;
        item.inCart++;
        break;
      }
    }
    if (!found) {
      return [...items, toCartItem(article, 1)];
    }
    return items;
  }

  private updateStoredCart(cart: Cart) {
    this.storageService.save('cart', cart);
    this.cart = cart;
    this.cartSubject.next(cart);
  }
}
