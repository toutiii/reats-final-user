import { SafeAreaView, View, Text, FlatList } from "react-native";
import { MapPin } from "lucide-react-native";

import { Colors } from "@/theme/theme";
import SearchBar from "@/components/common/search-bar";
import CategoryScroller from "@/components/home/category-scroller";
import RestaurantCard from "@/components/home/restaurant-card";
import FeaturedRestaurants from "@/components/home/featured-restaurants";

const restaurants = [
  {
    id: "1",
    name: "The Golden Spoon",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop",
    rating: 4.8,
    reviews: 234,
    deliveryTime: "20-30 min",
    promotion: "15% OFF",
  },
  {
    id: "2",
    name: "Crispy Crust Pizzeria",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2670&auto=format&fit=crop",
    rating: 4.6,
    reviews: 189,
    deliveryTime: "25-35 min",
    promotion: null,
  },
  {
    id: "3",
    name: "Sushi Central",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2670&auto=format&fit=crop",
    rating: 4.9,
    reviews: 402,
    deliveryTime: "30-40 min",
    promotion: "Free Delivery",
  },
];

const HomeScreenHeader = () => (
  <>
    <View className="px-lg pt-lg">
      <Text className="font-medium text-textSecondary text-md">Deliver to</Text>
      <View className="flex-row items-center mt-xs">
        <MapPin color={Colors.primary} size={20} />
        <Text className="font-bold text-text text-lg ml-sm">Silicon Valley, CA</Text>
      </View>
    </View>

    <View className="px-lg mt-md">
      <SearchBar />
    </View>
    <View className="px-lg mt-lg">
      <CategoryScroller />
    </View>
    <FeaturedRestaurants />
  </>
);

const HomeScreen = () => {
  const handleRestaurantPress = (restaurantId: string) => {
    console.log("Navigate to restaurant:", restaurantId);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <View className="px-lg">
            <RestaurantCard item={item} onPress={() => handleRestaurantPress(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<HomeScreenHeader />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
