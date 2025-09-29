import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  ChevronLeft,
  Plus,
  Minus,
  X,
  ShoppingCart,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Types
type RootStackParamList = {
  FoodDetails: undefined;
  Cart: { paddingBottom?: boolean };
  Order: undefined;
};

type CartScreenNavigationProp = {
  navigation: StackNavigationProp<RootStackParamList, 'Cart'>;
  route: RouteProp<RootStackParamList, 'Cart'>;
};

interface CartItem {
  id: number;
  name: string;
  subtitle: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: CartItem;
}

// Empty Cart
const EmptyCartComponent: React.FC<{ onBackPress: () => void }> = ({ onBackPress }) => (
  <View className="flex-1 items-center justify-center px-8">
    <VStack className="items-center space-y-6">
      {/* Icon */}
      <View className="w-24 h-24 rounded-full bg-slate-600/20 items-center justify-center mb-4">
        <ShoppingCart size={40} color="#94A3B8" strokeWidth={1.5} />
      </View>
      
      {/* Text Content */}
      <VStack className="items-center space-y-3">
        <Text className="text-white text-[22px] font-semibold text-center">
          Your cart is empty
        </Text>
        <Text className="text-slate-400 text-[16px] text-center leading-relaxed max-w-sm">
          Looks like you haven't added anything to your cart yet. Start browsing to find something delicious!
        </Text>
      </VStack>
      
      {/* Action Button */}
      <Button 
        size="lg"
        className="rounded-full mt-8 min-w-48"
        onPress={onBackPress}
      >
        <ButtonText>
          Start Shopping
        </ButtonText>
      </Button>
    </VStack>
  </View>
);

