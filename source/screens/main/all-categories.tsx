import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  ChevronLeft,
  Pizza,
  Coffee,
  Salad,
  IceCream,
  Beef,
  Fish,
  Cookie,
  Soup,
  Sandwich,
  Cherry,
  Croissant,
  Wine,
  Search,
  Sparkles,
  Star,
  Grid3x3,
  LayoutGrid,
  X,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '@/types/navigation';

interface Category {
  id: number;
  name: string;
  icon: any;
  count: number;
  color: string;
  bgColor: string;
  popular?: boolean;
  new?: boolean;
}

const AllCategoriesScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: Category[] = [
    { id: 1, name: 'Pizza', icon: Pizza, count: 24, color: '#f97316', bgColor: '#fff7ed', popular: true },
    { id: 2, name: 'Burgers', icon: Beef, count: 18, color: '#ef4444', bgColor: '#fef2f2' },
    { id: 3, name: 'Sushi', icon: Fish, count: 32, color: '#06b6d4', bgColor: '#ecfeff', popular: true },
    { id: 4, name: 'Pasta', icon: Soup, count: 15, color: '#eab308', bgColor: '#fefce8', new: true },
    { id: 5, name: 'Salads', icon: Salad, count: 21, color: '#22c55e', bgColor: '#f0fdf4' },
    { id: 6, name: 'Desserts', icon: IceCream, count: 28, color: '#ec4899', bgColor: '#fdf2f8', popular: true },
    { id: 7, name: 'Drinks', icon: Coffee, count: 19, color: '#8b5cf6', bgColor: '#faf5ff' },
    { id: 8, name: 'Sandwiches', icon: Sandwich, count: 16, color: '#f59e0b', bgColor: '#fffbeb' },
    { id: 9, name: 'Bakery', icon: Croissant, count: 22, color: '#d97706', bgColor: '#fef3c7', new: true },
    { id: 10, name: 'Snacks', icon: Cookie, count: 25, color: '#84cc16', bgColor: '#f7fee7' },
    { id: 11, name: 'Fruits', icon: Cherry, count: 14, color: '#f43f5e', bgColor: '#fff1f2' },
    { id: 12, name: 'Wine', icon: Wine, count: 12, color: '#7c3aed', bgColor: '#f5f3ff' },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularCount = categories.filter(c => c.popular).length;
  const totalDishes = categories.reduce((sum, cat) => sum + cat.count, 0);

  const GridCategoryCard: React.FC<{ category: Category }> = ({ category }) => {
    const IconComponent = category.icon;

    return (
      <TouchableOpacity
        className="flex-1 m-2 active:scale-95"
        onPress={() => {
            navigation.navigate('Main', {
              screen: 'CategoriesDetails',
            });
          }}
        activeOpacity={0.9}
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
          {(category.popular || category.new) && (
            <View className="absolute top-3 right-3 z-10">
              {category.popular && (
                <View className="bg-amber-50 px-2.5 py-1 rounded-full mb-1.5 flex-row items-center">
                  <Star size={10} fill="#f59e0b" color="#f59e0b" strokeWidth={0} />
                  <Text className="text-amber-700 text-xs font-bold ml-1">HOT</Text>
                </View>
              )}
              {category.new && (
                <View className="bg-emerald-50 px-2.5 py-1 rounded-full">
                  <Text className="text-emerald-700 text-xs font-bold">NEW</Text>
                </View>
              )}
            </View>
          )}

          <VStack className="items-center pt-8 pb-6 px-4">
            <View 
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: category.bgColor }}
            >
              <IconComponent size={36} color={category.color} strokeWidth={1.8} />
            </View>
            
            <VStack className="items-center">
              <Text className="text-gray-900 font-bold text-center mb-2">
                {category.name}
              </Text>
              
              <View 
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: category.bgColor }}
              >
                <Text className="text-sm font-semibold" style={{ color: category.color }}>
                  {category.count} dishes
                </Text>
              </View>
            </VStack>
          </VStack>

          <View 
            className="h-1 w-full"
            style={{ backgroundColor: category.color }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const ListCategoryCard: React.FC<{ category: Category }> = ({ category }) => {
    const IconComponent = category.icon;

    return (
      <TouchableOpacity
        className="mb-3 bg-white rounded-2xl active:scale-[0.98]"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 2,
        }}
        onPress={() => navigation.navigate('Main', { 
          screen: 'CategoriesDetails',
        })}
        activeOpacity={0.9}
      >
        <View className="p-4">
          <HStack className="items-center">
            <View 
              className="w-14 h-14 rounded-2xl items-center justify-center"
              style={{ backgroundColor: category.bgColor }}
            >
              <IconComponent size={28} color={category.color} strokeWidth={1.8} />
            </View>
            
            <VStack className="flex-1 ml-4">
              <HStack className="items-center mb-1">
                <Text className="text-gray-900 font-bold">{category.name}</Text>
                {category.popular && (
                  <View className="bg-amber-50 px-2 py-0.5 rounded-full ml-2">
                    <Text className="text-amber-700 text- font-bold">POPULAR</Text>
                  </View>
                )}
                {category.new && (
                  <View className="bg-emerald-50 px-2 py-0.5 rounded-full ml-2">
                    <Text className="text-emerald-700 text- font-bold">NEW</Text>
                  </View>
                )}
              </HStack>
              <Text className="text-gray-500 text-sm font-medium">{category.count} dishes available</Text>
            </VStack>
            
            <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
              <Text className="text-gray-600 text-lg">›</Text>
            </View>
          </HStack>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View className="bg-white border-b border-gray-100">
        <HStack className="justify-between items-center px-5 py-4">
          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            activeOpacity={0.7}
            onPress={() => navigation.goBack()} 
          >
            <ChevronLeft size={22} color="#1f2937" strokeWidth={2} />
          </TouchableOpacity>
          
          <VStack className="items-center">
            <HStack className="items-center">
              <Sparkles size={16} color="#f97316" strokeWidth={2} />
              <Text className="text-gray-900 text-xl font-bold ml-2">All Categories</Text>
            </HStack>
          </VStack>

          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
            activeOpacity={0.7}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? (
              <LayoutGrid size={20} color="#1f2937" strokeWidth={1.8} />
            ) : (
              <Grid3x3 size={20} color="#1f2937" strokeWidth={1.8} />
            )}
          </TouchableOpacity>
        </HStack>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="px-5 pt-6 pb-4">
          <View 
            className="bg-white rounded-2xl p-4 mb-5"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <HStack className="items-center">
              <Search size={20} color="#9ca3af" strokeWidth={2} />
              <TextInput
                className="flex-1 text-gray-900 text-[15px] ml-3"
                placeholder="Search categories..."
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity 
                  onPress={() => setSearchQuery('')}
                  className="w-6 h-6 rounded-full bg-gray-100 items-center justify-center"
                  activeOpacity={0.7}
                >
                  <X size={14} color="#6b7280" strokeWidth={2} />
                </TouchableOpacity>
              )}
            </HStack>
          </View>

          <HStack className="gap-3 mb-6">
            <View 
              className="flex-1 bg-white rounded-2xl p-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <Text className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">
                Categories
              </Text>
              <Text className="text-gray-900 text-xl font-bold">
                {filteredCategories.length}
              </Text>
            </View>
            
            <View 
              className="flex-1 bg-orange-50 rounded-2xl p-4 border border-orange-100"
            >
              <Text className="text-orange-600 text-xs font-semibold uppercase tracking-wider mb-1">
                Total Dishes
              </Text>
              <Text className="text-orange-600 text-lg font-bold">
                {totalDishes}
              </Text>
            </View>

            <View 
              className="flex-1 bg-white rounded-2xl p-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <Text className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                Popular
              </Text>
              <Text className="text-gray-900 text-lg font-bold">
                {popularCount}
              </Text>
            </View>
          </HStack>
        </View>

        {searchQuery && (
          <View className="px-5 pb-3">
            <Text className="text-gray-500 text-sm font-medium">
              Found <Text className="text-gray-900 font-bold">{filteredCategories.length}</Text> results for "{searchQuery}"
            </Text>
          </View>
        )}

        {filteredCategories.length > 0 ? (
          <View className="px-5">
            {viewMode === 'grid' ? (
              <View className="flex-row flex-wrap -mx-2">
                {filteredCategories.map((category) => (
                  <View key={category.id} className="w-1/2">
                    <GridCategoryCard category={category} />
                  </View>
                ))}
              </View>
            ) : (
              <View>
                {filteredCategories.map((category) => (
                  <ListCategoryCard key={category.id} category={category} />
                ))}
              </View>
            )}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center px-8 pt-16">
            <View 
              className="w-20 h-20 rounded-3xl bg-white items-center justify-center mb-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <Search size={32} color="#d1d5db" strokeWidth={1.8} />
            </View>
            
            <VStack className="items-center">
              <Text className="text-gray-900 text-[20px] font-bold text-center mb-2">
                No results found
              </Text>
              <Text className="text-gray-500 text-[14px] text-center leading-5 mb-5 max-w-xs">
                We couldn't find any categories matching "{searchQuery}"
              </Text>
              <TouchableOpacity 
                className="px-6 py-3 rounded-2xl bg-orange-500 active:bg-orange-600"
                style={{
                  shadowColor: '#f97316',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 6,
                }}
                onPress={() => setSearchQuery('')}
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-[14px]">
                  Clear search
                </Text>
              </TouchableOpacity>
            </VStack>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllCategoriesScreen;