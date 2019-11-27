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