const CartScreen: React.FC<CartScreenNavigationProp> = ({ route, navigation }) => {
  const paddingBottom = route.params?.paddingBottom ? false : true;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Pizza Calzone',
      subtitle: 'European',
      size: '14"',
      price: 64,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=150&fit=crop',
    },
    {
      id: 2,
      name: 'Pizza Calzone',
      subtitle: 'European', 
      size: '14"',
      price: 32,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=150&fit=crop',
      },
  ]);

  const updateQuantity = (id: number, change: number): void => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number): void => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const totalAmount: number = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isCartEmpty = cartItems.length === 0;

  const CartItemComponent: React.FC<CartItemProps> = ({ item }) => (
    <View className="border-b border-slate-600/30">
      <View className="py-6">
        <HStack className="items-start space-x-4 gap-4">
          {/* Product Image */}
          <View className="w-20 h-16 bg-slate-600/80 rounded-xl shadow-sm" >
            <Image
              source={{ uri: item.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Product Info */}
          <TouchableOpacity 
            className='flex-1 space-y-1' 
            onPress={() => navigation.navigate('FoodDetails')}
          >
            <VStack className="flex-1 space-y-1">
              <Text className="text-white text-[16px] font-medium leading-tight">
                {item.name}
              </Text>
              <Text className="text-white/90 text-[14px] font-normal">
                {item.subtitle}
              </Text>
              <Text className="text-white text-[16px] font-semibold mt-2">
                ${item.price}
              </Text>
              <Text className="text-slate-400 text-[13px] font-medium">
                {item.size}
              </Text>
            </VStack>
          </TouchableOpacity>

          {/* Actions */}
          <VStack className="items-end space-y-4">
            {/* Remove Button */}
            {isEditMode && (
              <TouchableOpacity
                className="w-6 h-6 rounded-full bg-red-500 items-center mb-4 justify-center shadow-md active:scale-95"
                onPress={() => removeItem(item.id)}
                activeOpacity={0.8}
              >
                <X size={14} color="#FFFFFF" strokeWidth={2.5} />
              </TouchableOpacity>
            )}

            {/* Quantity Controls */}
            <HStack className="items-center space-x-3">
              <TouchableOpacity
                className="w-8 h-8 rounded-full bg-slate-600/60 border border-slate-500/40 items-center justify-center active:bg-slate-500/60"
                onPress={() => updateQuantity(item.id, -1)}
                activeOpacity={0.8}
              >
                <Minus size={14} color="#FFFFFF" strokeWidth={2.5} />
              </TouchableOpacity>
              
              <Text className="text-white text-[16px] font-semibold min-w-6 text-center">
                {item.quantity}
              </Text>
              
              <TouchableOpacity
                className="w-8 h-8 rounded-full bg-slate-600/60 border border-slate-500/40 items-center justify-center active:bg-slate-500/60"
                onPress={() => updateQuantity(item.id, 1)}
                activeOpacity={0.8}
              >
                <Plus size={14} color="#FFFFFF" strokeWidth={2.5} />
              </TouchableOpacity>
            </HStack>
          </VStack>
        </HStack>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-700 pt-16">
      {/* Header */}
      <View className="bg-slate-700 border-b border-slate-600/20">
        <View className="px-6 py-4">
          <HStack className="items-center justify-between">
            <TouchableOpacity 
              className="w-10 h-10 items-center justify-center rounded-xl active:bg-slate-600/30"
              activeOpacity={0.8}
              onPress={() => navigation.goBack()} 
            >
              <ChevronLeft size={22} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
            
            <Text className="text-white text-[18px] font-medium">
              {isEditMode ? 'Edit Cart' : 'My Cart'}
            </Text>
            
            {!isCartEmpty && (
              <TouchableOpacity 
                className="px-3 py-1.5 rounded-lg active:bg-slate-600/30"
                onPress={() => setIsEditMode(!isEditMode)}
                activeOpacity={0.8}
              >
                <Text className="text-orange-500 text-[12px] font-semibold tracking-[1.2px]">
                  {isEditMode ? 'DONE' : 'EDIT ITEMS'}
                </Text>
              </TouchableOpacity>
            )}
          
            {isCartEmpty && <View className="w-10" />}
          </HStack>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1">
        {isCartEmpty ? (
          <EmptyCartComponent onBackPress={() => navigation.goBack()} />
        ) : (
          <>
            <ScrollView 
              className="flex-1"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {/* Cart Items */}
              <View className="px-6">
                {cartItems.map((item: CartItem) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </View>

              {/* Spacer for better scrolling */}
              <View className="flex-1 min-h-20" />
            </ScrollView>

            {/* Bottom Section */}
            <View className={`bg-white shadow-2xl ${paddingBottom ? 'mb-20' : 'mb-0'} rounded-t-3xl overflow-hidden`}>
              {/* Delivery Address */}
              <View className="bg-gray-50 px-6 py-5 border-b border-gray-100">
                <HStack className="items-center justify-between mb-3">
                  <Text className="text-gray-500 text-[11px] font-bold tracking-[1.5px] uppercase">
                    Delivery Address
                  </Text>
                  <TouchableOpacity 
                    className="px-2 py-1 rounded-md active:bg-gray-200"
                    activeOpacity={0.8}
                  >
                    <Text className="text-orange-500 text-[11px] font-bold tracking-[1.5px] uppercase">
                      Edit
                    </Text>
                  </TouchableOpacity>
                </HStack>
                <Text className="text-slate-700 text-[14px] font-medium leading-relaxed">
                  2118 Thornridge Cir, Syracuse
                </Text>
              </View>

              {/* Total Section */}
              <View className="bg-white px-6 py-6">
                <HStack className="items-center justify-between mb-6">
                  <Text className="text-slate-700 text-[15px] font-bold tracking-[1.2px] uppercase">
                    Total
                  </Text>
                  <Text className="text-slate-700 text-[24px] font-semibold">
                    ${totalAmount}
                  </Text>
                </HStack>
                
                <Button 
                  size="lg"
                  className="rounded-full"
                  onPress={() => navigation.navigate('Order')}
                >
                  <ButtonText>
                    Place Order
                  </ButtonText>
                </Button>
              </View>

              {/* Safe Area Bottom */}
              <View className="h-6 bg-white" />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default CartScreen;