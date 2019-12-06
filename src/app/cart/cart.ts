import {Article} from '../article/article';

export interface CartItem extends Article {
  inCart: number;
}

export function toCartItem(article: Article, inCart: number) {
  return {...article, inCart};
}

export interface Cart {
  items: CartItem[];
}

export function totalPrice(items: CartItem[]) {
  return items
    .map(i => i.priceInUsd * i.inCart)
    .reduce((p1, p2) => p1 + p2, 0);
}

export function sortByName(items: CartItem[]) {
  return items.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}
