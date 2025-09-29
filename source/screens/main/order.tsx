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
  MoreHorizontal,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';

// Types
interface Order {
  id: string;
  restaurant: string;
  price: number;
  itemCount: number;
  orderNumber: string;
  status: 'ongoing' | 'completed' | 'canceled';
  date?: string;
}

type TabType = 'ongoing' | 'history';

// Navigation types
type RootStackParamList = {
  Home: undefined;
  Orders: undefined;
  OrderTracking: { orderId: string };
};

type OrderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Orders'
>;

const OrderScreen: React.FC = () => {
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<TabType>('ongoing');

  const orders: Order[] = [
    {
      id: '1',
      restaurant: 'Pizza Hut',
      price: 35.25,
      itemCount: 3,
      orderNumber: '#162432',
      status: 'ongoing',
    },
    {
      id: '2',
      restaurant: 'McDonald',
      price: 40.15,
      itemCount: 2,
      orderNumber: '#242432',
      status: 'ongoing',
    },
    {
      id: '3',
      restaurant: 'Starbucks',
      price: 10.20,
      itemCount: 1,
      orderNumber: '#240112',
      status: 'ongoing',
    },
    {
      id: '4',
      restaurant: 'Pizza Hut',
      price: 35.25,
      itemCount: 3,
      orderNumber: '#162432',
      status: 'completed',
      date: '29 JAN, 12:30',
    },
    {
      id: '5',
      restaurant: 'McDonald',
      price: 40.15,
      itemCount: 2,
      orderNumber: '#242432',
      status: 'completed',
      date: '30 JAN, 12:30',
    },
    {
      id: '6',
      restaurant: 'Starbucks',
      price: 10.20,
      itemCount: 1,
      orderNumber: '#240112',
      status: 'canceled',
      date: '30 JAN, 12:30',
    },
  ];

  const handleTrackOrder = (orderId: string): void => {
    navigation.navigate('OrderTracking', { orderId });
  };

  const handleCancelOrder = (orderId: string): void => {
    console.log('Cancel order:', orderId);
  };

  const handleRateOrder = (orderId: string): void => {
    console.log('Rate order:', orderId);
  };

  const handleReOrder = (orderId: string): void => {
    console.log('Re-order:', orderId);
  };

  const filteredOrders = orders.filter(order => 
    activeTab === 'ongoing' ? order.status === 'ongoing' : order.status !== 'ongoing'
  );

  const TabButton: React.FC<{ tab: TabType; title: string }> = ({ tab, title }) => (
    <TouchableOpacity
      className="flex-1 pb-4"
      onPress={() => setActiveTab(tab)}
      activeOpacity={0.8}
    >
      <Heading
        className={`text-center text-base font-medium ${
          activeTab === tab ? 'text-orange-500' : 'text-gray-400'
        }`}
      >
        {title}
      </Heading>
      {activeTab === tab && (
        <View className="absolute bottom-0 left-8 right-8 h-1 bg-orange-500 rounded-full" />
      )}
    </TouchableOpacity>
  );

  const OrderCard: React.FC<{ order: Order; isLast?: boolean }> = ({ order, isLast }) => (
    <View className={`${isLast ? '' : 'border-b border-gray-100'} pb-6 ${isLast ? '' : 'mb-6'}`}>
      <HStack className="items-start gap-4">
        {/* Restaurant Image */}
        <View className="w-14 h-14 bg-slate-400 rounded-xl" />

        {/* Order Details */}
        <VStack className="flex-1">
          <HStack className="items-start justify-between mb-2">
            <Text className="text-gray-900 text-base font-semibold">
              {order.restaurant}
            </Text>
            <Text className="text-gray-400 text-sm">
              {order.orderNumber}
            </Text>
          </HStack>

          <HStack className="items-center mb-4">
            <Text className="text-gray-900 text-base font-semibold">
              ${order.price.toFixed(2)}
            </Text>
            {activeTab === 'history' && order.date && (
              <>
                <Text className="text-gray-400 text-sm mx-4">
                  {order.date}
                </Text>
                <View className="w-1 h-1 bg-gray-400 rounded-full" />
              </>
            )}
            <Text className="text-gray-400 text-sm ml-2">
              {order.itemCount.toString().padStart(2, '0')} Items
            </Text>
          </HStack>

          {/* Status for History */}
          {activeTab === 'history' && (
            <Text 
              className={`text-sm font-medium mb-4 ${
                order.status === 'completed' ? 'text-teal-600' : 'text-red-500'
              }`}
            >
              {order.status === 'completed' ? 'Completed' : 'Canceled'}
            </Text>
          )}

          {/* Action Buttons */}
          <HStack className="gap-3">
            {activeTab === 'ongoing' ? (
              <>
                <Button
                  className="flex-1 rounded-xl"
                  onPress={() => handleTrackOrder(order.id)}
                >
                  <ButtonText>
                    Track Order
                  </ButtonText>
                </Button>
                <Button
                  className="flex-1 rounded-xl"
                  variant="outline"
                  onPress={() => handleCancelOrder(order.id)}
                >
                  <ButtonText>
                    Cancel
                  </ButtonText>
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="flex-1 rounded-xl"
                  onPress={() => handleRateOrder(order.id)}
                >
                  <ButtonText>
                    Rate
                  </ButtonText>
                </Button>
                <Button
                  className="flex-1 rounded-xl"
                  onPress={() => handleReOrder(order.id)}
                  variant="outline"
                >
                  <ButtonText>
                    Re-Order
                  </ButtonText>
                </Button>
              </>
            )}
          </HStack>
        </VStack>
      </HStack>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white">
        <HStack className="items-center justify-between px-5 py-4">
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ChevronLeft size={20} color="#1f2937" strokeWidth={2} />
          </TouchableOpacity>

          <Text className="text-gray-900 text-lg font-medium">
            My Orders
          </Text>

          <TouchableOpacity
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            activeOpacity={0.7}
          >
            <MoreHorizontal size={20} color="#1f2937" strokeWidth={2} />
          </TouchableOpacity>
        </HStack>

        {/* Tab Navigation */}
        <View className="px-6 border-b border-gray-100">
          <HStack className="relative">
            <TabButton tab="ongoing" title="Ongoing" />
            <TabButton tab="history" title="History" />
          </HStack>
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
      >
        {/* Category Labels */}
        {activeTab === 'ongoing' && (
          <View className="pt-6 px-6">
            <Heading className="text-gray-900 text-lg font-medium mb-4">Food</Heading>
            <OrderCard order={filteredOrders[0]} />
            <Heading className="text-gray-900 text-lg font-medium mb-4 mt-4">Drink</Heading>
            <OrderCard order={filteredOrders[1]} />
            <OrderCard order={filteredOrders[2]} isLast />
          </View>
        )}

        {activeTab === 'history' && (
          <View className="pt-6 px-6">
            <HStack className="items-center justify-between mb-4">
              <Heading className="text-gray-900 text-lg font-medium">Food</Heading>
              <Text className="text-teal-600 text-sm font-medium">Completed</Text>
            </HStack>
            <OrderCard order={filteredOrders[0]} />
            
            <HStack className="items-center justify-between mb-4 mt-8">
              <Heading className="text-gray-900 text-lg font-medium">Drink</Heading>
              <Text className="text-teal-600 text-sm font-medium">Completed</Text>
            </HStack>
            <OrderCard order={filteredOrders[1]} />
            
            <HStack className="items-center justify-between mb-4 mt-8">
              <Heading className="text-gray-900 text-lg font-medium">Drink</Heading>
              <Text className="text-red-500 text-sm font-medium">Canceled</Text>
            </HStack>
            <OrderCard order={filteredOrders[2]} isLast />
          </View>
        )}

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;