import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Menu,
  ChevronDown,
  Bell,
  Star,
  Clock,
  ChevronRight,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import SearchBar from '@/components/common/search-bar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '@/types/navigation';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const categories = [
    { id: 1, name: 'All', active: true },
    { id: 2, name: 'Hot Dog', active: false },
    { id: 3, name: 'Burger', active: false },
    { id: 4, name: 'Pizza', active: false },
  ];

  const restaurants = [
    {
      id: 1,
      name: 'Rose Garden Restaurant',
      cuisine: 'Burger • Chicken • Riche • Wings',
      rating: 4.7,
      deliveryInfo: 'Free',
      time: '20 min',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Golden Palace',
      cuisine: 'Chinese • Asian • Noodles',
      rating: 4.5,
      deliveryInfo: '$2.99',
      time: '25 min',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View className="bg-white border-b border-gray-100">
        <HStack className="justify-between items-center px-5 py-4">
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            activeOpacity={0.7}
          >
            <Menu size={22} color="#1f2937" strokeWidth={1.8} />
          </TouchableOpacity>

          <VStack className="flex-1 ml-4">
            <Text className="text-orange-500 text-[11px] font-semibold uppercase tracking-[1.2px] mb-0.5">
              DELIVER TO
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <HStack className="items-center">
                <Text className="text-gray-900 font-semibold">
                  Halal Lab office
                </Text>
                <ChevronDown size={14} color="#6b7280" className="ml-1.5" strokeWidth={2} />
              </HStack>
            </TouchableOpacity>
          </VStack>

          <TouchableOpacity
            className="relative active:scale-95"
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Main', {
              screen: 'Notifications',
            })}
          >
            <View className="bg-gray-900 rounded-full p-2.5 shadow-lg shadow-black/10">
              <Bell size={18} color="white" strokeWidth={1.8} />
            </View>
            <View className="absolute -top-1 -right-1 bg-orange-500 rounded-full w-4 h-4 items-center justify-center border-2 border-white shadow-sm">
              <Text className="text-white text-[10px] font-bold">2</Text>
            </View>
          </TouchableOpacity>
        </HStack>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-5 pt-6 pb-5">
          <Text className="text-gray-900 text-[20px] font-normal leading-7">
            Hey Halal, <Text className="font-bold text-gray-900">Good Afternoon!</Text>
          </Text>
        </View>
       <SearchBar />

        <View className="mb-8">
          <View className="px-5">
            <HStack className="justify-between items-center mb-5">
              <Heading className="text-gray-900 font-bold">
                All Categories
              </Heading>
              <TouchableOpacity
                className="flex-row items-center active:opacity-60"
                activeOpacity={0.7}
              >
                <TouchableOpacity onPress={() => navigation.navigate('Main', {
                  screen: 'AllCategories',
                })}>
                <Text className="text-gray-500 text-sm font-medium mr-1">See All</Text>
                </TouchableOpacity>
                <ChevronRight size={14} color="#6b7280" strokeWidth={2} />
              </TouchableOpacity>
            </HStack>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            className="flex-row"
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                className={`mr-3 px-5 py-2.5 rounded-2xl ${category.active
                  ? 'bg-orange-500 shadow-lg shadow-orange-500/25'
                  : 'bg-gray-200/60'
                  }`}
                activeOpacity={0.8}
                style={category.active ? {
                  shadowColor: '#f97316',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 6,
                } : {}}
                onPress={() => {
                  navigation.navigate('Main', {
                    screen: 'CategoriesDetails',
                  });
                }}
              >
                <Text
                  className={`font-semibold text-sm ${category.active
                    ? 'text-white'
                    : 'text-gray-700'
                    }`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Open Restaurants Section */}
        <View className="px-5">
          <HStack className="justify-between items-center mb-5">
            <Heading className="text-gray-900 font-bold">
              Open Restaurants
            </Heading>
            <TouchableOpacity
              className="flex-row items-center active:opacity-60"
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('Main', {
                  screen: 'AllRestaurants',
                });
              }}
            >
              <Text className="text-gray-500 text-sm font-medium mr-1">See All</Text>
              <ChevronRight size={14} color="#6b7280" strokeWidth={2} />
            </TouchableOpacity>
          </HStack>

          {/* Cards */}
          {restaurants.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              className="mb-5 active:scale-[0.98]"
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Main', {
                screen: 'RestaurantDetails',
                })}
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
                {/* Restaurant Image with Overlay */}
                <View className="h-44 bg-gray-200 relative overflow-hidden">
                  <Image
                    source={{ uri: restaurant.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <View
                    className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
                  />
                </View>

                {/* Restaurant Info */}
                <View className="p-5">
                  <Text className="text-gray-900 text-lg font-bold mb-1.5 leading-6">
                    {restaurant.name}
                  </Text>
                  <Text className="text-gray-500 text-[13px] font-medium mb-4 leading-5">
                    {restaurant.cuisine}
                  </Text>

                  <HStack className="items-center">
                    <View className="bg-amber-50 rounded-full px-3 py-1.5 mr-3">
                      <HStack className="items-center">
                        <Star size={13} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
                        <Text className="text-amber-700 font-bold ml-1.5 text-sm">
                          {restaurant.rating}
                        </Text>
                      </HStack>
                    </View>

                    {/* Delivery Fee */}
                    <View className="bg-orange-50 px-3 py-1.5 rounded-full mr-3">
                      <Text className="text-orange-600 text-sm font-bold">
                        {restaurant.deliveryInfo}
                      </Text>
                    </View>

                    {/* Delivery Time */}
                    <View className="bg-gray-50 rounded-full px-3 py-1.5">
                      <HStack className="items-center">
                        <Clock size={12} color="#6b7280" strokeWidth={1.8} />
                        <Text className="text-gray-600 text-sm font-semibold ml-1.5">
                          {restaurant.time}
                        </Text>
                      </HStack>
                    </View>
                  </HStack>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;