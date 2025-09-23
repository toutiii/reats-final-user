import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { StackNavigation } from "@/types/navigation";

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, View, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import Animated, { 
  Easing, 
  interpolate, 
  runOnJS, 
  useAnimatedStyle, 
  useSharedValue, 
  withDelay, 
  withSequence, 
  withSpring, 
  withTiming,
  interpolateColor,
  SharedValue
} from "react-native-reanimated";

type OnboardingSlide = {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  gradientColors: [string, string];
  accentColor: string;
  secondaryColor: string;
  icon: string;
  features: string[];
};

type FeatureDotProps = {
  feature: string;
  delay: number;
  accentColor: string;
};

type IconIllustrationProps = {
  icon: string;
  accentColor: string;
  secondaryColor: string;
};

const onboardingData: OnboardingSlide[] = [
  {
    id: 1,
    title: "Réservez\ninstantanément",
    description: "Trouvez un chauffeur en quelques secondes, où que vous soyez dans la ville.",
    backgroundColor: "#0F0F23",
    gradientColors: ["#0F0F23", "#1A1A3A"],
    accentColor: "#6366F1",
    secondaryColor: "#818CF8",
    icon: "🚗",
    features: ["Géolocalisation précise", "Temps d'attente minimal", "Confirmation instantanée"]
  },
  {
    id: 2,
    title: "Suivez votre\ntrajet en direct",
    description: "Voyez votre chauffeur arriver et suivez chaque étape de votre course.",
    backgroundColor: "#0A2A2A",
    gradientColors: ["#0A2A2A", "#134E4A"],
    accentColor: "#10B981",
    secondaryColor: "#34D399",
    icon: "📍",
    features: ["Suivi GPS temps réel", "Localisation du chauffeur", "Temps d'arrivée précis"]
  },
  {
    id: 3,
    title: "Paiement\nautomatique",
    description: "Réglez votre course automatiquement et en toute sécurité.",
    backgroundColor: "#2A1A0A",
    gradientColors: ["#2A1A0A", "#4A2A1A"],
    accentColor: "#F59E0B",
    secondaryColor: "#FCD34D",
    icon: "💳",
    features: ["Paiement sécurisé", "Sans contact", "Reçu automatique"]
  },
  {
    id: 4,
    title: "Voyagez en\ntout confort",
    description: "Des véhicules propres avec des chauffeurs professionnels évalués.",
    backgroundColor: "#2A0A1A",
    gradientColors: ["#2A0A1A", "#4A1A2A"],
    accentColor: "#EC4899",
    secondaryColor: "#F472B6",
    icon: "⭐",
    features: ["Véhicules premium", "Chauffeurs vérifiés", "Évaluation 5 étoiles"]
  }
];

const FeatureDot: React.FC<FeatureDotProps> = ({ feature, delay, accentColor }) => {
  const opacity: SharedValue<number> = useSharedValue(0);
  const translateY: SharedValue<number> = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }));
  }, [delay]);

  const animatedStyle = useAnimatedStyle((): any => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle]} className="flex-row items-center mb-3">
      <View 
        className="w-2 h-2 rounded-full mr-3"
        style={{ backgroundColor: accentColor }}
      />
      <Text className="text-white/80 text-sm font-medium">{feature}</Text>
    </Animated.View>
  );
};

