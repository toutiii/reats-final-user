import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import {
  Heart,
  Star,
  Clock,
  MapPin,
  HeartOff,
  ChevronLeft,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import SearchBar from '@/components/common/search-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Types
interface FavoriteItem {
  id: string;
  type: 'restaurant' | 'product';
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  distance: string;
  price?: string;
  originalPrice?: string;
  category: string;
  isPromoted?: boolean;
}

type RootStackParamList = {
  FoodDetails: undefined;
  RestaurantDetails: undefined;
  Favourites: undefined;
};

type FavouritesScreenNavigationProp = {
  navigation: StackNavigationProp<RootStackParamList, 'Favourites'>;
  route: RouteProp<RootStackParamList, 'Favourites'>;

};


const FavouritesScreen: React.FC<FavouritesScreenNavigationProp> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'restaurants' | 'products'>('all');

  // Mock data
  const mockFavorites: FavoriteItem[] = [
    {
      id: '1',
      type: 'restaurant',
      name: 'Chez Pierre',
      description: 'Cuisine française authentique • Bistrot',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop',
      rating: 4.8,
      reviewCount: 124,
      deliveryTime: '25-35',
      distance: '1.2 km',
      category: 'Français',
      isPromoted: true,
    },
    {
      id: '2',
      type: 'product',
      name: 'Pizza Margherita',
      description: 'Tomate, mozzarella, basilic frais',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
      rating: 4.6,
      reviewCount: 89,
      deliveryTime: '15-25',
      distance: '0.8 km',
      price: '12,90 €',
      originalPrice: '15,90 €',
      category: 'Pizza',
    },
    {
      id: '3',
      type: 'restaurant',
      name: 'Sushi Tokyo',
      description: 'Sushi frais • Cuisine japonaise',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop',
      rating: 4.9,
      reviewCount: 203,
      deliveryTime: '30-40',
      distance: '2.1 km',
      category: 'Japonais',
    },
    {
      id: '4',
      type: 'product',
      name: 'Burger Classique',
      description: 'Bœuf, cheddar, salade, tomate, oignons',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop',
      rating: 4.4,
      reviewCount: 156,
      deliveryTime: '20-30',
      distance: '1.5 km',
      price: '9,50 €',
      category: 'Burger',
    },
    {
      id: '5',
      type: 'restaurant',
      name: 'Green Bowl',
      description: 'Bowls santé • Végétarien • Bio',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
      rating: 4.7,
      reviewCount: 92,
      deliveryTime: '20-30',
      distance: '0.9 km',
      category: 'Santé',
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setFavorites(mockFavorites);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'restaurants' && item.type === 'restaurant') ||
                         (activeFilter === 'products' && item.type === 'product');
    
    return matchesSearch && matchesFilter;
  });

  const handleRemoveFavorite = (itemId: string, itemName: string) => {
    Alert.alert(
      'Retirer des favoris',
      `Voulez-vous retirer "${itemName}" de vos favoris ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Retirer',
          style: 'destructive',
          onPress: () => {
            setFavorites(prev => prev.filter(item => item.id !== itemId));
          },
        },
      ]
    );
  };

  const handleItemPress = (item: FavoriteItem) => {
    if (item.type === 'restaurant') {
      navigation.navigate('RestaurantDetails');
    } else {
      navigation.navigate('FoodDetails');
    }
  };

  const FilterButton: React.FC<{
    filter: 'all' | 'restaurants' | 'products';
    label: string;
    count: number;
  }> = ({ filter, label, count }) => {
    const isActive = activeFilter === filter;
    
    return (
      <TouchableOpacity
        className={`px-4 py-2.5 rounded-2xl border-[1.5px] ${
          isActive 
            ? 'bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/25' 
            : 'bg-white border-gray-200'
        }`}
        onPress={() => setActiveFilter(filter)}
        activeOpacity={0.8}
      >
        <HStack className="items-center gap-1.5">
          <Text className={`text-[14px] font-semibold ${
            isActive ? 'text-white' : 'text-gray-700'
          }`}>
            {label}
          </Text>
          <View className={`px-1.5 py-0.5 rounded-md ${
            isActive ? 'bg-white/20' : 'bg-gray-100'
          }`}>
            <Text className={`text-[11px] font-bold ${
              isActive ? 'text-white' : 'text-gray-600'
            }`}>
              {count}
            </Text>
          </View>
        </HStack>
      </TouchableOpacity>
    );
  };

  const FavoriteCard: React.FC<{ item: FavoriteItem }> = ({ item }) => (
    <TouchableOpacity
      className="mb-5 active:scale-[0.98]"
      activeOpacity={0.9}
      onPress={() => handleItemPress(item)}
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
        {/* Image Container */}
        <View className="h-44 bg-gray-200 relative overflow-hidden">
          <Image
            source={{ uri: item.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          
          {/* Promoted Badge */}
          {item.isPromoted && (
            <View className="absolute top-3 left-3 bg-orange-500 px-2.5 py-1 rounded-lg shadow-lg shadow-orange-500/30">
              <Text className="text-white text-[11px] font-bold">
                SPONSORISÉ
              </Text>
            </View>
          )}
          
          {/* Heart Button */}
          <TouchableOpacity
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full items-center justify-center shadow-lg active:scale-90"
            onPress={() => handleRemoveFavorite(item.id, item.name)}
            activeOpacity={0.8}
          >
            <Heart size={16} color="#EF4444" fill="#EF4444" strokeWidth={2} />
          </TouchableOpacity>
          
          <View className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </View>

        {/* Card Content */}
        <View className="p-5">
          <HStack className="justify-between items-start mb-1.5">
            <Text className="text-gray-900 text-lg font-bold leading-6 flex-1 mr-3">
              {item.name}
            </Text>
            {item.price && (
              <VStack className="items-end">
                <Text className="text-orange-500 text-[16px] font-bold">
                  {item.price}
                </Text>
                {item.originalPrice && (
                  <Text className="text-gray-400 text-[13px] line-through">
                    {item.originalPrice}
                  </Text>
                )}
              </VStack>
            )}
          </HStack>
          
          <Text className="text-gray-500 text-[13px] font-medium mb-3 leading-5">
            {item.description}
          </Text>
          
          {/* Category Badge */}
          <View className="bg-gray-100 self-start px-3 py-1 rounded-full mb-4">
            <Text className="text-gray-700 text-[12px] font-medium">
              {item.category}
            </Text>
          </View>

          {/* Stats Row */}
          <HStack className="items-center justify-between">
            <HStack className="items-center">
              {/* Rating */}
              <View className="bg-amber-50 rounded-full px-3 py-1.5 mr-3">
                <HStack className="items-center">
                  <Star size={13} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
                  <Text className="text-amber-700 font-bold ml-1.5 text-sm">
                    {item.rating}
                  </Text>
                </HStack>
              </View>

              {/* Delivery Time */}
              <View className="bg-gray-50 rounded-full px-3 py-1.5 mr-3">
                <HStack className="items-center">
                  <Clock size={12} color="#6b7280" strokeWidth={1.8} />
                  <Text className="text-gray-600 text-sm font-semibold ml-1.5">
                    {item.deliveryTime} min
                  </Text>
                </HStack>
              </View>
            </HStack>
            
            {/* Distance */}
            <View className="bg-orange-50 px-3 py-1.5 rounded-full">
              <HStack className="items-center">
                <MapPin size={12} color="#EA580C" strokeWidth={1.8} />
                <Text className="text-orange-600 text-sm font-semibold ml-1.5">
                  {item.distance}
                </Text>
              </HStack>
            </View>
          </HStack>
        </View>
      </View>
    </TouchableOpacity>
  );

  const EmptyState: React.FC = () => (
    <View className="flex-1 items-center justify-center px-8 py-12">
      <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-6">
        <HeartOff size={32} color="#6b7280" strokeWidth={1.5} />
      </View>
      
      <Heading className="text-gray-900 font-bold mb-3 text-center">
        Aucun favori trouvé
      </Heading>
      
      <Text className="text-gray-500 text-[15px] text-center leading-6">
        {searchQuery 
          ? `Aucun résultat pour "${searchQuery}". Essayez un autre terme de recherche.`
          : 'Vous n\'avez pas encore ajouté de favoris. Explorez nos restaurants et produits !'
        }
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-[16px]">Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View className="bg-white border-b border-gray-100">
        <VStack className="px-5 py-4 gap-4">
          <HStack className="justify-between items-center mb-2">
          <TouchableOpacity
            className="w-10 h-10 bg-white/95 backdrop-blur-xl rounded-2xl items-center justify-center shadow-xl border border-white/20 active:scale-95"
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
            }}
          >
            <ChevronLeft size={22} color="#1f2937" strokeWidth={2.5} />
          </TouchableOpacity>
            <Heading className="text-gray-900 font-bold">
              Mes Favoris
            </Heading>
            <View className="bg-orange-100 px-3 py-1.5 rounded-lg">
              <Text className="text-orange-600 text-[13px] font-bold">
                {favorites.length}
              </Text>
            </View>
          </HStack>

          {/* Search Bar */}
          <View className="relative">
           <SearchBar />  
          </View>

          {/* Filter Buttons */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
            className="flex-row -mx-1"
          >
            <View className="px-1">
              <FilterButton 
                filter="all" 
                label="Tous" 
                count={favorites.length} 
              />
            </View>
            <View className="px-1">
              <FilterButton 
                filter="restaurants" 
                label="Restaurants" 
                count={favorites.filter(item => item.type === 'restaurant').length} 
              />
            </View>
            <View className="px-1">
              <FilterButton 
                filter="products" 
                label="Produits" 
                count={favorites.filter(item => item.type === 'product').length} 
              />
            </View>
          </ScrollView>
        </VStack>
      </View>

      {/* Content */}
      {filteredFavorites.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="px-5 pt-6">
            {filteredFavorites.map((item) => (
              <FavoriteCard key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default FavouritesScreen;