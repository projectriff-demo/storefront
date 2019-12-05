export interface CartEvent {
  user: string;
  action: 'remove' | 'add';
  product: string;
  quantity: number;
}

export interface CheckoutEvent {
  user: string;
}
