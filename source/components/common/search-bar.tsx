// /source/components/common/search-bar.tsx
import { View, TextInput } from "react-native";
import { Search } from "lucide-react-native";
import { Colors } from "@/theme/theme";

const SearchBar = () => {
  return (
    <View className="flex-row items-center bg-background p-md rounded-lg border border-border">
      <Search color={Colors.textSecondary} size={20} />
      <TextInput
        placeholder="Find restaurants or dishes..."
        placeholderTextColor={Colors.textSecondary}
        className="flex-1 ml-sm text-md font-regular text-text"
      />
    </View>
  );
};

export default SearchBar;
