import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    View,
    Image,
} from "react-native";
import {
    ChevronLeft,
    Star,
    Filter,
    Edit3,
    Trash2,
    Plus
} from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Types
interface UserReview {
    id: string;
    restaurantId: string;
    restaurantName: string;
    restaurantImage: string;
    rating: number;
    date: string;
    comment: string;
    photos?: string[];
    orderItems: string[];
    restaurantReply?: {
        date: string;
        message: string;
    };
    isEditable: boolean;
}

interface ReviewStats {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: { [key: number]: number };
}

type RootStackParamList = {
    UserReviews: undefined;
    WriteReview: { restaurantId: string };
    EditReview: { reviewId: string };
};

type MyReviewsScreenNavigationProp = {
    navigation: StackNavigationProp<RootStackParamList, 'UserReviews'>;
    route: RouteProp<RootStackParamList, 'UserReviews'>;
};

const MyReviewsScreen: React.FC<MyReviewsScreenNavigationProp> = ({ navigation }) => {
    const [selectedFilter, setSelectedFilter] = useState<'all' | number>('all');
    const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'restaurant'>('recent');

    // Données des avis de l'utilisateur
    const reviewStats: ReviewStats = {
        totalReviews: 12,
        averageRating: 4.3,
        ratingDistribution: {
            5: 6,
            4: 4,
            3: 1,
            2: 1,
            1: 0
        }
    };

    const myReviews: UserReview[] = [
        {
            id: '1',
            restaurantId: 'rest1',
            restaurantName: 'Chez Pierre',
            restaurantImage: 'https://avatar.iran.liara.run/public/4',
            rating: 5,
            date: '2024-01-15',
            comment: 'Excellent restaurant ! La qualité des plats est exceptionnelle et le service très rapide. Je recommande vivement le boeuf bourguignon, un délice absolu.',
            photos: [
                'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop'
            ],
            orderItems: ['Boeuf Bourguignon', 'Tarte Tatin'],
            restaurantReply: {
                date: '2024-01-16',
                message: 'Merci beaucoup pour ce superbe avis ! Nous sommes ravis que vous ayez apprécié votre expérience chez nous.'
            },
            isEditable: true
        },
        {
            id: '2',
            restaurantId: 'rest2',
            restaurantName: 'Sushi Tokyo',
            restaurantImage: 'https://avatar.iran.liara.run/public/4',
            rating: 4,
            date: '2024-01-10',
            comment: 'Très bon restaurant japonais. Les sushis sont frais et délicieux. Service un peu lent mais la qualité est au rendez-vous.',
            orderItems: ['Plateau Sushi', 'Miso'],
            isEditable: true
        },
        {
            id: '3',
            restaurantId: 'rest3',
            restaurantName: 'Pizza Corner',
            restaurantImage: 'https://avatar.iran.liara.run/public/4',
            rating: 5,
            date: '2024-01-08',
            comment: 'Les meilleures pizzas de la ville ! Pâte fine et croustillante, ingrédients de qualité. Livraison rapide.',
            photos: [
                'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop'
            ],
            orderItems: ['Pizza Margherita', 'Pizza 4 Fromages'],
            isEditable: true
        },
        {
            id: '4',
            restaurantId: 'rest4',
            restaurantName: 'Green Bowl',
            restaurantImage: 'https://avatar.iran.liara.run/public/4',
            rating: 4,
            date: '2024-01-05',
            comment: 'Super concept de bowls santé ! Ingrédients frais et savoureux. Parfait pour un déjeuner équilibré.',
            orderItems: ['Buddha Bowl', 'Smoothie Detox'],
            isEditable: true
        },
        {
            id: '5',
            restaurantId: 'rest5',
            restaurantName: 'Le Bistrot',
            restaurantImage: 'https://avatar.iran.liara.run/public/4',
            rating: 3,
            date: '2024-01-02',
            comment: 'Correct mais sans plus. L\'ambiance est sympa mais les plats manquent un peu de saveur pour le prix.',
            orderItems: ['Entrecôte', 'Gratin Dauphinois'],
            isEditable: true
        }
    ];

    // Filtrer les avis selon le filtre sélectionné
    const filteredReviews = myReviews.filter(review => {
        if (selectedFilter === 'all') return true;
        return review.rating === selectedFilter;
    });

    // Trier les avis
    const sortedReviews = [...filteredReviews].sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'restaurant':
                return a.restaurantName.localeCompare(b.restaurantName);
            case 'recent':
            default:
                return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleDeleteReview = (reviewId: string, restaurantName: string) => {
        // Logique de suppression d'avis
        console.log(`Supprimer l'avis ${reviewId} pour ${restaurantName}`);
    };

    const handleEditReview = (reviewId: string) => {
        navigation.navigate('EditReview', { reviewId });
    };

    const RatingStars: React.FC<{ rating: number; size?: number }> = ({ rating, size = 14 }) => (
        <HStack className="items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    color="#F59E0B"
                    fill={star <= rating ? "#F59E0B" : "transparent"}
                    strokeWidth={1.5}
                />
            ))}
        </HStack>
    );

    const FilterButton: React.FC<{
        filter: 'all' | number;
        label: string;
        count: number;
        isActive: boolean;
    }> = ({ filter, label, count, isActive }) => (
        <TouchableOpacity
            className={`px-4 py-2 rounded-2xl border-[1.5px] mr-3 ${isActive
                    ? 'bg-orange-500 border-orange-500'
                    : 'bg-white border-gray-200'
                }`}
            onPress={() => setSelectedFilter(filter)}
            activeOpacity={0.8}
        >
            <HStack className="items-center gap-1.5">
                <Text className={`text-[14px] font-semibold ${isActive ? 'text-white' : 'text-gray-700'
                    }`}>
                {label}
                </Text>
                <View className={`px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                    <Text className={`text-[11px] font-bold ${isActive ? 'text-white' : 'text-gray-600'
                        }`}>
                        {count}
                    </Text>
                </View>
            </HStack>
        </TouchableOpacity>
    );

    const MyReviewCard: React.FC<{ review: UserReview }> = ({ review }) => (
        <View
            className="bg-white rounded-3xl p-5 mb-4"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
                elevation: 3,
            }}
        >
            <VStack className="gap-4">
                {/* Restaurant Header */}
                <HStack className="justify-between items-start">
                    <HStack className="items-center flex-1">
                        <Image
                            source={{ uri: review.restaurantImage }}
                            className="w-12 h-12 rounded-2xl mr-3"
                        />
                        <VStack className="flex-1">
                            <Text className="text-gray-900 text-[16px] font-bold">
                                {review.restaurantName}
                            </Text>
                            <Text className="text-gray-500 text-[13px]">
                                {formatDate(review.date)}
                            </Text>
                        </VStack>
                    </HStack>

                    <HStack className="gap-2">
                        <TouchableOpacity
                            className="w-8 h-8 items-center justify-center rounded-full bg-blue-50 active:bg-blue-100"
                            onPress={() => handleEditReview(review.id)}
                            activeOpacity={0.7}
                        >
                            <Edit3 size={14} color="#3B82F6" strokeWidth={2} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="w-8 h-8 items-center justify-center rounded-full bg-red-50 active:bg-red-100"
                            onPress={() => handleDeleteReview(review.id, review.restaurantName)}
                            activeOpacity={0.7}
                        >
                            <Trash2 size={14} color="#EF4444" strokeWidth={2} />
                        </TouchableOpacity>
                    </HStack>
                </HStack>

                {/* Ma Note */}
                <VStack className="gap-2">
                    <RatingStars rating={review.rating} size={16} />

                    <Text className="text-gray-500 text-[13px]">
                        Commande: {review.orderItems.join(', ')}
                    </Text>
                </VStack>

                {/* Mon Commentaire */}
                <Text className="text-gray-700 text-[15px] leading-6">
                    {review.comment}
                </Text>

                {/* Mes Photos */}
                {review.photos && review.photos.length > 0 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="flex-row -mx-1"
                    >
                        {review.photos.map((photo, index) => (
                            <TouchableOpacity
                                key={index}
                                className="mx-1"
                                activeOpacity={0.8}
                            >
                                <Image
                                    source={{ uri: photo }}
                                    className="w-24 h-24 rounded-xl"
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}

                {/* Réponse du restaurant */}
                {review.restaurantReply && (
                    <View className="bg-orange-50 rounded-2xl p-4 mt-2">
                        <HStack className="items-center mb-2">
                            <View className="w-8 h-8 bg-orange-500 rounded-full items-center justify-center mr-3">
                                <Text className="text-white text-[12px] font-bold">
                                    {review.restaurantName.charAt(0)}
                                </Text>
                            </View>
                            <VStack>
                                <Text className="text-orange-700 text-[14px] font-semibold">
                                    {review.restaurantName}
                                </Text>
                                <Text className="text-orange-600 text-[11px]">
                                    {formatDate(review.restaurantReply.date)}
                                </Text>
                            </VStack>
                        </HStack>
                        <Text className="text-orange-700 text-[14px] leading-5">
                            {review.restaurantReply.message}
                        </Text>
                    </View>
                )}
            </VStack>
        </View>
    );

    const StatsHeader: React.FC = () => (
        <View
            className="bg-white rounded-3xl p-6 mb-6"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
                elevation: 3,
            }}
        >
            <VStack className="gap-4">
                {/* Mes Statistiques */}
                <HStack className="items-center justify-between">
                    <VStack>
                        <HStack className="items-center gap-2">
                            <Text className="text-gray-900 text-[32px] font-bold">
                                {reviewStats.averageRating}
                            </Text>
                            <RatingStars rating={Math.floor(reviewStats.averageRating)} size={18} />
                        </HStack>
                        <Text className="text-gray-600 text-[14px]">
                            Ma note moyenne • {reviewStats.totalReviews} avis
                        </Text>
                    </VStack>

                    <TouchableOpacity
                        className="bg-orange-500 rounded-2xl px-4 py-3 active:bg-orange-600"
                        onPress={() => navigation.navigate('WriteReview', { restaurantId: 'new' })}
                        activeOpacity={0.8}
                    >
                        <HStack className="items-center">
                            <Plus size={16} color="#FFFFFF" strokeWidth={2} />
                            <Text className="text-white text-[14px] font-semibold ml-2">
                                Nouvel avis
                            </Text>
                        </HStack>
                    </TouchableOpacity>
                </HStack>

                {/* Distribution de mes notes */}
                <VStack className="gap-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviewStats.ratingDistribution[rating] || 0;
                        const percentage = reviewStats.totalReviews > 0 ? (count / reviewStats.totalReviews) * 100 : 0;

                        return (
                            <HStack key={rating} className="items-center gap-3">
                                <Text className="text-gray-600 text-[13px] w-3">
                                    {rating}
                                </Text>
                                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                                <View className="flex-1 bg-gray-200 rounded-full h-2">
                                    <View
                                        className="bg-orange-500 h-2 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </View>
                                <Text className="text-gray-600 text-[13px] w-8 text-right">
                                    {count}
                                </Text>
                            </HStack>
                        );
                    })}
                </VStack>
            </VStack>
        </View>
    );

    const EmptyState: React.FC = () => (
        <View className="flex-1 items-center justify-center py-16">
            <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                <Star size={28} color="#6B7280" strokeWidth={1.5} />
            </View>
            <Text className="text-gray-900 text-[18px] font-bold mb-2 text-center">
                Aucun avis pour le moment
            </Text>
            <Text className="text-gray-500 text-[14px] text-center mb-6">
                Commandez dans vos restaurants préférés et partagez votre expérience
            </Text>
            <TouchableOpacity
                className="bg-orange-500 rounded-2xl px-6 py-3 active:bg-orange-600"
                onPress={() => navigation.navigate('WriteReview', { restaurantId: 'new' })}
                activeOpacity={0.8}
            >
                <HStack className="items-center">
                    <Plus size={16} color="#FFFFFF" strokeWidth={2} />
                    <Text className="text-white text-[14px] font-semibold ml-2">
                        Écrire mon premier avis
                    </Text>
                </HStack>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

            {/* Header */}
            <View className="bg-white border-b border-gray-100">
                <HStack className="justify-between items-center px-5 py-4">
                    <TouchableOpacity
                        className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}
                    >
                        <ChevronLeft size={22} color="#1f2937" strokeWidth={1.8} />
                    </TouchableOpacity>

                    <Heading className="text-gray-900 font-bold flex-1 text-center">
                        Mes Avis
                    </Heading>

                    <TouchableOpacity
                        className="w-10 h-10 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
                        activeOpacity={0.7}
                    >
                        <Filter size={20} color="#1f2937" strokeWidth={1.8} />
                    </TouchableOpacity>
                </HStack>
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {myReviews.length > 0 ? (
                    <View className="px-5 pt-6">
                        {/* Stats Header */}
                        <StatsHeader />

                        {/* Filtres */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="mb-6"
                            contentContainerStyle={{ paddingRight: 20 }}
                        >
                            <FilterButton
                                filter="all"
                                label="Tous"
                                count={reviewStats.totalReviews}
                                isActive={selectedFilter === 'all'}
                            />
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <FilterButton
                                    key={rating}
                                    filter={rating}
                                    label={`${rating} ⭐`}
                                    count={reviewStats.ratingDistribution[rating] || 0}
                                    isActive={selectedFilter === rating}
                                />
                            ))}
                        </ScrollView>

                        {/* Tri */}
                        <HStack className="justify-between items-center mb-6">
                            <Text className="text-gray-700 text-[15px] font-medium">
                                {sortedReviews.length} avis trouvés
                            </Text>
                            <HStack className="gap-2">
                                {(['recent', 'rating', 'restaurant'] as const).map((sort) => (
                                    <TouchableOpacity
                                        key={sort}
                                        className={`px-3 py-2 rounded-xl ${sortBy === sort ? 'bg-orange-100' : 'bg-gray-100'
                                            }`}
                                        onPress={() => setSortBy(sort)}
                                        activeOpacity={0.8}
                                    >
                                        <Text className={`text-[12px] font-medium ${sortBy === sort ? 'text-orange-600' : 'text-gray-600'
                                            }`}>
                                            {sort === 'recent' ? 'Récents' :
                                                sort === 'rating' ? 'Notes' : 'Restaurant'}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </HStack>
                        </HStack>

                        {/* Liste de mes avis */}
                        {sortedReviews.map((review) => (
                            <MyReviewCard key={review.id} review={review} />
                        ))}
                    </View>
                ) : (
                    <EmptyState />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default MyReviewsScreen;