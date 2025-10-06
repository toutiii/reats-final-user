import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { HStack } from '@/components/ui/hstack';
import { Star, Clock, Award, TrendingUp, Flame, MapPin } from 'lucide-react-native';
import { StackNavigation } from '@/types/navigation';
import { Restaurant } from '@/types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
    const navigation = useNavigation<StackNavigation>();
    return (
      <TouchableOpacity
      className="mb-5 active:scale-[0.98]"
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Main', {screen: 'RestaurantDetails'})}
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
          <View className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {(restaurant.isNew || restaurant.isFeatured || restaurant.isTrending) && (
            <View className="absolute top-3 left-3">
              {restaurant.isFeatured && (
                <View className="bg-orange-500 px-3 py-1.5 rounded-full mb-2 flex-row items-center">
                  <Award size={12} color="white" strokeWidth={2} />
                  <Text className="text-white text-xs font-bold ml-1">FEATURED</Text>
                </View>
              )}
              {restaurant.isTrending && (
                <View className="bg-amber-500 px-3 py-1.5 rounded-full mb-2 flex-row items-center">
                  <TrendingUp size={12} color="white" strokeWidth={2} />
                  <Text className="text-white text-xs font-bold ml-1">TRENDING</Text>
                </View>
              )}
              {restaurant.isNew && (
                <View className="bg-emerald-500 px-3 py-1.5 rounded-full flex-row items-center">
                  <Flame size={12} color="white" strokeWidth={2} />
                  <Text className="text-white text-xs font-bold ml-1">NEW</Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View className="p-5">
          <Text className="text-gray-900 text-lg font-bold mb-1.5 leading-6">
            {restaurant.name}
          </Text>
          <Text className="text-gray-500 text-sm font-medium mb-4 leading-5">
            {restaurant.cuisine}
          </Text>

          <HStack className="items-center flex-wrap">
            <View className="bg-amber-50 rounded-full px-3 py-1.5 mr-2 mb-2">
              <HStack className="items-center">
                <Star size={13} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
                <Text className="text-amber-700 font-bold ml-1.5 text-sm">
                  {restaurant.rating}
                </Text>
              </HStack>
            </View>

            <View 
              className={`${restaurant.deliveryFee === 'Free' ? 'bg-emerald-50' : 'bg-orange-50'} px-3 py-1.5 rounded-full mr-2 mb-2`}
            >
              <Text 
                className={`${restaurant.deliveryFee === 'Free' ? 'text-emerald-600' : 'text-orange-600'} text-sm font-bold`}
              >
                {restaurant.deliveryFee}
              </Text>
            </View>

            <View className="bg-gray-50 rounded-full px-3 py-1.5 mr-2 mb-2">
              <HStack className="items-center">
                <Clock size={12} color="#6b7280" strokeWidth={1.8} />
                <Text className="text-gray-600 text-sm font-semibold ml-1.5">
                  {restaurant.deliveryTime}
                </Text>
              </HStack>
            </View>

            <View className="bg-gray-50 rounded-full px-3 py-1.5 mb-2">
              <HStack className="items-center">
                <MapPin size={12} color="#6b7280" strokeWidth={1.8} />
                <Text className="text-gray-600 text-sm font-semibold ml-1.5">
                  {restaurant.distance}
                </Text>
              </HStack>
            </View>
          </HStack>
        </View>
      </View>
    </TouchableOpacity>
    )
}

  export default RestaurantCard;