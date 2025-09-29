import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import {
  Bell,
  Star,
  TrendingUp,
  Clock,
  Menu,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import SearchBar from '@/components/common/search-bar';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Search: undefined;
  CategoriesDetails: undefined;
  FoodDetails: undefined;
  RestaurantDetails: undefined;
  Notifications: undefined;
};

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;


const SearchScreen = ({ navigation }: { navigation: SearchScreenNavigationProp }) => {
  const [searchText, setSearchText] = useState('Pizza');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchAnimValue = useState(new Animated.Value(0))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    Animated.timing(searchAnimValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    Animated.timing(searchAnimValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const recentKeywords = [
    { id: 1, text: 'Burger', trending: true },
    { id: 2, text: 'Sandwich', trending: false },
    { id: 3, text: 'Pizza', trending: true },
    { id: 4, text: 'Sushi', trending: false },
    { id: 5, text: 'Pasta', trending: true },
  ];

  const suggestedRestaurants = [
    {
      id: 1,
      name: 'Pansi Restaurant',
      subtitle: 'Italian • European Cuisine',
      rating: 4.7,
      reviewCount: '2.1k',
      deliveryTime: '25-30 min',
      deliveryFee: 'Free delivery',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
      isPromoted: true,
    },
    {
      id: 2,
      name: 'American Spicy Burger Shop',
      subtitle: 'Burgers • Fast Food • American',
      rating: 4.3,
      reviewCount: '892',
      deliveryTime: '20-25 min',
      deliveryFee: '$2.99',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop',
      isPromoted: false,
    },
    {
      id: 3,
      name: 'Cafenio Coffee Club',
      subtitle: 'Coffee • Desserts • Breakfast',
      rating: 4.0,
      reviewCount: '456',
      deliveryTime: '15-20 min',
      deliveryFee: '$1.99',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop',
      isPromoted: false,
    },
  ];

  const popularFastFood = [
    {
      id: 1,
      name: 'European Pizza',
      description: 'Uttora Coffee House',
      price: '$12.99',
      originalPrice: '$15.99',
      discount: '20%',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=150&fit=crop',
    },
    {
      id: 2,
      name: 'Buffalo Pizza',
      description: 'Cafenio Coffee Club',
      price: '$14.50',
      originalPrice: null,
      discount: null,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=150&fit=crop',
    },
  ];

  const clearSearch = () => {
    setSearchText('');
  };

  const borderColor = searchAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', '#F97316'],
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View className="bg-white border-b border-gray-100">
        <HStack className="justify-between items-center px-5 py-4">
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            activeOpacity={0.7}
          >
            <Menu size={22} color="#1f2937" strokeWidth={1.8} />
          </TouchableOpacity>

          <VStack className="flex-1 ml-4">
            <TouchableOpacity activeOpacity={0.7}>
              <HStack className="items-center">
                <Heading className="text-gray-900 font-semibold">
                 Search
                </Heading>
              </HStack>
            </TouchableOpacity>
          </VStack>

          <TouchableOpacity
            className="relative active:scale-95"
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Notifications')}
          >
            <View className="bg-gray-900 rounded-full p-2.5 shadow-lg shadow-black/10">
              <Bell size={18} color="white" strokeWidth={1.8} />
            </View>
            <View className="absolute -top-2 -right-1 bg-orange-500 rounded-full size-5 items-center justify-center border-2 border-white shadow-sm">
              <Text className="text-white text-xs font-bold">2</Text>
            </View>
          </TouchableOpacity>
        </HStack>
      </View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Revolutionary Search Bar with Dynamic Animations */}
        <Animated.View 
          className="pt-6 mb-2 px-5"
          style={{ opacity: fadeAnim }}
        >
           <SearchBar />
        </Animated.View>

        {/* Enhanced Recent Keywords with Trending Indicators */}
        <Animated.View 
          className="px-6 mb-10"
          style={{ 
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            }],
          }}
        >
          <HStack className="items-center justify-between mb-6">
            <VStack>
              <Heading className="text-gray-900 font-bold">
                Recent Keywords
              </Heading>
              <Text className="text-gray-500 text-[13px] font-medium">
                Your search history
              </Text>
            </VStack>
            <TouchableOpacity className="bg-orange-50 rounded-full px-4 py-2">
              <Text className="text-orange-600 text-[12px] font-bold">Clear All</Text>
            </TouchableOpacity>
          </HStack>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {recentKeywords.map((keyword) => (
              <TouchableOpacity
                key={keyword.id}
                className="mr-3 px-5 py-3 rounded-2xl bg-white border border-gray-100 active:scale-95 active:bg-gray-50"
                activeOpacity={0.9}
                onPress={() => {
                  setSearchText(keyword.text)
                  navigation.navigate('CategoriesDetails')
                }}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <HStack className="items-center">
                  {keyword.trending && (
                    <View className="mr-2">
                      <TrendingUp size={14} color="#F97316" strokeWidth={2} />
                    </View>
                  )}
                  <Text className="text-gray-700 font-semibold text-[14px] tracking-tight">
                    {keyword.text}
                  </Text>
                </HStack>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>


        <Animated.View 
          className="px-6 mb-6"
          style={{ 
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [40, 0],
              }),
            }],
          }}
        >
          <VStack className="mb-6">
            <Heading className="text-gray-900 font-bold">
              Suggested Restaurants
            </Heading>
            <Text className="text-gray-500 text-[13px] font-medium">
              Handpicked for you based on your preferences
            </Text>
          </VStack>
          
          <VStack className="space-y-4">
            {suggestedRestaurants.map((restaurant, index) => (
              <TouchableOpacity
                key={restaurant.id}
                className="active:scale-[0.98] active:bg-gray-50/50 rounded-3xl p-1 -m-1 mb-3"
                activeOpacity={0.95}
                onPress={() => navigation.navigate('RestaurantDetails')}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.06,
                  shadowRadius: 16,
                  elevation: 4,
                }}
              >
                <View className="bg-white rounded-[22px] p-5">
                  <HStack className="items-center">
                    <View className="relative mr-5">
                      <View 
                        className="w-20 h-20 rounded-3xl bg-gray-100 overflow-hidden"
                        style={{
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.08,
                          shadowRadius: 8,
                          elevation: 3,
                        }}
                      >
                        <Image
                          source={{ uri: restaurant.image }}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                      </View>
                      {restaurant.isPromoted && (
                        <View className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full px-2 py-1">
                          <Text className="text-white text-[8px] font-black">AD</Text>
                        </View>
                      )}
                    </View>
                    
                    <VStack className="flex-1">
                      <Text className="text-gray-900 text-[17px] font-bold mb-1 tracking-tight">
                        {restaurant.name}
                      </Text>
                      <Text className="text-gray-500 text-[13px] font-medium mb-3 leading-5">
                        {restaurant.subtitle}
                      </Text>
                      
                      <HStack className="items-center justify-between">
                        <HStack className="items-center">
                          <View className="bg-amber-50 rounded-full px-3 py-1.5 mr-3">
                            <HStack className="items-center">
                              <Star size={12} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
                              <Text className="text-amber-700 font-bold ml-1.5 text-[12px]">
                                {restaurant.rating}
                              </Text>
                              <Text className="text-amber-600 font-medium ml-1 text-[11px]">
                                ({restaurant.reviewCount})
                              </Text>
                            </HStack>
                          </View>
                        </HStack>
                        
                        <VStack className="items-end">
                          <HStack className="items-center mb-1">
                            <Clock size={12} color="#6b7280" strokeWidth={2} />
                            <Text className="text-gray-600 text-[11px] font-semibold ml-1">
                              {restaurant.deliveryTime}
                            </Text>
                          </HStack>
                          <Text className={`text-[11px] font-bold ${restaurant.deliveryFee === 'Free delivery' ? 'text-green-600' : 'text-gray-600'}`}>
                            {restaurant.deliveryFee}
                          </Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </HStack>
                </View>
              </TouchableOpacity>
            ))}
          </VStack>
        </Animated.View>

        {/* Popular Fast Food Cards */}
        <Animated.View 
          className="px-6"
          style={{ 
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [60, 0],
              }),
            }],
          }}
        >
          <VStack className="mb-6">
            <Heading className="text-gray-900 font-bold">
              Popular Fast Food
            </Heading>
            <Text className="text-gray-500 text-[13px] font-medium">
              Trending dishes everyone loves
            </Text>
          </VStack>
          
          <HStack className="justify-between gap-4">
            {popularFastFood.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                className="flex-1 mr-4 last:mr-0 active:scale-[0.96]"
                activeOpacity={0.95}
                onPress={() => navigation.navigate('FoodDetails')}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.12,
                  shadowRadius: 24,
                  elevation: 8,
                }}
              >
                <View className="bg-white rounded-[28px] overflow-hidden">
                  <View className="relative h-36 bg-gray-100 overflow-hidden">
                    <Image
                      source={{ uri: item.image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                    
                    {/* Gradient overlay */}
                    <View 
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                    />
                    
                    {/* Rating badge */}
                    <View className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <HStack className="items-center">
                        <Star size={10} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
                        <Text className="text-gray-900 font-bold ml-1 text-sm">
                          {item.rating}
                        </Text>
                      </HStack>
                    </View>
                    
                    {/* Discount badge */}
                    {item.discount && (
                      <View className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full px-2 py-1">
                        <Text className="text-white text-[10px] font-black">
                          -{item.discount}
                        </Text>
                      </View>
                    )}
                  </View>
                  
                  <View className="p-5">
                    <Text className="text-gray-900 text-md font-bold mb-1 leading-5 tracking-tight">
                      {item.name}
                    </Text>
                    <Text className="text-gray-500 text-sm font-medium mb-4 leading-4">
                      {item.description}
                    </Text>
                    
                    <HStack className="items-center justify-between">
                      <VStack>
                        <HStack className="items-center">
                          <Text className="text-gray-900 text-md font-black">
                            {item.price}
                          </Text>
                          {item.originalPrice && (
                            <Text className="text-gray-400 text-[12px] font-medium line-through ml-2">
                              {item.originalPrice}
                            </Text>
                          )}
                        </HStack>
                      </VStack>
                      
                      <TouchableOpacity 
                        className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-8 h-8 items-center justify-center active:scale-90"
                        activeOpacity={0.8}
                      >
                        <Text className="text-white font-black text-[16px]">+</Text>
                      </TouchableOpacity>
                    </HStack>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </HStack>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;