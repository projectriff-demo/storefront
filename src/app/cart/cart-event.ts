import {Cart} from './cart';

export interface CartEvent {
  action: 'remove' | 'add';
  sku: string;
  newCart: Cart;
}
