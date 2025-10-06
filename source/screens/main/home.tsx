import React, { useEffect, memo } from 'react';
import {
  ScrollView,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated';
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

// Animated components
const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Restaurant card component
const RestaurantCard = memo(({ restaurant, index }: { restaurant: any; index: number }) => {
  const navigation = useNavigation<StackNavigation>();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    const delay = 1100 + (index * 150);

    opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
    translateY.value = withDelay(delay, withSpring(0, { damping: 15, stiffness: 100 }));
    scale.value = withDelay(delay, withSpring(1, { damping: 15, stiffness: 120 }));
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <AnimatedPressable
      style={({ pressed }) => [
        animatedStyle,
        pressed && { transform: [{ scale: 0.97 }] }, // feedback au clic
      ]}
      className="mb-5"
      onPress={() =>
        navigation.navigate('Main', {
          screen: 'RestaurantDetails',
        })
      }
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
          <View className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </View>

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

            <View className="bg-orange-50 px-3 py-1.5 rounded-full mr-3">
              <Text className="text-orange-600 text-sm font-bold">
                {restaurant.deliveryInfo}
              </Text>
            </View>

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
    </AnimatedPressable>
  );
});

RestaurantCard.displayName = 'RestaurantCard';

// Category button component
const CategoryButton = memo(({ category, index }: { category: any; index: number }) => {
  const navigation = useNavigation<StackNavigation>();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    const delay = 800 + index * 100;

    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    scale.value = withDelay(delay, withSpring(1, { damping: 12, stiffness: 150 }));
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={({ pressed }) => [
        animatedStyle,
        pressed && { transform: [{ scale: 0.95 }] }, // petit effet clic
      ]}
      className={`mr-3 px-5 py-2.5 rounded-2xl ${
        category.active
          ? 'bg-orange-500 shadow-lg shadow-orange-500/25'
          : 'bg-gray-200/60'
      }`}
      onPress={() =>
        navigation.navigate('Main', {
          screen: 'CategoriesDetails',
        })
      }
    >
      <Text
        className={`font-semibold text-sm ${
          category.active ? 'text-white' : 'text-gray-700'
        }`}
      >
        {category.name}
      </Text>
    </AnimatedPressable>
  );
});

CategoryButton.displayName = 'CategoryButton';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigation>();

  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-20);
  
  const greetingOpacity = useSharedValue(0);
  const greetingTranslateY = useSharedValue(30);
  
  const searchBarOpacity = useSharedValue(0);
  const searchBarScale = useSharedValue(0.95);
  
  const categoriesOpacity = useSharedValue(0);
  const categoriesTranslateX = useSharedValue(-30);
  
  const restaurantsHeaderOpacity = useSharedValue(0);
  const restaurantsHeaderTranslateY = useSharedValue(20);

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

  useEffect(() => {
    headerOpacity.value = withDelay(100, withTiming(1, { duration: 600 }));
    headerTranslateY.value = withDelay(100, withSpring(0, { damping: 15, stiffness: 100 }));

    greetingOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    greetingTranslateY.value = withDelay(300, withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }));

    searchBarOpacity.value = withDelay(500, withTiming(1, { duration: 500 }));
    searchBarScale.value = withDelay(500, withSpring(1, { damping: 15, stiffness: 120 }));

    categoriesOpacity.value = withDelay(700, withTiming(1, { duration: 600 }));
    categoriesTranslateX.value = withDelay(700, withSpring(0, { damping: 15, stiffness: 100 }));

    restaurantsHeaderOpacity.value = withDelay(900, withTiming(1, { duration: 600 }));
    restaurantsHeaderTranslateY.value = withDelay(900, withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }));
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }), []);

  const greetingStyle = useAnimatedStyle(() => ({
    opacity: greetingOpacity.value,
    transform: [{ translateY: greetingTranslateY.value }],
  }), []);

  const searchBarStyle = useAnimatedStyle(() => ({
    opacity: searchBarOpacity.value,
    transform: [{ scale: searchBarScale.value }],
  }), []);

  const categoriesStyle = useAnimatedStyle(() => ({
    opacity: categoriesOpacity.value,
    transform: [{ translateX: categoriesTranslateX.value }],
  }), []);

  const restaurantsHeaderStyle = useAnimatedStyle(() => ({
    opacity: restaurantsHeaderOpacity.value,
    transform: [{ translateY: restaurantsHeaderTranslateY.value }],
  }), []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Animated Header */}
      <AnimatedView style={headerStyle} className="bg-white border-b border-gray-100">
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
      </AnimatedView>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Animated Greeting */}
        <AnimatedView style={greetingStyle} className="px-5 pt-6 pb-5">
          <Text className="text-gray-900 text-[20px] font-normal leading-7">
            Hey Halal, <Text className="font-bold text-gray-900">Good Afternoon!</Text>
          </Text>
        </AnimatedView>

        {/* Animated Search Bar */}
        <AnimatedView style={searchBarStyle} className='px-5'>
          <SearchBar />
        </AnimatedView>

        {/* Animated Categories Section */}
        <AnimatedView style={categoriesStyle} className="mb-8">
          <View className="px-5">
            <HStack className="justify-between items-center mb-5">
              <Heading className="text-gray-900 font-bold">
                All Categories
              </Heading>
              <TouchableOpacity
                className="flex-row items-center active:opacity-60"
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Main', {
                  screen: 'AllCategories',
                })}
              >
                <Text className="text-gray-500 text-sm font-medium mr-1">See All</Text>
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
              <CategoryButton key={category.id} category={category} index={index} />
            ))}
          </ScrollView>
        </AnimatedView>

        {/* Animated Restaurants Section */}
        <View className="px-5">
          <AnimatedView style={restaurantsHeaderStyle}>
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
          </AnimatedView>

          {/* Animated Restaurant Cards */}
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;