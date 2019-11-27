export interface Article {
    sku: string;
    name: string;
    description: string;
    priceInUsd: number;
    imageUrl: string | null;
    quantity: number;
}
