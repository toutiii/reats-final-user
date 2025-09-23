import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { Pizza, UtensilsCrossed, Fish, CakeSlice } from "lucide-react-native";
import { Colors } from "@/theme/theme";

const categories = [
  { id: "1", name: "Pizza", icon: (props: any) => <Pizza {...props} /> },
  { id: "2", name: "Burgers", icon: (props: any) => <UtensilsCrossed {...props} /> },
  { id: "3", name: "Sushi", icon: (props: any) => <Fish {...props} /> },
  { id: "4", name: "Dessert", icon: (props: any) => <CakeSlice {...props} /> },
];

const CategoryCard = ({ item, selected, onPress }: any) => {
  const isSelected = selected === item.id;
  return (
    <Pressable onPress={onPress} className="items-center mr-lg">
      <View
        className={`w-16 h-16 rounded-full justify-center items-center ${
          isSelected ? "bg-primary" : "bg-background"
        }`}
      >
        {item.icon({ color: isSelected ? Colors.surface : Colors.text, size: 28 })}
      </View>
      <Text className="mt-sm font-medium text-text text-sm">{item.name}</Text>
    </Pressable>
  );
};

const CategoryScroller = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  return (
    <View>
      <Text className="font-bold text-xl text-text mb-md">Categories</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryCard
            item={item}
            selected={selectedCategory}
            onPress={() => setSelectedCategory(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryScroller;
