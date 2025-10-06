import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import {
  ChevronLeft,
  MapPin,
  Phone,
  MessageCircle,
  Check,
  Truck,
  Package,
} from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import MapView, { Circle, MapPressEvent, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { Heading } from "@/components/ui/heading";


// Types
interface OrderItem {
  quantity: number;
  name: string;
}

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  icon: React.ComponentType<any>;
}

interface Courier {
  name: string;
  photo: string;
  rating: number;
}

interface OrderTracking {
  id: string;
  restaurant: string;
  orderDate: string;
  orderTime: string;
  items: OrderItem[];
  estimatedTime: number;
  currentStep: number;
  courier: Courier;
  steps: TrackingStep[];
}

// Navigation types
type RootStackParamList = {
  Home: undefined;
  Orders: undefined;
  OrderTracking: { orderId: string };
};

type OrderTrackingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OrderTracking"
>;

const OrderTrackingScreen: React.FC = () => {
  const navigation = useNavigation<OrderTrackingScreenNavigationProp>();
  const [trackingData] = useState<OrderTracking>({
    id: "1",
    restaurant: "Uttora Coffee House",
    orderDate: "06 Sept",
    orderTime: "10:00pm",
    items: [
      { quantity: 2, name: "Burger" },
      { quantity: 4, name: "Sanwich" },
    ],
    estimatedTime: 20,
    currentStep: 1,
    courier: {
      name: "Robert F.",
      photo: "https://avatar.iran.liara.run/public/27",
      rating: 4.8,
    },
    steps: [
      {
        id: "1",
        title: "Your order has been received",
        description: "We have received your order",
        status: "completed",
        icon: Check,
      },
      {
        id: "2",
        title: "The restaurant is preparing your food",
        description: "Your food is being prepared",
        status: "current",
        icon: Package,
      },
      {
        id: "3",
        title: "Your order has been picked up for delivery",
        description: "Driver is on the way",
        status: "pending",
        icon: Truck,
      },
      {
        id: "4",
        title: "Order arriving soon!",
        description: "Almost there",
        status: "pending",
        icon: MapPin,
      },
    ],
  });


  const handleCallCourier = (): void => {
    console.log("Calling courier");
  };

  const handleMessageCourier = (): void => {
    console.log("Messaging courier");
  };

  const TrackingStep: React.FC<{ step: TrackingStep; isLast: boolean }> = ({ step, isLast }) => {
    const IconComponent = step.icon;
    const isCompleted = step.status === "completed";
    const isCurrent = step.status === "current";

    return (
      <View className="flex-row items-start">
        {/* Timeline Icon */}
        <View className="items-center mr-4">
          <View
            className={`w-6 h-6 rounded-full items-center justify-center ${isCompleted || isCurrent
? "bg-orange-500"
: "bg-gray-300"
              }`}
          >
            <IconComponent
              size={12}
              color="white"
              strokeWidth={2.5}
            />
          </View>
          {!isLast && (
            <View
              className={`w-0.5 h-8 mt-2 ${isCompleted
? "bg-orange-500"
: "bg-gray-200"
                }`}
            />
          )}
        </View>

        {/* Step Content */}
        <View className="flex-1 pb-6">
          <Text
            className={`text-sm font-medium mb-1 ${isCompleted || isCurrent
? "text-orange-500"
: "text-gray-400"
              }`}
          >
            {step.title}
          </Text>
          <Text className="text-gray-500 text-xs">
            {step.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Map Section */}
      <View className="flex-1 relative">
        {/* Map Background */}
        <View className="flex-1 bg-slate-300">
          <MapView provider={Platform.OS === "android"
            ? PROVIDER_GOOGLE
            : PROVIDER_DEFAULT}
            style={{ width: "100%", height: "100%" }} />
        </View>

        {/* Floating Header */}
        <View className="absolute top-16 left-0 right-0 px-6 z-50">
          <TouchableOpacity
            className="w-12 h-12 bg-black/80 backdrop-blur-xl rounded-full items-center justify-center shadow-xl active:scale-95 z-10"
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <ChevronLeft size={22} color="white" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="text-black/80 text-lg font-semibold text-center -mt-8">
            Track Order
          </Text>
        </View>
      </View>

      {/* Bottom Sheet */}
      <View className="bg-white rounded-t-3xl px-6 pt-6 pb-8 shadow-2xl">
        {/* Restaurant Info */}
        <HStack className="items-center mb-6">
          <View className="w-12 h-12 bg-slate-400 rounded-xl mr-4" />
          <VStack className="flex-1">
            <Text className="text-gray-900 text-lg font-semibold mb-1">
              {trackingData.restaurant}
            </Text>
            <Text className="text-gray-500 text-sm">
              Orderd At {trackingData.orderDate}, {trackingData.orderTime}
            </Text>
            <HStack className="mt-2">
              {trackingData.items.map((item, index) => (
                <Text key={index} className="text-gray-600 text-sm mr-4">
                  {item.quantity}x {item.name}
                </Text>
              ))}
            </HStack>
          </VStack>
        </HStack>

        {/* Estimated Time */}
        <View className="bg-gray-50 rounded-2xl p-4 mb-6">
          <Heading className="text-gray-900 text-2xl font-bold text-center mb-1">
            {trackingData.estimatedTime} min
          </Heading>
          <Text className="text-gray-500 text-sm text-center uppercase tracking-wide">
            Estimated Delivery Time
          </Text>
        </View>

        {/* Tracking Steps */}
        <View className="mb-6">
          {trackingData.steps.map((step, index) => (
            <TrackingStep
              key={step.id}
              step={step}
              isLast={index === trackingData.steps.length - 1}
            />
          ))}
        </View>

        {/* Courier Info */}
        <View className="bg-gray-50 rounded-2xl p-4">
          <HStack className="items-center justify-between">
            <HStack className="items-center flex-1">
              <Image
                source={{ uri: trackingData.courier.photo }}
                className="w-12 h-12 rounded-full mr-4"
                resizeMode="cover"
              />
              <VStack>
                <Text className="text-gray-900 text-base font-semibold">
                  {trackingData.courier.name}
                </Text>
                <Text className="text-gray-500 text-sm">
                  Courier
                </Text>
              </VStack>
            </HStack>

            <HStack className="gap-3">
              <TouchableOpacity
                className="w-12 h-12 bg-orange-500 rounded-full items-center justify-center shadow-lg active:scale-95"
                onPress={handleCallCourier}
                activeOpacity={0.8}
              >
                <Phone size={18} color="white" strokeWidth={2.5} />
              </TouchableOpacity>

              <TouchableOpacity
                className="w-12 h-12 bg-orange-500 rounded-full items-center justify-center shadow-lg active:scale-95"
                onPress={handleMessageCourier}
                activeOpacity={0.8}
              >
                <MessageCircle size={18} color="white" strokeWidth={2.5} />
              </TouchableOpacity>
            </HStack>
          </HStack>
        </View>
      </View>
    </View>
  );
};

export default OrderTrackingScreen;