const IconIllustration: React.FC<IconIllustrationProps> = ({ icon, accentColor, secondaryColor }) => {
  const scale: SharedValue<number> = useSharedValue(0.8);
  const rotate: SharedValue<number> = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    rotate.value = withSequence(
      withDelay(500, withTiming(5, { duration: 200 })),
      withTiming(-5, { duration: 400 }),
      withTiming(0, { duration: 200 })
    );
  }, [icon]);

  const animatedStyle = useAnimatedStyle((): any => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` }
    ],
  }));

  return (
    <Animated.View 
      style={[animatedStyle]}
      className="w-32 h-32 rounded-full items-center justify-center relative"
    >
      {/* Gradient background */}
      <View 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: accentColor,
          opacity: 0.2,
        }}
      />
      
      {/* Outer ring */}
      <View 
        className="absolute inset-2 rounded-full border-2"
        style={{
          borderColor: accentColor,
          opacity: 0.3,
        }}
      />
      
      {/* Icon */}
      <Text className="text-6xl">{icon}</Text>
      
      {/* Floating elements */}
      <View 
        className="absolute -top-2 -right-2 w-4 h-4 rounded-full"
        style={{ backgroundColor: secondaryColor }}
      />
      <View 
        className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full"
        style={{ backgroundColor: accentColor }}
      />
    </Animated.View>
  );
};

const StartPage: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Animation values
  const containerOpacity: SharedValue<number> = useSharedValue(0);
  const bgProgress: SharedValue<number> = useSharedValue(0);
  const contentOpacity: SharedValue<number> = useSharedValue(0);
  const contentTranslateY: SharedValue<number> = useSharedValue(40);

  const goToNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      performTransition(() => setCurrentIndex(currentIndex + 1));
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      performTransition(() => setCurrentIndex(currentIndex - 1));
    }
  };

  const performTransition = (callback: () => void) => {
    contentOpacity.value = withTiming(0, { duration: 200 });
    contentTranslateY.value = withTiming(20, { duration: 200 });
    
    setTimeout(() => {
      callback();
      contentOpacity.value = withTiming(1, { duration: 400 });
      contentTranslateY.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) });
    }, 200);
  };

  const handleGetStarted = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleSkip = () => {
    navigation.navigate("MainNavigator");
  };

  // Animated styles
  const backgroundStyle = useAnimatedStyle((): any => {
    const backgroundColor = interpolateColor(
      bgProgress.value,
      [0, 1, 2, 3],
      onboardingData.map(item => item.backgroundColor)
    );
    return { backgroundColor };
  });

  const containerStyle = useAnimatedStyle((): any => ({
    opacity: containerOpacity.value,
  }));

  const contentStyle = useAnimatedStyle((): any => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  // Effects
  useEffect(() => {
    bgProgress.value = withTiming(currentIndex, { duration: 600, easing: Easing.out(Easing.cubic) });
  }, [currentIndex]);

  useEffect(() => {
    containerOpacity.value = withTiming(1, { duration: 800 });
    contentOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    contentTranslateY.value = withDelay(200, withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }));
  }, []);

  const currentSlide = onboardingData[currentIndex];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={currentSlide.backgroundColor} />
      <Animated.View style={[{ flex: 1 }, backgroundStyle]}>
        
        {/* Gradient overlay */}
        <View 
          className="absolute inset-0"
          style={{
            backgroundColor: currentSlide.backgroundColor,
          }}
        />
        
        {/* Note: Pour un vrai gradient, il faudrait utiliser LinearGradient d'expo-linear-gradient */}
        
        <SafeAreaView className="flex-1">
          <Animated.View style={[{ flex: 1 }, containerStyle]}>
            
            {/* Header with better UX */}
            <View className="flex-row justify-between items-center px-6 py-4">
              <View className="flex-row space-x-1">
                {onboardingData.map((_, index) => (
                  <View
                    key={index}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: index === currentIndex ? 24 : 8,
                      backgroundColor: index === currentIndex 
                        ? currentSlide.accentColor 
                        : 'rgba(255,255,255,0.3)'
                    }}
                  />
                ))}
              </View>
              
              <TouchableOpacity
                onPress={handleSkip}
                className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <Text className="text-white/90 font-semibold text-sm">Passer</Text>
              </TouchableOpacity>
            </View>

            {/* Content */}
            <Animated.View style={[{ flex: 1 }, contentStyle]} className="px-6">
              
              {/* Illustration centrée */}
              <View className="flex-1 items-center justify-center">
                <IconIllustration 
                  icon={currentSlide.icon}
                  accentColor={currentSlide.accentColor}
                  secondaryColor={currentSlide.secondaryColor}
                />
              </View>

              {/* Text content avec meilleure hiérarchie */}
              <VStack className="mb-8">
                <Heading className="text-3xl font-black text-white mb-4 leading-tight">
                  {currentSlide.title}
                </Heading>
                
                <Text className="text-lg text-white/80 mb-6 leading-relaxed">
                  {currentSlide.description}
                </Text>

                {/* Features list */}
                <VStack className="mb-4">
                  {currentSlide.features.map((feature, index) => (
                    <FeatureDot 
                      key={feature}
                      feature={feature}
                      delay={index * 100}
                      accentColor={currentSlide.accentColor}
                    />
                  ))}
                </VStack>
              </VStack>

              {/* Navigation claire et intuitive */}
              <VStack className="pb-6 space-y-4">
                {currentIndex === onboardingData.length - 1 ? (
                  <Button 
                    className="w-full rounded-2xl h-14 shadow-lg" 
                    style={{ backgroundColor: currentSlide.accentColor }}
                    onPress={handleGetStarted}
                  >
                    <ButtonText className="text-lg font-bold text-white">
                      Commencer l'aventure
                    </ButtonText>
                  </Button>
                ) : (
                  <HStack className="space-x-3 gap-3">
                    {currentIndex > 0 && (
                      <Button 
                        variant="outline"
                        className="flex-1 rounded-xl h-12 border-white/30 bg-white/10" 
                        onPress={goToPrevious}
                      >
                        <ButtonText className="text-white font-semibold">
                          Retour
                        </ButtonText>
                      </Button>
                    )}
                    
                    <Button 
                      className="flex-1 rounded-xl h-12 shadow-lg" 
                      style={{ backgroundColor: currentSlide.accentColor }}
                      onPress={goToNext}
                    >
                      <ButtonText className="text-white font-bold">
                        Continuer
                      </ButtonText>
                    </Button>
                  </HStack>
                )}
                
                {/* Pagination visuelle améliorée */}
                <Text className="text-center text-white/50 text-sm font-medium mt-4">
                  {currentIndex + 1} sur {onboardingData.length}
                </Text>
              </VStack>
            </Animated.View>
          </Animated.View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

export default StartPage;