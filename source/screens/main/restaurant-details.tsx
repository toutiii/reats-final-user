import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import {
  ChevronLeft,
  MoreHorizontal,
  Star,
  Truck,
  Clock,
  Plus,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Heading } from '@/components/ui/heading';

const { width } = Dimensions.get('window');

// Types
interface Category {
  id: string;
  name: string;
  isSelected: boolean;
  count?: number;
}

interface MenuItem {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  image: string;
  category: string;
}

interface Restaurant {
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

// Navigation types
type RootStackParamList = {
  Home: undefined;
  CategoriesDetails: undefined;
  RestaurantDetails: { restaurantId: string };
  FoodDetails: { productId: string };
  Cart: undefined;
};

type RestaurantDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RestaurantDetails'
>;

const RestaurantDetailsScreen: React.FC = () => {
  const navigation = useNavigation<RestaurantDetailsScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState<string>('burger');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const restaurant: Restaurant = {
    id: '1',
    name: 'Spicy Restaurant',
    description: 'Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
    rating: 4.7,
    deliveryInfo: 'Free',
    deliveryTime: '20 min',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop',
    ],
    categories: [
      { id: 'burger', name: 'Burger', isSelected: true, count: 10 },
      { id: 'sandwich', name: 'Sandwich', isSelected: false },
      { id: 'pizza', name: 'Pizza', isSelected: false },
      { id: 'sanwich', name: 'Sanwich', isSelected: false },
    ],
    menuItems: [
      {
        id: '1',
        name: 'Burger Ferguson',
        restaurant: 'Spicy Restaurant',
        price: 40,
        image: 'https://pixabay.com/get/g6ed01997710f58f285d1045ecd4763db06f9237f371f7027d98772a65377c36d04cb2984fe9a0bcaa469d8e9ec3dcc380af1bc0c7a92a7a3b4ca6516cf2ea01bb929e9fbde68a269da13626c8565ed30_640.jpg',
        category: 'burger',
      },
      {
        id: '2',
        name: "Rockin' Burgers",
        restaurant: 'Cafetechino',
        price: 40,
        image: 'https://pixabay.com/get/g6ed01997710f58f285d1045ecd4763db06f9237f371f7027d98772a65377c36d04cb2984fe9a0bcaa469d8e9ec3dcc380af1bc0c7a92a7a3b4ca6516cf2ea01bb929e9fbde68a269da13626c8565ed30_640.jpg',
        category: 'burger',
      },
    ],
  };

  const handleCategorySelect = (categoryId: string): void => {
    setSelectedCategory(categoryId);
  };

  const handleMenuItemPress = (itemId: string): void => {
    navigation.navigate('FoodDetails', { productId: itemId });
  };

