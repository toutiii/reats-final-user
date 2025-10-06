import type { RouteProp, NavigatorScreenParams } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: { paddingBottom?: boolean };
  Profile: undefined;
};

export type MainStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  CategoriesDetails: undefined;
  FoodDetails: undefined;
  RestaurantDetails: undefined;
  Cart: { paddingBottom: boolean };
  Search: undefined;
  AllRestaurants: undefined;
  AllCategories: undefined;
  Order: undefined;
  OrderTracking: { orderId: string };
  Notifications: undefined;
  PersonalInfo: undefined;
  PaymentMethods: undefined;
  Addresses: undefined;
  Favourites: undefined;
  Settings: undefined;
  FAQs: undefined;
  UserReviews: undefined;
};

export type AuthStackParamList = {
  Auth: NavigatorScreenParams<MainStackParamList>;
  Onboarding: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  LoginForm: undefined;
  SignupForm: undefined;
  OTPScreen: undefined;
};

// Main app stack
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};

// Type pour la navigation avec Stack
export type StackNavigation = StackNavigationProp<RootStackParamList>;

// Types pour les routes spécifiques
export type ScreenNavigationProp<T extends keyof RootStackParamList> = StackNavigationProp<RootStackParamList, T>;

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

// Type pour les props de navigation
export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: ScreenNavigationProp<T>;
  route: ScreenRouteProp<T>;
};