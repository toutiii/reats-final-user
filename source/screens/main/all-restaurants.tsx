import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  ChevronLeft,
  Search,
  Star,
  Clock,
  MapPin,
  SlidersHorizontal,
  X,
  TrendingUp,
  Award,
  Flame,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  AllRestaurants: undefined;
  RestaurantDetails: { restaurantId: number };
};

type AllRestaurantsScreenNavigationProp = {
  navigation: StackNavigationProp<RootStackParamList, 'AllRestaurants'>;
};

interface Restaurant {
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

const AllRestaurantsScreen: React.FC<AllRestaurantsScreenNavigationProp> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'popular', label: 'Popular' },
    { id: 'nearby', label: 'Nearby' },
    { id: 'free', label: 'Free Delivery' },
    { id: 'fast', label: 'Fast Delivery' },
  ];

  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Rose Garden Restaurant',
      cuisine: 'Burger • Chicken • Wings',
      rating: 4.7,
      deliveryFee: 'Free',
      deliveryTime: '20 min',
      distance: '1.2 km',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=200&fit=crop',
      isTrending: true,
      isFeatured: true,
    },
    {
      id: 2,
      name: 'Golden Palace',
      cuisine: 'Chinese • Asian • Noodles',
      rating: 4.5,
      deliveryFee: '$2.99',
      deliveryTime: '25 min',
      distance: '2.5 km',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Italiano Trattoria',
      cuisine: 'Italian • Pasta • Pizza',
      rating: 4.8,
      deliveryFee: 'Free',
      deliveryTime: '30 min',
      distance: '3.1 km',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop',
      isFeatured: true,
    },
    {
      id: 4,
      name: 'Sushi Master',
      cuisine: 'Japanese • Sushi • Seafood',
      rating: 4.9,
      deliveryFee: '$3.99',
      deliveryTime: '35 min',
      distance: '4.2 km',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=200&fit=crop',
      isNew: true,
    },
    {
      id: 5,
      name: 'The Burger Joint',
      cuisine: 'American • Burgers • Fries',
      rating: 4.6,
      deliveryFee: 'Free',
      deliveryTime: '18 min',
      distance: '0.8 km',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=200&fit=crop',
      isTrending: true,
    },
    {
      id: 6,
      name: 'Green Leaf Cafe',
      cuisine: 'Healthy • Salads • Smoothies',
      rating: 4.4,
      deliveryFee: '$1.99',
      deliveryTime: '22 min',
      distance: '1.5 km',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop',
      isNew: true,
    },
    {
      id: 7,
      name: 'Spice Kingdom',
      cuisine: 'Indian • Curry • Tandoori',
      rating: 4.7,
      deliveryFee: '$2.49',
      deliveryTime: '28 min',
      distance: '2.8 km',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=200&fit=crop',
    },
    {
      id: 8,
      name: 'Taco Fiesta',
      cuisine: 'Mexican • Tacos • Burritos',
      rating: 4.5,
      deliveryFee: 'Free',
      deliveryTime: '20 min',
      distance: '1.7 km',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=200&fit=crop',
    },
  ];

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRestaurants = restaurants.length;
  const avgRating = (restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length).toFixed(1);
  const freeDeliveryCount = restaurants.filter(r => r.deliveryFee === 'Free').length;

  const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
    return (
      <TouchableOpacity
        className="mb-5 active:scale-[0.98]"
        activeOpacity={0.9}
        onPress={() => navigation.navigate('RestaurantDetails', { restaurantId: restaurant.id })}
      >
        <View
          className="bg-white rounded-3xl overflow-hidden"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <View className="h-44 bg-gray-200 relative overflow-hidden">
            <Image
              source={{ uri: restaurant.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {(restaurant.isNew || restaurant.isFeatured || restaurant.isTrending) && (
              <View className="absolute top-3 left-3">
                {restaurant.isFeatured && (
                  <View className="bg-orange-500 px-3 py-1.5 rounded-full mb-2 flex-row items-center">
                    <Award size={12} color="white" strokeWidth={2} />
                    <Text className="text-white text-xs font-bold ml-1">FEATURED</Text>
                  </View>
                )}
                {restaurant.isTrending && (
                  <View className="bg-amber-500 px-3 py-1.5 rounded-full mb-2 flex-row items-center">
                    <TrendingUp size={12} color="white" strokeWidth={2} />
                    <Text className="text-white text-xs font-bold ml-1">TRENDING</Text>
                  </View>
                )}
                {restaurant.isNew && (
                  <View className="bg-emerald-500 px-3 py-1.5 rounded-full flex-row items-center">
                    <Flame size={12} color="white" strokeWidth={2} />
                    <Text className="text-white text-xs font-bold ml-1">NEW</Text>
                  </View>
                )}
              </View>
            )}
          </View>

          <View className="p-5">
            <Text className="text-gray-900 text-lg font-bold mb-1.5 leading-6">
              {restaurant.name}
            </Text>
            <Text className="text-gray-500 text-sm font-medium mb-4 leading-5">
              {restaurant.cuisine}
            </Text>

            <HStack className="items-center flex-wrap">
              <View className="bg-amber-50 rounded-full px-3 py-1.5 mr-2 mb-2">
                <HStack className="items-center">
                  <Star size={13} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
                  <Text className="text-amber-700 font-bold ml-1.5 text-sm">
                    {restaurant.rating}
                  </Text>
                </HStack>
              </View>

              <View 
                className={`${restaurant.deliveryFee === 'Free' ? 'bg-emerald-50' : 'bg-orange-50'} px-3 py-1.5 rounded-full mr-2 mb-2`}
              >
                <Text 
                  className={`${restaurant.deliveryFee === 'Free' ? 'text-emerald-600' : 'text-orange-600'} text-sm font-bold`}
                >
                  {restaurant.deliveryFee}
                </Text>
              </View>

              <View className="bg-gray-50 rounded-full px-3 py-1.5 mr-2 mb-2">
                <HStack className="items-center">
                  <Clock size={12} color="#6b7280" strokeWidth={1.8} />
                  <Text className="text-gray-600 text-sm font-semibold ml-1.5">
                    {restaurant.deliveryTime}
                  </Text>
                </HStack>
              </View>

              <View className="bg-gray-50 rounded-full px-3 py-1.5 mb-2">
                <HStack className="items-center">
                  <MapPin size={12} color="#6b7280" strokeWidth={1.8} />
                  <Text className="text-gray-600 text-sm font-semibold ml-1.5">
                    {restaurant.distance}
                  </Text>
                </HStack>
              </View>
            </HStack>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View className="bg-white border-b border-gray-100">
        <HStack className="justify-between items-center px-5 py-4">
          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            activeOpacity={0.7}
            onPress={() => navigation.goBack()} 
          >
            <ChevronLeft size={22} color="#1f2937" strokeWidth={2} />
          </TouchableOpacity>
          
          <VStack className="items-center">
            <Text className="text-gray-900 text-xl font-bold">All Restaurants</Text>
            <Text className="text-gray-500 text-xs font-medium">{filteredRestaurants.length} places nearby</Text>
          </VStack>

          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            activeOpacity={0.7}
          >
            <SlidersHorizontal size={20} color="#1f2937" strokeWidth={1.8} />
          </TouchableOpacity>
        </HStack>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="px-5 pt-6 pb-4">
          <View 
            className="bg-white rounded-2xl p-4 mb-5"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <HStack className="items-center">
              <Search size={20} color="#9ca3af" strokeWidth={2} />
              <TextInput
                className="flex-1 text-gray-900 ml-3"
                placeholder="Search restaurants or cuisine..."
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity 
                  onPress={() => setSearchQuery('')}
                  className="w-6 h-6 rounded-full bg-gray-100 items-center justify-center"
                  activeOpacity={0.7}
                >
                  <X size={14} color="#6b7280" strokeWidth={2} />
                </TouchableOpacity>
              )}
            </HStack>
          </View>

          <HStack className="gap-3 mb-6">
            <View 
              className="flex-1 bg-white rounded-2xl p-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                Restaurants
              </Text>
              <Text className="text-gray-900 text-xl font-bold">
                {totalRestaurants}
              </Text>
            </View>
            
            <View 
              className="flex-1 bg-orange-50 rounded-2xl p-4 border border-orange-100"
            >
              <Text className="text-orange-600 text-xs font-semibold uppercase tracking-wider mb-1">
                Avg Rating
              </Text>
              <HStack className="items-center">
                <Text className="text-orange-600 text-xl font-bold mr-1">
                  {avgRating}
                </Text>
                <Star size={16} color="#f97316" fill="#f97316" strokeWidth={0} />
              </HStack>
            </View>

            <View 
              className="flex-1 bg-white rounded-2xl p-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                Free Delivery
              </Text>
              <Text className="text-gray-900 text-xl font-bold">
                {freeDeliveryCount}
              </Text>
            </View>
          </HStack>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            <HStack className="gap-2">
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  className={`px-5 py-2.5 rounded-2xl ${
                    selectedFilter === filter.id
                      ? 'bg-orange-500'
                      : 'bg-white'
                  }`}
                  style={selectedFilter === filter.id ? {
                    shadowColor: '#f97316',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                    elevation: 6,
                  } : {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.04,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                  activeOpacity={0.8}
                  onPress={() => setSelectedFilter(filter.id)}
                >
                  <Text
                    className={`font-semibold text-sm ${
                      selectedFilter === filter.id
                        ? 'text-white'
                        : 'text-gray-700'
                    }`}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </HStack>
          </ScrollView>
        </View>

        {searchQuery && (
          <View className="px-5 pb-3">
            <Text className="text-gray-500 text-sm font-medium">
              Found <Text className="text-gray-900 font-bold">{filteredRestaurants.length}</Text> restaurants for "{searchQuery}"
            </Text>
          </View>
        )}

        {filteredRestaurants.length > 0 ? (
          <View className="px-5">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center px-8 pt-16">
            <View 
              className="w-20 h-20 rounded-3xl bg-white items-center justify-center mb-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <Search size={32} color="#d1d5db" strokeWidth={1.8} />
            </View>
            
            <VStack className="items-center">
              <Text className="text-gray-900 text-xl font-bold text-center mb-2">
                No restaurants found
              </Text>
              <Text className="text-gray-500 text-sm text-center leading-5 mb-5 max-w-xs">
                We couldn't find any restaurants matching "{searchQuery}"
              </Text>
              <TouchableOpacity 
                className="px-6 py-3 rounded-2xl bg-orange-500 active:bg-orange-600"
                style={{
                  shadowColor: '#f97316',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 6,
                }}
                onPress={() => setSearchQuery('')}
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-sm">
                  Clear search
                </Text>
              </TouchableOpacity>
            </VStack>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllRestaurantsScreen;