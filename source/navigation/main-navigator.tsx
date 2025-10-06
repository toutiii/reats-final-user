import { createStackNavigator } from "@react-navigation/stack";
import CategoriesDetailsScreen from "@/screens/main/categories-details";
import FoodDetailsScreen from "@/screens/main/food-details";
import TabsNavigator from "./tabs-navigator";
import { MainStackParamList } from "@/types/navigation";
import RestaurantDetailsScreen from "@/screens/main/restaurant-details";
import CartScreen from "@/screens/main/cart";
import OrderScreen from "@/screens/main/order";
import OrderTrackingScreen from "@/screens/main/order-tracking";
import NotificationsScreen from "@/screens/main/notifications";
import PersonalInfoScreen from "@/screens/main/personal-info";
import AddressesScreen from "@/screens/main/addresses";
import FavouritesScreen from "@/screens/main/favourites";
import PaymentMethodsScreen from "@/screens/main/payment-methods";
import FAQsScreen from "@/screens/main/faqs";
import UserReviewsScreen from "@/screens/main/user-reviews";
import SettingsScreen from "@/screens/main/settings";
import SearchScreen from "@/screens/main/search";
import AllCategoriesScreen from "@/screens/main/all-categories";
import AllRestaurantsScreen from "@/screens/main/all-restaurants";

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      <Stack.Screen
        name="CategoriesDetails"
        component={CategoriesDetailsScreen}
      />
      <Stack.Screen
        name="FoodDetails"
        component={FoodDetailsScreen}
      />
      <Stack.Screen
        name="RestaurantDetails"
        component={RestaurantDetailsScreen}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
      />
      <Stack.Screen
        name="AllCategories"
        component={AllCategoriesScreen}
      />
      <Stack.Screen
        name="AllRestaurants"
        component={AllRestaurantsScreen}
      />
      <Stack.Screen
        name="Order"
        component={OrderScreen}
      />
      <Stack.Screen
        name="OrderTracking"
        component={OrderTrackingScreen}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />

      <Stack.Screen
        name='PersonalInfo'
        component={PersonalInfoScreen}
      />

      <Stack.Screen
        name='Addresses'
        component={AddressesScreen}
      />

      <Stack.Screen
        name='Favourites'
        component={FavouritesScreen}
      />

     <Stack.Screen
        name='PaymentMethods'
        component={PaymentMethodsScreen}
      />

      <Stack.Screen
        name='FAQs'
        component={FAQsScreen}
      />

      <Stack.Screen
        name='UserReviews'
        component={UserReviewsScreen}
      />

      <Stack.Screen
        name='Settings'
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
