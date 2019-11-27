import {Injectable} from '@angular/core';
import {Article} from '../article/article';
import {StorageService} from '../storage/storage.service';
import {Cart, CartItem, toCartItem} from './cart';
import {ReplaySubject} from 'rxjs';
import {ArticleService} from '../article/article.service';

@Injectable({providedIn: 'root'})
export class CartService {

  private cart: Cart;
  private cartSubject = new ReplaySubject<Cart>(1);
  public cart$ = this.cartSubject.asObservable();

  constructor(private storageService: StorageService,
              private articleService: ArticleService) {

    this.articleService.findAll().subscribe(inventory => {
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
      this.publish(cart);
    });
  }

  // add item once to cart
  addItem(article: Article) {
    const newCart = {items: this.mergeItems(article)} as Cart;
    this.publish(newCart);
  }

  // entirely remove an item from cart (whether there are 1 or 23 of them)
  removeItem(cartItem: CartItem) {
    const newCart = {items: this.cart.items.filter(i => i.sku !== cartItem.sku)};
    this.publish(newCart);
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

  private publish(cart: Cart) {
    this.storageService.save('cart', cart);
    this.cart = cart;
    this.cartSubject.next(cart);
  }
}
