import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  ChevronLeft,
  Bell,
  Package,
  Gift,
  Star,
  Truck,
  CreditCard,
  AlertCircle,
  Check,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Types
interface Notification {
  id: string;
  type: 'order' | 'promotion' | 'review' | 'delivery' | 'payment' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionRequired?: boolean;
}

type NotificationType = 'all' | 'unread';

// Navigation types
type RootStackParamList = {
  Home: undefined;
  Notifications: undefined;
  OrderTracking: { orderId: string };
  Profile: undefined;
};

type NotificationsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Notifications'
>;

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();
  const [filter, setFilter] = useState<NotificationType>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #162432 from Pizza Hut has been confirmed and is being prepared.',
      time: '2 min ago',
      isRead: false,
      actionRequired: false,
    },
    {
      id: '2',
      type: 'delivery',
      title: 'Order On The Way',
      message: 'Your order is on the way! Track your delivery in real-time.',
      time: '15 min ago',
      isRead: false,
      actionRequired: true,
    },
    {
      id: '3',
      type: 'promotion',
      title: 'Special Offer!',
      message: 'Get 30% off on your next order. Limited time offer expires in 2 hours.',
      time: '1 hour ago',
      isRead: true,
    },
    {
      id: '4',
      type: 'review',
      title: 'Rate Your Order',
      message: 'How was your order from McDonald? Your feedback helps us improve.',
      time: '3 hours ago',
      isRead: false,
      actionRequired: true,
    },
    {
      id: '5',
      type: 'payment',
      title: 'Payment Successful',
      message: 'Payment of $35.25 for order #162432 was processed successfully.',
      time: '5 hours ago',
      isRead: true,
    },
    {
      id: '6',
      type: 'system',
      title: 'App Update Available',
      message: 'A new version of the app is available with exciting new features.',
      time: '1 day ago',
      isRead: true,
    },
    {
      id: '7',
      type: 'promotion',
      title: 'Welcome Bonus',
      message: 'Welcome to our app! Enjoy free delivery on your first 3 orders.',
      time: '2 days ago',
      isRead: true,
    },
  ]);

  const handleNotificationPress = (notification: Notification): void => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );

    // Handle navigation based on notification type
    switch (notification.type) {
      case 'order':
      case 'delivery':
        navigation.navigate('OrderTracking', { orderId: notification.id });
        break;
      case 'review':
        // Navigate to review screen
        break;
      case 'promotion':
        // Navigate to offers screen
        break;
      default:
        break;
    }
  };

  const handleMarkAllAsRead = (): void => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return Package;
      case 'delivery':
        return Truck;
      case 'promotion':
        return Gift;
      case 'review':
        return Star;
      case 'payment':
        return CreditCard;
      case 'system':
        return AlertCircle;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: Notification['type']): string => {
    switch (type) {
      case 'order':
        return '#3B82F6';
      case 'delivery':
        return '#10B981';
      case 'promotion':
        return '#F59E0B';
      case 'review':
        return '#8B5CF6';
      case 'payment':
        return '#06B6D4';
      case 'system':
        return '#6B7280';
      default:
        return '#F97316';
    }
  };

  const getIconBgColor = (type: Notification['type']): string => {
    switch (type) {
      case 'order':
        return 'bg-blue-50';
      case 'delivery':
        return 'bg-emerald-50';
      case 'promotion':
        return 'bg-amber-50';
      case 'review':
        return 'bg-purple-50';
      case 'payment':
        return 'bg-cyan-50';
      case 'system':
        return 'bg-gray-50';
      default:
        return 'bg-orange-50';
    }
  };

  const filteredNotifications = notifications.filter(notification =>
    filter === 'all' ? true : !notification.isRead
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const IconComponent = getNotificationIcon(notification.type);
    const iconColor = getIconColor(notification.type);
    const iconBgColor = getIconBgColor(notification.type);

    return (
      <TouchableOpacity
        className={`p-4 border-b border-gray-100 active:bg-gray-50 ${
          !notification.isRead ? 'bg-blue-50/30' : 'bg-white'
        }`}
        onPress={() => handleNotificationPress(notification)}
        activeOpacity={0.7}
      >
        <HStack className="items-start gap-4">
          {/* Icon */}
          <View className={`w-12 h-12 rounded-full ${iconBgColor} items-center justify-center`}>
            <IconComponent size={20} color={iconColor} strokeWidth={2} />
          </View>

          {/* Content */}
          <VStack className="flex-1">
            <HStack className="items-start justify-between mb-1">
              <Text className={`text-base font-semibold flex-1 ${
                !notification.isRead ? 'text-gray-900' : 'text-gray-700'
              }`}>
                {notification.title}
              </Text>
              <Text className="text-gray-400 text-xs ml-2">
                {notification.time}
              </Text>
            </HStack>
            
            <Text className={`text-sm leading-relaxed mb-2 ${
              !notification.isRead ? 'text-gray-700' : 'text-gray-500'
            }`}>
              {notification.message}
            </Text>

            {notification.actionRequired && (
              <View className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 self-start">
                <Text className="text-orange-600 text-xs font-medium">
                  Action Required
                </Text>
              </View>
            )}
          </VStack>

          {/* Unread Indicator */}
          {!notification.isRead && (
            <View className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
          )}
        </HStack>
      </TouchableOpacity>
    );
  };

  const FilterButton: React.FC<{ filterType: NotificationType; title: string; count?: number }> = ({ 
    filterType, 
    title, 
    count 
  }) => (
    <TouchableOpacity
      className={`px-4 py-2 rounded-full border ${
        filter === filterType
          ? 'bg-orange-500 border-orange-500'
          : 'bg-white border-gray-200'
      }`}
      onPress={() => setFilter(filterType)}
      activeOpacity={0.8}
    >
      <HStack className="items-center gap-2">
        <Text
          className={`text-sm font-medium ${
            filter === filterType ? 'text-white' : 'text-gray-700'
          }`}
        >
          {title}
        </Text>
        {count !== undefined && count > 0 && (
          <View className={`w-5 h-5 rounded-full items-center justify-center ${
            filter === filterType ? 'bg-white/20' : 'bg-orange-500'
          }`}>
            <Text className={`text-xs font-bold ${
              filter === filterType ? 'text-white' : 'text-white'
            }`}>
              {count > 9 ? '9+' : count}
            </Text>
          </View>
        )}
      </HStack>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View className="bg-white border-b border-gray-100">
        <HStack className="items-center justify-between px-6 py-4">
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ChevronLeft size={20} color="#1f2937" strokeWidth={2.5} />
          </TouchableOpacity>

          <Text className="text-gray-900 text-lg font-semibold">
            Notifications
          </Text>

          <TouchableOpacity
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            onPress={handleMarkAllAsRead}
            activeOpacity={0.7}
          >
            <Check size={20} color="#1f2937" strokeWidth={2} />
          </TouchableOpacity>
        </HStack>

        {/* Filter Tabs */}
        <View className="px-6 pb-4">
          <HStack className="gap-3">
            <FilterButton
              filterType="all"
              title="All"
              count={notifications.length}
            />
            <FilterButton
              filterType="unread"
              title="Unread"
              count={unreadCount}
            />
          </HStack>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
              <Bell size={32} color="#9CA3AF" strokeWidth={1.5} />
            </View>
            <Text className="text-gray-500 text-base font-medium text-center">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              {filter === 'unread' 
                ? 'All caught up! Check back later for updates.' 
                : 'We\'ll notify you when something important happens.'}
            </Text>
          </View>
        )}

        {/* Bottom Spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;