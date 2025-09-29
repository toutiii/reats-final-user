import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import {
  ChevronLeft,
  MoreHorizontal,
  User,
  MapPin,
  Heart,
  Bell,
  CreditCard,
  HelpCircle,
  Star,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Types
interface MenuItem {
  id: number;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  link?: string;
}

// Navigation types
type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  PersonalInfo: undefined;
  Addresses: undefined;
  Cart: undefined;
  Favourites: undefined;
  Notifications: undefined;
  PaymentMethods: undefined;
  FAQs: undefined;
  UserReviews: undefined;
  Settings: undefined;
  Login: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = (): void => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => console.log('Logout Pressed'),
        },
      ],
    );
  };

  const menuItems: MenuItem[] = [
    { id: 1, title: 'Personal Info', icon: User, color: '#F97316', link: 'PersonalInfo' },
    { id: 2, title: 'Addresses', icon: MapPin, color: '#3B82F6', link: 'Addresses' },
    { id: 4, title: 'Favourite', icon: Heart, color: '#A855F7', link: 'Favourites' },
    { id: 5, title: 'Notifications', icon: Bell, color: '#EAB308', link: 'Notifications' },
    { id: 6, title: 'Payment Method', icon: CreditCard, color: '#3B82F6', link: 'PaymentMethods' },
    { id: 7, title: 'FAQs', icon: HelpCircle, color: '#F97316', link: 'FAQs' },
    { id: 8, title: 'User Reviews', icon: Star, color: '#3B82F6', link: 'UserReviews' },
    { id: 9, title: 'Settings', icon: Settings, color: '#3B82F6', link: 'Settings' },
    { id: 10, title: 'Log Out', icon: LogOut, color: '#EF4444', link: 'logout' },
  ];

  const handleMenuItemPress = (item: MenuItem): void => {
    if (item.link === 'logout') {
      handleLogout();
    } else if (item.link) {
      navigation.navigate(item.link as keyof RootStackParamList);
    }
  };


  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View className="bg-white border-b border-gray-100">
        <HStack className="justify-between items-center px-6 py-4">
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            activeOpacity={0.7}
          >
            <ChevronLeft size={20} color="#1f2937" strokeWidth={2} />
          </TouchableOpacity>

          <Heading className="text-gray-900 text-lg font-bold">
            Profile
          </Heading>

          <TouchableOpacity
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            activeOpacity={0.7}
          >
            <MoreHorizontal size={20} color="#1f2937" strokeWidth={2} />
          </TouchableOpacity>
        </HStack>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Section */}
        <View className="px-6 pt-8 mb-8">
          <HStack className="bg-white rounded-2xl p-6 items-center gap-4">
            <View className="mb-4">
              <Avatar size="xl" className="bg-orange-200">
                <AvatarImage
                  source={{
                    uri: "https://avatar.iran.liara.run/public/28",
                  }}
                />
                <AvatarFallbackText className="text-orange-600 text-2xl font-bold">
                  VK
                </AvatarFallbackText>
              </Avatar>
            </View>

            <VStack>
              <Text className="text-gray-900 text-xl font-bold mb-1">
                Vishal Khadok
              </Text>
              <Text className="text-gray-500 text-sm font-medium">
                I love fast food
              </Text>
            </VStack>
          </HStack>
        </View>

        {/* Menu Items */}
        <VStack className="px-6">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className="bg-white rounded-2xl p-4 mb-3 active:bg-gray-50"
              activeOpacity={0.8}
              onPress={() => handleMenuItemPress(item)}
            >
              <HStack className="items-center justify-between">
                <HStack className="items-center flex-1">
                  <View className="w-10 h-10 rounded-xl items-center justify-center mr-4 bg-gray-50">
                    <item.icon size={18} color={item.color} strokeWidth={2} />
                  </View>
                  <Text className="text-gray-900 text-base font-semibold">
                    {item.title}
                  </Text>
                </HStack>
                <ChevronRight size={18} color="#9CA3AF" strokeWidth={2} />
              </HStack>
            </TouchableOpacity>
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;