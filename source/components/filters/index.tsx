import {
    Drawer,
    DrawerBackdrop,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    DrawerCloseButton,
} from '@/components/ui/drawer';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon, CloseIcon } from '@/components/ui/icon';
import { FC, Fragment, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SlidersHorizontal, Star } from 'lucide-react-native';

type OfferType = 'Delivery' | 'Pick Up' | 'Offer' | 'Online payment';
type DeliveryTimeType = '10-15 min' | '20 min' | '30 min';
type PricingType = '$' | '$$' | '$$$';
type RatingType = 1 | 2 | 3 | 4 | 5 | null;

interface FilterState {
    offers: OfferType[];
    deliveryTime: DeliveryTimeType;
    pricing: PricingType;
    rating: RatingType;
}

const Filters: FC = () => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [selectedOffers, setSelectedOffers] = useState<OfferType[]>(['Delivery']);
    const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<DeliveryTimeType>('10-15 min');
    const [selectedPricing, setSelectedPricing] = useState<PricingType>('$$');
    const [selectedRating, setSelectedRating] = useState<RatingType>(null);

    const handleFilterPress = (): void => {
        setShowDrawer(true);
    };

    const toggleOffer = (offer: OfferType): void => {
        if (selectedOffers.includes(offer)) {
            setSelectedOffers(selectedOffers.filter(item => item !== offer));
        } else {
            setSelectedOffers([...selectedOffers, offer]);
        }
    };

    const applyFilters = (): void => {
        const filters: FilterState = {
            offers: selectedOffers,
            deliveryTime: selectedDeliveryTime,
            pricing: selectedPricing,
            rating: selectedRating
        };
        
        console.log('Filters applied:', filters);
        setShowDrawer(false);
    };

    const resetFilters = (): void => {
        setSelectedOffers(['Delivery']);
        setSelectedDeliveryTime('10-15 min');
        setSelectedPricing('$$');
        setSelectedRating(null);
    };

    const offers: OfferType[] = ['Delivery', 'Pick Up', 'Offer'];
    const deliveryTimes: DeliveryTimeType[] = ['10-15 min', '20 min', '30 min'];
    const pricingOptions: PricingType[] = ['$', '$$', '$$$'];
    const ratings: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];

    return (
        <Fragment>
            <TouchableOpacity
                className="w-11 h-11 items-center justify-center rounded-xl bg-gray-50 active:bg-gray-100"
                activeOpacity={0.7}
                onPress={handleFilterPress}
            >
                <SlidersHorizontal size={18} color="#1f2937" strokeWidth={2} />
            </TouchableOpacity>
            
            <Drawer
                isOpen={showDrawer}
                size='lg'
                anchor="right"
                onClose={() => {
                    setShowDrawer(false);
                }}
            >
                <DrawerBackdrop />
                <DrawerContent className="h-full">
                    <DrawerHeader className='pt-12 pb-6 border-b border-gray-100'>
                        <Heading size="lg" className="text-gray-900">
                            Filtrer votre recherche
                        </Heading>
                        <DrawerCloseButton className='rounded-full bg-gray-100 active:bg-gray-200 p-3'>
                            <Icon as={CloseIcon} />
                        </DrawerCloseButton>
                    </DrawerHeader>
                    
                    <DrawerBody className="py-6">
                        {/* Section OFFRES */}
                        <View className="mb-8">
                            <Text className="text-xs font-semibold text-gray-500 mb-3 tracking-wider">
                                OFFRES
                            </Text>
                            <View className="flex-row flex-wrap gap-2">
                                {offers.map((offer: OfferType) => (
                                    <TouchableOpacity
                                        key={offer}
                                        onPress={() => toggleOffer(offer)}
                                        className={`px-5 py-3 rounded-full border ${
                                            selectedOffers.includes(offer)
                                                ? 'bg-orange-50 border-orange-500'
                                                : 'bg-white border-gray-200'
                                        }`}
                                    >
                                        <Text className={`text-sm font-medium ${
                                            selectedOffers.includes(offer)
                                                ? 'text-orange-600'
                                                : 'text-gray-700'
                                        }`}>
                                            {offer}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TouchableOpacity
                                onPress={() => toggleOffer('Online payment')}
                                className={`mt-2 px-5 py-3 rounded-full border self-start ${
                                    selectedOffers.includes('Online payment')
                                        ? 'bg-orange-50 border-orange-500'
                                        : 'bg-white border-gray-200'
                                }`}
                            >
                                <Text className={`text-sm font-medium ${
                                    selectedOffers.includes('Online payment')
                                        ? 'text-orange-600'
                                        : 'text-gray-700'
                                }`}>
                                    Paiement en ligne disponible
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Section TEMPS DE LIVRAISON */}
                        <View className="mb-8">
                            <Text className="text-xs font-semibold text-gray-500 mb-3 tracking-wider">
                                TEMPS DE LIVRAISON
                            </Text>
                            <View className="flex-row gap-2">
                                {deliveryTimes.map((time: DeliveryTimeType) => (
                                    <TouchableOpacity
                                        key={time}
                                        onPress={() => setSelectedDeliveryTime(time)}
                                        className={`px-6 py-3 rounded-full ${
                                            selectedDeliveryTime === time
                                                ? 'bg-orange-500'
                                                : 'bg-gray-50'
                                        }`}
                                    >
                                        <Text className={`text-sm font-medium ${
                                            selectedDeliveryTime === time
                                                ? 'text-white'
                                                : 'text-gray-700'
                                        }`}>
                                            {time}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Section PRIX */}
                        <View className="mb-8">
                            <Text className="text-xs font-semibold text-gray-500 mb-3 tracking-wider">
                                PRIX
                            </Text>
                            <View className="flex-row gap-2">
                                {pricingOptions.map((price: PricingType) => (
                                    <TouchableOpacity
                                        key={price}
                                        onPress={() => setSelectedPricing(price)}
                                        className={`w-14 h-14 rounded-full items-center justify-center ${
                                            selectedPricing === price
                                                ? 'bg-orange-500'
                                                : 'bg-gray-50'
                                        }`}
                                    >
                                        <Text className={`text-base font-semibold ${
                                            selectedPricing === price
                                                ? 'text-white'
                                                : 'text-gray-700'
                                        }`}>
                                            {price}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Section ÉVALUATION */}
                        <View className="mb-6">
                            <Text className="text-xs font-semibold text-gray-500 mb-3 tracking-wider">
                                ÉVALUATION
                            </Text>
                            <View className="flex-row gap-2">
                                {ratings.map((rating: 1 | 2 | 3 | 4 | 5) => (
                                    <TouchableOpacity
                                        key={rating}
                                        onPress={() => setSelectedRating(rating)}
                                        className={`w-14 h-14 rounded-full items-center justify-center ${
                                            selectedRating === rating
                                                ? 'bg-orange-50 border-2 border-orange-500'
                                                : 'bg-gray-50'
                                        }`}
                                    >
                                        <Star 
                                            size={20} 
                                            fill={selectedRating === rating ? '#f97316' : '#d1d5db'}
                                            color={selectedRating === rating ? '#f97316' : '#d1d5db'}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </DrawerBody>
                    
                    <DrawerFooter className="border-t border-gray-100 px-6 py-4">
                        <View className="flex-row gap-3 w-full">
                            <Button
                                variant="outline"
                                onPress={resetFilters}
                                className='rounded-xl border-gray-300'
                            >
                                <ButtonText className="text-gray-700">Réinitialiser</ButtonText>
                            </Button>
                            <Button
                                onPress={applyFilters}
                                className='rounded-xl bg-orange-500 active:bg-orange-600'
                            >
                                <ButtonText>FILTRER</ButtonText>
                            </Button>
                        </View>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Fragment>
    );
}   

export default Filters;