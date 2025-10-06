import React, { useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  ChevronLeft,
  ChevronDown,
  Search,
} from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { Heading } from "@/components/ui/heading";
import Filters from "@/components/filters";
import ProductCard from "@/components/common/product-card";
import RestaurantCard from "@/components/common/restaurant-card";
import { StackNavigation } from "@/types/navigation";
import { restaurants } from "@/mocks/restaurants";
import { Restaurant } from "@/types/restaurant";
import { products } from "@/mocks/products";
import { Product } from "@/types/product";


const CategoriesDetailsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const [selectedCategory, setSelectedCategory] = useState<string>("Burger");
  const handleCategoryPress = (): void => {
    console.log("Category selector pressed");
  };

  const handleSearchPress = (): void => {
    console.log("Search pressed");
    navigation.navigate("Main", {screen: "Search"});
  };

  const handleFilterPress = (): void => {
    console.log("Filter pressed");
  };

  const handleAddToCart = (burgerId: number): void => {
    console.log("Add to cart:", burgerId);
  };

  const handleRestaurantPress = (restaurantId: number): void => {
    console.log("Restaurant pressed:", restaurantId);
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
            <Filters />
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
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>

        {/* Open Restaurants Section */}
        <View className="px-5 pb-6">
          <Heading className="text-gray-900 text-2xl font-semibold mb-6 leading-6">
            Open Restaurants
          </Heading>

          {/* Restaurant Cards */}
          {restaurants.map((restaurant: Restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoriesDetailsScreen;