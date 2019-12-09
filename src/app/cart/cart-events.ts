export interface CartEvent {
  user: string;
  product: string;
  quantity: number;
}

export interface CheckoutEvent {
  user: string;
}