  const CategoryButton: React.FC<{ category: Category }> = ({ category }) => (
    <TouchableOpacity
      className={`px-6 py-3 rounded-full border ${
        selectedCategory === category.id
          ? 'bg-orange-500 border-orange-500'
          : 'bg-white border-gray-200'
      }`}
      onPress={() => handleCategorySelect(category.id)}
      activeOpacity={0.8}
    >
      <Text
        className={`text-sm font-semibold ${
          selectedCategory === category.id ? 'text-white' : 'text-gray-700'
        }`}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => (
    <TouchableOpacity
      className="w-[48%] mb-6 active:scale-[0.98]"
      onPress={() => handleMenuItemPress(item.id)}
      activeOpacity={0.9}
    >
      <View className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        {/* Image Container */}
        <View className="h-32 bg-gray-200 relative overflow-hidden">
          <View className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-t-3xl" >
            <Image
              source={{ uri: item.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
        </View>

        {/* Content */}
        <View className="p-4">
          <Text className="text-gray-900 text-sm font-semibold mb-1 leading-tight">
            {item.name}
          </Text>
          <Text className="text-gray-500 text-xs font-medium mb-3">
            {item.restaurant}
          </Text>
          
          <HStack className="items-center justify-between">
            <Text className="text-gray-900 text-base font-bold">
              ${item.price}
            </Text>
            
            <TouchableOpacity 
              className="w-8 h-8 bg-orange-500 rounded-full items-center justify-center shadow-lg active:scale-95"
              activeOpacity={0.8}
            >
              <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </HStack>
        </View>
      </View>
    </TouchableOpacity>
  );

  const PaginationDots: React.FC = () => (
    <HStack className="items-center justify-center gap-2 absolute bottom-4 left-0 right-0">
      {restaurant.images.map((_, index) => (
        <TouchableOpacity
          key={index}
          className={`w-2 h-2 rounded-full ${
            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
          }`}
          onPress={() => setCurrentImageIndex(index)}
          activeOpacity={0.8}
        />
      ))}
    </HStack>
  );

  const selectedCategoryItems = restaurant.menuItems.filter(
    item => item.category === selectedCategory
  );

  const selectedCategoryData = restaurant.categories.find(
    cat => cat.id === selectedCategory
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Floating Header Controls */}
      <View className="absolute top-24 left-0 right-0 px-6 z-50">
        <HStack className="items-center justify-between">
          <TouchableOpacity
            className="w-12 h-12 bg-white/95 backdrop-blur-xl rounded-full items-center justify-center shadow-xl border border-white/20 active:scale-95"
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
            }}
          >
            <ChevronLeft size={22} color="#1f2937" strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-12 h-12 bg-white/95 backdrop-blur-xl rounded-full items-center justify-center shadow-xl border border-white/20 active:scale-95"
            activeOpacity={0.85}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
            }}
          >
            <MoreHorizontal size={22} color="#1f2937" strokeWidth={2.5} />
          </TouchableOpacity>
        </HStack>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Hero Image Carousel */}
        <View className="relative">
          <View className="h-80 bg-gray-200 overflow-hidden rounded-b-3xl">
            <Image
              source={{ uri: restaurant.images[currentImageIndex] }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500" />
            
            {/* Subtle Overlay */}
            <View className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </View>
          
          {/* Pagination Dots */}
          <PaginationDots />
        </View>

        {/* Restaurant Info Section */}
        <View className="px-6 pt-6 pb-4">
          {/* Rating and Info Badges */}
          <HStack className="items-center gap-4 mb-6">
            {/* Rating Badge */}
            <HStack className="items-center">
              <Star size={16} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
              <Text className="text-orange-600 text-base font-semibold ml-1">
                {restaurant.rating}
              </Text>
            </HStack>

            {/* Delivery Badge */}
            <HStack className="items-center">
              <Truck size={16} color="#f59e0b" strokeWidth={2} />
              <Text className="text-orange-600 text-base font-semibold ml-1">
                {restaurant.deliveryInfo}
              </Text>
            </HStack>

            {/* Time Badge */}
            <HStack className="items-center">
              <Clock size={16} color="#f59e0b" strokeWidth={2} />
              <Text className="text-orange-600 text-base font-semibold ml-1">
                {restaurant.deliveryTime}
              </Text>
            </HStack>
          </HStack>

          {/* Restaurant Name */}
          <Heading className="text-gray-900 text-2xl font-bold mb-4 leading-tight">
            {restaurant.name}
          </Heading>

          {/* Description */}
          <Text className="text-gray-600 text-sm font-medium leading-relaxed mb-6">
            {restaurant.description}
          </Text>

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
            className="mb-6"
          >
            <HStack className="gap-3">
              {restaurant.categories.map((category) => (
                <CategoryButton key={category.id} category={category} />
              ))}
            </HStack>
          </ScrollView>

          {/* Section Title with Count */}
          <Text className="text-gray-900 text-lg font-semibold mb-6">
            {selectedCategoryData?.name} ({selectedCategoryData?.count || selectedCategoryItems.length})
          </Text>

          {/* Menu Items Grid */}
          <View className="flex-row flex-wrap justify-between">
            {selectedCategoryItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestaurantDetailsScreen;