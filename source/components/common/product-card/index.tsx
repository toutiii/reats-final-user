import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '@/types/navigation';
import { Product } from '@/types/product';


interface CardProps {
    product: Product;
}

const ProductCard: React.FC<CardProps> = ({ product }) => {
    const navigation = useNavigation<StackNavigation>();
    return (
        <TouchableOpacity className="w-[48%] mb-6" onPress={() => navigation.navigate('Main', { screen: 'FoodDetails' })}>
            <View className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                {/* Image Container */}
                <View className="h-32 bg-gray-200 relative overflow-hidden">
                    <Image
                        source={{ uri: product.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    {/* Placeholder for image */}
                    <View className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                </View>

                {/* Content */}
                <View className="p-4">
                    <Text className="text-gray-900 font-semibold mb-1 leading-tight">
                        {product.name}
                    </Text>
                    <Text className="text-gray-500 text-sm font-medium mb-3">
                        {product.restaurant}
                    </Text>

                    <HStack className="items-center justify-between">
                        <Text className="text-gray-900 text-md font-bold">
                            ${product.price}
                        </Text>

                        <TouchableOpacity
                            className="w-8 h-8 bg-orange-500 rounded-full items-center justify-center shadow-lg active:scale-95"
                            activeOpacity={0.8}
                        >
                            <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
                        </TouchableOpacity>
                    </HStack>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard;