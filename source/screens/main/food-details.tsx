import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  ChevronLeft,
  Heart,
  Star,
  Truck,
  Clock,
  Minus,
  Plus,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { productDetails } from '@/mocks/products';
import { Ingredient, ProductSize } from '@/types/product';

// Types
type TabsParamList = {
  Home: undefined;
  Cart: { paddingBottom: boolean };
};

type RootStackParamList = {
  Home: undefined;
  CategoriesDetails: undefined;
  FoodDetails: { productId: string };
  Cart: { paddingBottom: boolean };
  Tabs: {
    screen: keyof TabsParamList;
    params?: TabsParamList[keyof TabsParamList];
  };
};

type FoodDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FoodDetails'
>;

const FoodDetailsScreen: React.FC = () => {
  const navigation = useNavigation<FoodDetailsScreenNavigationProp>();
  const [quantity, setQuantity] = useState<number>(2);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [selectedSizeId, setSelectedSizeId] = useState<string>('14');

  const handleQuantityChange = (change: number): void => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleSizeSelect = (sizeId: string): void => {
    setSelectedSizeId(sizeId);
  };

  const handleFavoriteToggle = (): void => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (): void => {
    console.log('Add to cart:', {
      productId: productDetails.id,
      quantity,
      selectedSize: selectedSizeId,
      totalPrice: productDetails.basePrice * quantity,
    });
    navigation.navigate("Cart", { paddingBottom: true });
  };

  const SizeOption: React.FC<{ size: ProductSize }> = ({ size }) => (
    <TouchableOpacity
      className={`px-5 py-2.5 rounded-2xl border-2 transition-all duration-200 ${selectedSizeId === size.id
          ? 'bg-orange-500 border-orange-500 shadow-sm shadow-orange-500/25'
          : 'bg-white border-gray-200 shadow-xs'
        }`}
      onPress={() => handleSizeSelect(size.id)}
      activeOpacity={0.85}
      style={selectedSizeId === size.id ? {
        elevation: 4,
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      } : {}}
    >
      <Text
        className={`text-base font-semibold ${selectedSizeId === size.id ? 'text-white' : 'text-gray-700'
          }`}
      >
        {size.label}
      </Text>
    </TouchableOpacity>
  );

  const IngredientIcon: React.FC<{ ingredient: Ingredient }> = ({ ingredient }) => (
    <TouchableOpacity
      className="w-14 h-14 bg-orange-50 rounded-2xl items-center justify-center border border-orange-100 shadow-xs active:scale-95"
      activeOpacity={0.8}
    >
      <Text className="text-2xl leading-none">{ingredient.icon}</Text>
    </TouchableOpacity>
  );


  return (
    <View className="flex-1 bg-white">
      {/* Floating Header Controls */}
      <View className="absolute top-24 left-0 right-0 px-6 z-50">
        <HStack className="items-center justify-between">
          <TouchableOpacity
            className="w-11 h-11 bg-white/95 backdrop-blur-xl rounded-2xl items-center justify-center shadow-xl border border-white/20 active:scale-95"
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
            className="w-11 h-11 bg-white/95 backdrop-blur-xl rounded-2xl items-center justify-center shadow-xl border border-white/20 active:scale-95"
            onPress={handleFavoriteToggle}
            activeOpacity={0.85}
            style={{
              shadowColor: isFavorite ? '#ef4444' : '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: isFavorite ? 0.25 : 0.15,
              shadowRadius: 12,
            }}
          >
            <Heart
              size={20}
              color={isFavorite ? "#ef4444" : "#6b7280"}
              fill={isFavorite ? "#ef4444" : "transparent"}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        </HStack>
      </View>

      <ScrollView
        className="flex-1 mb-8"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
        bounces={true}
      >
        {/* Hero Image Section*/}
        <View className="relative">
          <View className="h-96 bg-gray-200 overflow-hidden rounded-b-3xl">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=150&fit=crop'
              }}
              className="w-full h-full flex-1"
              resizeMode="cover"
            />

            {/* Subtle Overlay */}
            <View className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
          </View>
        </View>

        {/* Product Info Section */}
        <View className="px-6 pt-4 pb-2">
          {/* Product Title */}
          <Heading className="text-gray-900 text-3xl font-bold mb-3 leading-tight tracking-tight">
            {productDetails.name}
          </Heading>

          {/* Restaurant Info with Enhanced Visual */}
          <HStack className="items-center mb-7">
            <View className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3" />
            <Text className="text-orange-600 text-base font-semibold tracking-wide">
              {productDetails.restaurant}
            </Text>
          </HStack>

          {/* Enhanced Rating and Delivery Info */}
          <HStack className="items-center justify-between mb-8">
            <HStack className="items-center gap-4">
              {/* Rating Badge */}
              <View className="bg-amber-50 rounded-xl px-3 py-2 border border-amber-100">
                <HStack className="items-center">
                  <Star size={14} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
                  <Text className="text-amber-700 text-sm font-bold ml-1.5">
                    {productDetails.rating}
                  </Text>
                </HStack>
              </View>

              {/* Delivery Badge */}
              <View className="bg-emerald-50 rounded-xl px-3 py-2 border border-emerald-100">
                <HStack className="items-center">
                  <Truck size={14} color="#10b981" strokeWidth={2} />
                  <Text className="text-emerald-700 text-sm font-bold ml-1.5">
                    {productDetails.deliveryInfo}
                  </Text>
                </HStack>
              </View>

              {/* Time Badge */}
              <View className="bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                <HStack className="items-center">
                  <Clock size={14} color="#6b7280" strokeWidth={2} />
                  <Text className="text-gray-700 text-sm font-bold ml-1.5">
                    {productDetails.deliveryTime}
                  </Text>
                </HStack>
              </View>
            </HStack>
          </HStack>

          {/* Enhanced Description */}
          <Text className="text-gray-600 text-md font-medium leading-relaxed mb-8 tracking-wide">
            {productDetails.description}
          </Text>

          {/* Refined Size Selection */}
          <View className="mb-8">
            <Text className="text-gray-900 text-lg font-bold mb-5 tracking-wide uppercase">
              Size:
            </Text>
            <HStack className="gap-3">
              {productDetails.sizes.map((size) => (
                <SizeOption key={size.id} size={size} />
              ))}
            </HStack>
          </View>

          {/* Enhanced Ingredients Section */}
          <View className="mb-8">
            <Text className="text-gray-900 text-lg font-bold mb-5 tracking-wide uppercase">
              Ingredients
            </Text>
            <HStack className="gap-3 flex-wrap">
              {productDetails.ingredients.map((ingredient) => (
                <IngredientIcon key={ingredient.id} ingredient={ingredient} />
              ))}
            </HStack>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Fixed Section */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100/80">
        <View className="px-6 py-6">
          <HStack className="items-center justify-between mb-6">
            {/* Dynamic Price Display */}
            <VStack>
              <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                Total Price
              </Text>
              <Heading className="text-gray-900 text-3xl font-black tracking-tighter">
                ${productDetails.basePrice * quantity}
              </Heading>
            </VStack>

            {/* Quantity Control */}
            <View className="bg-gray-900 rounded-2xl p-1.5 shadow-lg">
              <HStack className="items-center gap-2">
                <TouchableOpacity
                  className="w-10 h-10 items-center justify-center rounded-xl bg-gray-800 active:scale-95 active:bg-gray-700"
                  onPress={() => handleQuantityChange(-1)}
                  activeOpacity={0.8}
                >
                  <Minus size={16} color="#FFFFFF" strokeWidth={3} />
                </TouchableOpacity>

                <View className="px-4">
                  <Text className="text-white text-lg font-black min-w-4 text-center">
                    {quantity}
                  </Text>
                </View>

                <TouchableOpacity
                  className="w-10 h-10 items-center justify-center rounded-xl bg-gray-800 active:scale-95 active:bg-gray-700"
                  onPress={() => handleQuantityChange(1)}
                  activeOpacity={0.8}
                >
                  <Plus size={16} color="#FFFFFF" strokeWidth={3} />
                </TouchableOpacity>
              </HStack>
            </View>
          </HStack>

          {/* Add to Cart Button */}
          <Button
            className="rounded-2xl shadow-xl active:scale-[0.98] border border-orange-400"
            onPress={handleAddToCart}
            size="xl"
            style={{
              shadowColor: '#f97316',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <ButtonText className="text-white text-lg font-black text-center tracking-widest uppercase">
              Add to Cart
            </ButtonText>
          </Button>
        </View>

        {/* Safe Area Bottom Padding */}
        <View className="h-8 bg-white/95" />
      </View>
    </View>
  );
};

export default FoodDetailsScreen;