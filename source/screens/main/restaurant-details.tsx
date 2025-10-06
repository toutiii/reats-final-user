import React, { useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import {
  ChevronLeft,
  MoreHorizontal,
  Star,
  Truck,
  Clock,
  EditIcon,
  TrashIcon
} from "lucide-react-native";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetIcon,
} from "@/components/ui/actionsheet";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { Heading } from "@/components/ui/heading";
import ProductCard from "@/components/common/product-card";
import { products } from "@/mocks/products";
import { StackNavigation } from "@/types/navigation";
import { Category } from "@/types/restaurant";
import { restaurant } from "@/mocks/restaurants";

const RestaurantDetailsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const [selectedCategory, setSelectedCategory] = useState<string>("burger");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showActionsheet, setShowActionsheet] = React.useState(false);

  const handleClose = () => setShowActionsheet(false);


  const handleCategorySelect = (categoryId: string): void => {
    setSelectedCategory(categoryId);
  };

  const handleMenuItemPress = (itemId: string): void => {
    navigation.navigate("Main", { screen: "FoodDetails"});
  };

  const CategoryButton: React.FC<{ category: Category }> = ({ category }) => (
    <TouchableOpacity
      className={`px-6 py-3 rounded-full border ${
        selectedCategory === category.id
          ? "bg-orange-500 border-orange-500"
          : "bg-white border-gray-200"
      }`}
      onPress={() => handleCategorySelect(category.id)}
      activeOpacity={0.8}
    >
      <Text
        className={`text-sm font-semibold ${
          selectedCategory === category.id
? "text-white"
: "text-gray-700"
        }`}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );


  const PaginationDots: React.FC = () => (
    <HStack className="items-center justify-center gap-2 absolute bottom-4 left-0 right-0">
      {restaurant.images.map((_, index) => (
        <TouchableOpacity
          key={index}
          className={`w-2 h-2 rounded-full ${
            index === currentImageIndex
? "bg-white"
: "bg-white/50"
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
    <View className="flex-1 bg-gray-50">
      {/* Floating Header Controls */}
      <View className="absolute top-24 left-0 right-0 px-6 z-50">
        <HStack className="items-center justify-between">
          <TouchableOpacity
            className="w-12 h-12 bg-white/95 backdrop-blur-xl rounded-full items-center justify-center shadow-xl border border-white/20 active:scale-95"
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
            style={{
              shadowColor: "#000",
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
            onPress={() => setShowActionsheet(true)}
            style={{
              shadowColor: "#000",
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
          <View className="h-96 bg-gray-200 overflow-hidden rounded-b-3xl">
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
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-20" />
      </ScrollView>

      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="min-h-36">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Option 1</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Option 2</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Option 3</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Option 4</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </View>
  );
};

export default RestaurantDetailsScreen;