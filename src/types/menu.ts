
export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description?: string;
  popular: boolean;
  image_url?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}
