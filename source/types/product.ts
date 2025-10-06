export interface Product {
    id: number;
    name: string;
    restaurant: string;
    price: number;
    image: string;
}

export interface ProductSize {
  id: string;
  size: string;
  label: string;
  isSelected: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  icon: string;
}

export interface ProductDetails {
  id: string;
  name: string;
  restaurant: string;
  rating: number;
  deliveryInfo: string;
  deliveryTime: string;
  description: string;
  basePrice: number;
  image: string;
  sizes: ProductSize[];
  ingredients: Ingredient[];
}
