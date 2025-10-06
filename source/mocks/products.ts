import { Product, ProductDetails } from "@/types/product";

export const products: Product[] = [
    {
      id: 1,
      name: "Burger Bistro",
      restaurant: "Rose Garden",
      price: 40,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=150&fit=crop",
    },
    {
      id: 2,
      name: "Smokin' Burger",
      restaurant: "Cafenic Restaurant",
      price: 60,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=150&fit=crop",
    },
    {
      id: 3,
      name: "Buffalo Burgers",
      restaurant: "Kaji Firm Kitchen",
      price: 75,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=200&h=150&fit=crop",
    },
    {
      id: 4,
      name: "Bullseye Burgers",
      restaurant: "Kabab Restaurant",
      price: 94,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=150&fit=crop",
    },
  ];


  export const productDetails: ProductDetails = {
    id: "1",
    name: "Burger Bistro",
    restaurant: "Rose Garden",
    rating: 4.7,
    deliveryInfo: "Free",
    deliveryTime: "20 min",
    description: "Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
    basePrice: 32,
    image: "https://www.tasteofhome.com/wp-content/uploads/2017/09/exps28800_UG143377D12_18_1b_RMS.jpg",
    sizes: [
      { id: "10", size: "10\"", label: "10\"", isSelected: false },
      { id: "14", size: "14\"", label: "14\"", isSelected: true },
      { id: "16", size: "16\"", label: "16\"", isSelected: false },
    ],
    ingredients: [
      { id: "1", name: "Cheese", icon: "🧀" },
      { id: "2", name: "Lettuce", icon: "🥬" },
      { id: "3", name: "Tomato", icon: "🍅" },
      { id: "4", name: "Onion", icon: "🧅" },
      { id: "5", name: "Sauce", icon: "🥫" },
    ],
  };
