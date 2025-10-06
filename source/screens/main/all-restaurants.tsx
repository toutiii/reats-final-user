import React, { FC, useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  ChevronLeft,
  Search,
  Star,
  X,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '@/types/navigation';
import { restaurants } from '@/mocks/restaurants';
import RestaurantCard from '@/components/common/restaurant-card';
import Filters from '@/components/filters';

const AllRestaurantsScreen: FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'popular', label: 'Popular' },
    { id: 'nearby', label: 'Nearby' },
    { id: 'free', label: 'Free Delivery' },
    { id: 'fast', label: 'Fast Delivery' },
  ];

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRestaurants = restaurants.length;
  const avgRating = (restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length).toFixed(1);
  const freeDeliveryCount = restaurants.filter(r => r.deliveryFee === 'Free').length;
 

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

         <Filters />
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