export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryFee: string;
  deliveryTime: string;
  distance: string;
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  isSelected: boolean;
  count?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  image: string;
  category: string;
}

export interface SingleRestaurant {
  id: string;
  name: string;
  description: string;
  rating: number;
  deliveryInfo: string;
  deliveryTime: string;
  images: string[];
  categories: Category[];
  menuItems: MenuItem[];
}
