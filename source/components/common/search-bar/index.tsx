import React from "react";
import { View } from "react-native";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "lucide-react-native";

const SearchBar = () => {
    return (
        <View className="mb-4">
        <View className="relative">
          <Input
            size="xl"
            className="bg-gray-100/70 rounded-2xl  text-gray-900  font-medium border border-gray-200/50"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.03,
              shadowRadius: 3,
              elevation: 1,
            }}
          >
            <InputSlot className="pl-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField placeholder="Search dishes, restaurants" placeholderTextColor="#9ca3af" className='text-md' />
          </Input>
        </View>
      </View>
    );
};

export default SearchBar;
