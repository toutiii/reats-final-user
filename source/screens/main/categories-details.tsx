import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  ChevronLeft,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Plus,
  Star,
  Clock,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Heading } from '@/components/ui/heading';
import { Image } from 'react-native';

// Types
interface Burger {
  id: number;
  name: string;
  restaurant: string;
  price: number;
  image: string;
}

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  deliveryInfo: string;
  time: string;
  image: string;
}

interface CardProps {
  burger: Burger;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

type RootStackParamList = {
  Home: undefined;
  CategoriesDetails: undefined;
  FoodDetails: undefined;
  RestaurantDetails: undefined;
  Search: undefined;
};

type CategoriesDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CategoriesDetails'
>;

const CategoriesDetailsScreen: React.FC = () => {
  const navigation = useNavigation<CategoriesDetailsScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState<string>('Burger');

  const popularBurgers: Burger[] = [
    {
      id: 1,
      name: 'Burger Bistro',
      restaurant: 'Rose Garden',
      price: 40,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=150&fit=crop',
    },
    {
      id: 2,
      name: "Smokin' Burger",
      restaurant: 'Cafenic Restaurant',
      price: 60,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=150&fit=crop',
    },
    {
      id: 3,
      name: 'Buffalo Burgers',
      restaurant: 'Kaji Firm Kitchen',
      price: 75,
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=200&h=150&fit=crop',
    },
    {
      id: 4,
      name: 'Bullseye Burgers',
      restaurant: 'Kabab Restaurant',
      price: 94,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=150&fit=crop',
    },
  ];

  const openRestaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Rose Garden Restaurant',
      rating: 4.7,
      deliveryInfo: 'Free',
      time: '20 min',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Golden Palace',
      rating: 4.5,
      deliveryInfo: '$2.99',
      time: '25 min',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop',
    },
  ];

  const Card: React.FC<CardProps> = ({ burger }) => (
    <TouchableOpacity className="w-[48%] mb-6" onPress={() => navigation.navigate('FoodDetails')}>
      <View className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        {/* Image Container */}
        <View className="h-32 bg-gray-200 relative overflow-hidden">
          <Image
            source={{ uri: burger.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Placeholder for image */}
          <View className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
        </View>

        {/* Content */}
        <View className="p-4">
          <Text className="text-gray-900 font-semibold mb-1 leading-tight">
            {burger.name}
          </Text>
          <Text className="text-gray-500 text-sm font-medium mb-3">
            {burger.restaurant}
          </Text>

          <HStack className="items-center justify-between">
            <Text className="text-gray-900 text-md font-bold">
              ${burger.price}
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

  const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => (
    <TouchableOpacity
      className="mb-6 active:scale-[0.98]"
      activeOpacity={0.9}
      onPress={() => navigation.navigate('RestaurantDetails')}
    >
      <View className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        {/* Image Container */}
        <View className="h-44 bg-gray-300 relative overflow-hidden">
          <Image
            source={{ uri: restaurant.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </View>

        {/* Content */}
        <View className="p-5">
          <Text className="text-gray-900 text-xl font-semibold mb-4 leading-6">
            {restaurant.name}
          </Text>

          <HStack className="items-center gap-4">
            {/* Rating */}
            <HStack className="items-center">
              <Star size={14} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
              <Text className="text-orange-600 text-[14px] font-semibold ml-1">
                {restaurant.rating}
              </Text>
            </HStack>

            {/* Delivery Info */}
            <HStack className="items-center">
              <View className="w-2 h-2 bg-orange-500 rounded-full" />
              <Text className="text-orange-600 text-[14px] font-semibold ml-2">
                {restaurant.deliveryInfo}
              </Text>
            </HStack>

            {/* Time */}
            <HStack className="items-center">
              <Clock size={14} color="#6b7280" strokeWidth={2} />
              <Text className="text-gray-600 text-[14px] font-semibold ml-1">
                {restaurant.time}
              </Text>
            </HStack>
          </HStack>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleCategoryPress = (): void => {
    console.log('Category selector pressed');
  };

  const handleSearchPress = (): void => {
    console.log('Search pressed');
    navigation.navigate('Search');
  };

  const handleFilterPress = (): void => {
    console.log('Filter pressed');
  };

  const handleAddToCart = (burgerId: number): void => {
    console.log('Add to cart:', burgerId);
  };

  const handleRestaurantPress = (restaurantId: number): void => {
    console.log('Restaurant pressed:', restaurantId);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header */}
      <View className="bg-white border-b border-gray-100">
        <HStack className="items-center justify-between px-5 py-4">
          {/* Back Button */}
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={20} color="#1f2937" strokeWidth={2.5} />
          </TouchableOpacity>

          {/* Category Selector */}
          <TouchableOpacity
            className="flex-1 mx-6 active:opacity-70"
            activeOpacity={0.7}
            onPress={handleCategoryPress}
          >
            <HStack className="items-center justify-center">
              <Text className="text-gray-900 text-[16px] font-bold tracking-[0.8px] uppercase">
                {selectedCategory}
              </Text>
              <ChevronDown size={18} color="#6b7280" strokeWidth={2.5} className="ml-2" />
            </HStack>
          </TouchableOpacity>

          {/* Action Buttons */}
          <HStack className="items-center gap-3 gap-3">
            {/* Search Button */}
            <TouchableOpacity
              className="w-11 h-11 bg-gray-900 rounded-full items-center justify-center shadow-lg active:scale-95"
              activeOpacity={0.8}
              onPress={handleSearchPress}
            >
              <Search size={18} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>

            {/* Filter Button */}
            <TouchableOpacity
              className="w-11 h-11 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
              activeOpacity={0.7}
              onPress={handleFilterPress}
            >
              <SlidersHorizontal size={18} color="#1f2937" strokeWidth={2} />
            </TouchableOpacity>
          </HStack>
        </HStack>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Popular Burgers Section */}
        <View className="px-5 pt-8 pb-6">
          <Heading className="text-gray-900 text-2xl font-semibold mb-6 leading-6">
            Popular Burgers
          </Heading>

          {/* Burgers Grid */}
          <View className="flex-row flex-wrap justify-between">
            {popularBurgers.map((burger: Burger) => (
              <Card key={burger.id} burger={burger} />
            ))}
          </View>
        </View>

        {/* Open Restaurants Section */}
        <View className="px-5 pb-6">
          <Heading className="text-gray-900 text-2xl font-semibold mb-6 leading-6">
            Open Restaurants
          </Heading>

          {/* Restaurant Cards */}
          {openRestaurants.map((restaurant: Restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoriesDetailsScreen;