import { View, Text, Image, Pressable } from "react-native";
import { Star, Clock } from "lucide-react-native";
import { Colors } from "@/theme/theme";

const RestaurantCard = ({ item, onPress }: { item: any; onPress: () => void }) => {
  return (
    <Pressable onPress={onPress} className="mb-lg overflow-hidden">
      <Image
        source={{ uri: item.imageUrl }}
        className="w-full h-48 rounded-lg bg-background"
      />

      {item.promotion && (
        <View className="absolute top-3 left-3 bg-primary rounded-full px-sm py-xs">
          <Text className="text-surface font-bold text-xs">{item.promotion}</Text>
        </View>
      )}

      {/* Restaurant Info */}
      <View className="mt-sm">
        <Text className="font-bold text-lg text-text">{item.name}</Text>
        <View className="flex-row items-center mt-xs">
          {/* Rating */}
          <Star color={Colors.primary} size={16} fill={Colors.primary} />
          <Text className="font-semiBold text-text ml-xs">{item.rating}</Text>
          <Text className="text-textSecondary ml-sm">({item.reviews} reviews)</Text>
          
          <View className="mx-sm h-1 w-1 bg-textSecondary rounded-full" />

          {/* Delivery Time */}
          <Clock color={Colors.textSecondary} size={16} />
          <Text className="text-textSecondary ml-xs">{item.deliveryTime}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantCard;
