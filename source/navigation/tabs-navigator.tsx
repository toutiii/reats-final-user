import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import CartScreen from "@/screens/main/cart";
import HomeScreen from "@/screens/main/home";
import ProfileScreen from "@/screens/main/profile";
import SearchScreen from "@/screens/main/search";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParamList } from "@/types/navigation";
import {
  Home,
  Search,
  ShoppingCart,
} from "lucide-react-native";
import React from "react";
import { View, Platform } from "react-native";

const Tab = createBottomTabNavigator<TabParamList>();

export const TabsNavigator = () => {
  const activeColor = "#F97316";
  const inactiveColor = "#9CA3AF";
  const bgColor = "#FFFFFF";
  const borderColor = "#F3F4F6";

  const getTabIcon = (routeName: string, color: string, focused: boolean) => {
    const iconSize = 22;
    const strokeWidth = focused
? 2.2
: 1.8;

    switch (routeName) {
      case "Home":
        return (
          <View className={`items-center justify-center ${focused
? "scale-110"
: ""}`}>
            <Home
              size={iconSize}
              color={color}
              strokeWidth={strokeWidth}
              fill={focused
? color
: "transparent"}
            />
          </View>
        );

      case "Search":
        return (
          <View className={`items-center justify-center ${focused
? "scale-110"
: ""}`}>
            <Search
              size={iconSize}
              color={color}
              strokeWidth={strokeWidth}
            />
          </View>
        );

      case "Cart":
        return (
          <View className={`items-center justify-center ${focused
? "scale-110"
: ""}`}>
            <ShoppingCart
              size={iconSize}
              color={color}
              strokeWidth={strokeWidth}
            />
          </View>
        );

      case "Profile":
        return (
          <View className={`items-center justify-center ${focused
? "scale-110"
: ""}`}>
            <View
              className={`rounded-full ${focused
? "ring-2 ring-orange-500 ring-offset-2"
: ""}`}
            >
              <Avatar size="sm" className="w-8 h-8">
                <AvatarFallbackText className="text-xs">JD</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://avatar.iran.liara.run/public/28",
                  }}
                />
                {focused && (
                  <AvatarBadge className="bg-orange-500 border-white border-2" />
                )}
              </Avatar>
            </View>
          </View>
        );

      default:
        return <Home size={iconSize} color={color} strokeWidth={strokeWidth} />;
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: bgColor,
          paddingVertical: Platform.OS === "ios"
? 12
: 8,
          paddingHorizontal: 16,
          borderTopWidth: 1,
          borderTopColor: borderColor,
          height: Platform.OS === "ios"
? 85
: 70,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 8,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "Montserrat_600SemiBold",
          paddingBottom: Platform.OS === "ios"
? 0
: 4,
          marginTop: 4,
          textTransform: "capitalize",
        },
        tabBarItemStyle: {
          paddingVertical: 6,
          borderRadius: 16,
          marginHorizontal: 4,
        },
        tabBarIcon: ({ color, focused }) => {
          return getTabIcon(route.name, color, focused);
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Accueil",
          tabBarAccessibilityLabel: "Écran d'accueil"
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Recherche",
          tabBarAccessibilityLabel: "Rechercher des restaurants"
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarAccessibilityLabel: "Cart"
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profil",
          tabBarAccessibilityLabel: "Mon profil"
        }}
      />

    </Tab.Navigator>
  );
};

export default TabsNavigator;