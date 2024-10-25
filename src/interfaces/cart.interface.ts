export interface ICart {
  userId: string;
  items: ICartItem[];
}

export interface ICartItem {
  product: string;
  quantity: number;
}
