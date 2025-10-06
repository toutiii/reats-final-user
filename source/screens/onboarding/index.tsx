import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { StackNavigation } from "@/types/navigation";

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, TouchableOpacity, StatusBar } from "react-native";
import Animated, { 
  Easing, 
  useAnimatedStyle, 
  useSharedValue, 
  withDelay, 
  withSequence, 
  withSpring, 
  withTiming,
  interpolateColor,
  withRepeat,
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
  index: number;
};

type IconIllustrationProps = {
  icon: string;
  accentColor: string;
  secondaryColor: string;
};

type FloatingParticleProps = {
  accentColor: string;
  delay: number;
  size: number;
  startX: number;
  startY: number;
};

const onboardingData: OnboardingSlide[] = [
  {
    id: 1,
    title: "Réservez\ninstantanément",
    description: "Trouvez un chauffeur en quelques secondes, où que vous soyez dans la ville.",
    backgroundColor: "#1A1A1A",
    gradientColors: ["#1A1A1A", "#2D1810"],
    accentColor: "#FF7622",
    secondaryColor: "#FF9854",
    icon: "🚗",
    features: ["Géolocalisation précise", "Temps d'attente minimal", "Confirmation instantanée"]
  },
  {
    id: 2,
    title: "Suivez votre\ntrajet en direct",
    description: "Voyez votre chauffeur arriver et suivez chaque étape de votre course.",
    backgroundColor: "#1A1A1A",
    gradientColors: ["#1A1A1A", "#1A2520"],
    accentColor: "#00D9A3",
    secondaryColor: "#4DFFCD",
    icon: "📍",
    features: ["Suivi GPS temps réel", "Localisation du chauffeur", "Temps d'arrivée précis"]
  },
  {
    id: 3,
    title: "Paiement\nautomatique",
    description: "Réglez votre course automatiquement et en toute sécurité.",
    backgroundColor: "#1A1A1A",
    gradientColors: ["#1A1A1A", "#2D2410"],
    accentColor: "#FFB700",
    secondaryColor: "#FFCE3D",
    icon: "💳",
    features: ["Paiement sécurisé", "Sans contact", "Reçu automatique"]
  },
  {
    id: 4,
    title: "Voyagez en\ntout confort",
    description: "Des véhicules propres avec des chauffeurs professionnels évalués.",
    backgroundColor: "#1A1A1A",
    gradientColors: ["#1A1A1A", "#2D1824"],
    accentColor: "#FF4D94",
    secondaryColor: "#FF7BB3",
    icon: "⭐",
    features: ["Véhicules premium", "Chauffeurs vérifiés", "Évaluation 5 étoiles"]
  }
];

const FloatingParticle: React.FC<FloatingParticleProps> = ({ 
  accentColor, 
  delay, 
  size,
  startX,
  startY 
}) => {
  const translateY: SharedValue<number> = useSharedValue(0);
  const opacity: SharedValue<number> = useSharedValue(0);
  const scale: SharedValue<number> = useSharedValue(0.5);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-30, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
    
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.6, { duration: 2000 }),
          withTiming(0.2, { duration: 2000 })
        ),
        -1,
        true
      )
    );

    scale.value = withDelay(delay, withSpring(1, { damping: 15, stiffness: 100 }));
  }, [delay]);

  const animatedStyle = useAnimatedStyle((): any => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          left: startX,
          top: startY,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: accentColor,
        }
      ]}
    />
  );
};

const FeatureDot: React.FC<FeatureDotProps> = ({ feature, delay, accentColor, index }) => {
  const opacity: SharedValue<number> = useSharedValue(0);
  const translateX: SharedValue<number> = useSharedValue(-30);
  const scale: SharedValue<number> = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    translateX.value = withDelay(delay, withSpring(0, { damping: 15, stiffness: 150 }));
    scale.value = withDelay(delay, withSpring(1, { damping: 12, stiffness: 120 }));
  }, [delay]);

  const animatedStyle = useAnimatedStyle((): any => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { scale: scale.value }
    ],
  }));

  return (
    <Animated.View style={[animatedStyle]} className="flex-row items-center mb-4">
      <View 
        className="w-8 h-8 rounded-xl mr-3 items-center justify-center shadow-lg"
        style={{ 
          backgroundColor: `${accentColor}20`,
        }}
      >
        <View 
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </View>
      <Text className="text-white/90 text-base font-medium flex-1">{feature}</Text>
    </Animated.View>
  );
};

const IconIllustration: React.FC<IconIllustrationProps> = ({ icon, accentColor, secondaryColor }) => {
  const scale: SharedValue<number> = useSharedValue(0);
  const rotate: SharedValue<number> = useSharedValue(-180);
  const pulseScale: SharedValue<number> = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 100 });
    rotate.value = withSpring(0, { damping: 20, stiffness: 80 });
    
    // Pulse animation
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [icon]);

  const containerStyle = useAnimatedStyle((): any => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` }
    ],
  }));

  const pulseStyle = useAnimatedStyle((): any => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <Animated.View style={[containerStyle]} className="items-center justify-center">
      {/* Animated outer glow ring */}
      <Animated.View 
        style={[pulseStyle]}
        className="absolute w-48 h-48 rounded-full"
      >
        <View 
          className="w-full h-full rounded-full"
          style={{
            backgroundColor: accentColor,
            opacity: 0.1,
          }}
        />
      </Animated.View>

      {/* Middle ring */}
      <View 
        className="absolute w-40 h-40 rounded-full"
        style={{
          backgroundColor: accentColor,
          opacity: 0.15,
        }}
      />

      {/* Main icon container with glassmorphism */}
      <View 
        className="w-32 h-32 rounded-3xl items-center justify-center relative"
        style={{
          backgroundColor: `${accentColor}30`,
        }}
      >
        {/* Border glow */}
        <View 
          className="absolute inset-0 rounded-3xl border-2"
          style={{
            borderColor: accentColor,
            opacity: 0.4,
          }}
        />
        
        {/* Icon with shadow */}
        <View className="items-center justify-center">
          <Text className="text-6xl" style={{ textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: {width: 0, height: 4}, textShadowRadius: 8 }}>
            {icon}
          </Text>
        </View>
        
        {/* Decorative corner dots */}
        <View 
          className="absolute -top-3 -right-3 w-6 h-6 rounded-full shadow-lg"
          style={{ backgroundColor: secondaryColor }}
        />
        <View 
          className="absolute -bottom-3 -left-3 w-5 h-5 rounded-full shadow-lg"
          style={{ backgroundColor: accentColor }}
        />
        <View 
          className="absolute -top-2 -left-3 w-3 h-3 rounded-full shadow-lg"
          style={{ backgroundColor: secondaryColor, opacity: 0.6 }}
        />
      </View>
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
  const contentTranslateY: SharedValue<number> = useSharedValue(60);
  const headerOpacity: SharedValue<number> = useSharedValue(0);
  const titleOpacity: SharedValue<number> = useSharedValue(0);
  const titleScale: SharedValue<number> = useSharedValue(0.9);
  const buttonOpacity: SharedValue<number> = useSharedValue(0);
  const buttonTranslateY: SharedValue<number> = useSharedValue(40);

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
    contentTranslateY.value = withTiming(30, { duration: 200 });
    titleOpacity.value = withTiming(0, { duration: 200 });
    titleScale.value = withTiming(0.9, { duration: 200 });
    buttonOpacity.value = withTiming(0, { duration: 200 });
    buttonTranslateY.value = withTiming(40, { duration: 200 });
    
    setTimeout(() => {
      callback();
      contentOpacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) });
      contentTranslateY.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) });
      titleOpacity.value = withDelay(200, withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }));
      titleScale.value = withDelay(200, withSpring(1, { damping: 15, stiffness: 120 }));
      buttonOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
      buttonTranslateY.value = withDelay(400, withSpring(0, { damping: 15, stiffness: 120 }));
    }, 200);
  };

  const handleGetStarted = () => {
    navigation.navigate("Auth", {
      screen: "RegisterScreen",
    });
  };

  const handleSkip = () => {
    navigation.navigate("Auth", {
      screen: 'LoginScreen',
    });
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

  const headerStyle = useAnimatedStyle((): any => ({
    opacity: headerOpacity.value,
  }));

  const titleStyle = useAnimatedStyle((): any => ({
    opacity: titleOpacity.value,
    transform: [{ scale: titleScale.value }],
  }));

  const buttonStyle = useAnimatedStyle((): any => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  // Effects
  useEffect(() => {
    bgProgress.value = withTiming(currentIndex, { duration: 600, easing: Easing.out(Easing.cubic) });
  }, [currentIndex]);

  useEffect(() => {
    containerOpacity.value = withTiming(1, { duration: 1000 });
    headerOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    contentOpacity.value = withDelay(400, withTiming(1, { duration: 700 }));
    contentTranslateY.value = withDelay(400, withTiming(0, { duration: 700, easing: Easing.out(Easing.cubic) }));
    titleOpacity.value = withDelay(600, withTiming(1, { duration: 700 }));
    titleScale.value = withDelay(600, withSpring(1, { damping: 15, stiffness: 120 }));
    buttonOpacity.value = withDelay(900, withTiming(1, { duration: 600 }));
    buttonTranslateY.value = withDelay(900, withSpring(0, { damping: 15, stiffness: 120 }));
  }, []);

  const currentSlide = onboardingData[currentIndex];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={currentSlide.backgroundColor} />
      <Animated.View style={[{ flex: 1 }, backgroundStyle]}>
        
        {/* Gradient overlay simulé avec opacité */}
        <View 
          className="absolute inset-0"
          style={{
            backgroundColor: currentSlide.backgroundColor,
          }}
        />
        
        {/* Radial gradient effect simulation */}
        <View 
          className="absolute inset-0"
          style={{
            backgroundColor: currentSlide.accentColor,
            opacity: 0.03,
          }}
        />
        
        {/* Floating particles for depth */}
        <FloatingParticle accentColor={currentSlide.accentColor} delay={0} size={12} startX={50} startY={150} />
        <FloatingParticle accentColor={currentSlide.secondaryColor} delay={300} size={8} startX={300} startY={200} />
        <FloatingParticle accentColor={currentSlide.accentColor} delay={600} size={6} startX={80} startY={400} />
        <FloatingParticle accentColor={currentSlide.secondaryColor} delay={900} size={10} startX={280} startY={500} />
        
        <SafeAreaView className="flex-1">
          <Animated.View style={[{ flex: 1 }, containerStyle]}>
            
            {/* Header with glassmorphism */}
            <Animated.View style={[headerStyle]} className="flex-row justify-between items-center px-6 py-5">
              <View className="flex-row gap-2">
                {onboardingData.map((_, index) => (
                  <View
                    key={index}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: index === currentIndex ? 32 : 8,
                      backgroundColor: index === currentIndex 
                        ? currentSlide.accentColor 
                        : 'rgba(255,255,255,0.25)'
                    }}
                  />
                ))}
              </View>
              
              <TouchableOpacity
                onPress={handleSkip}
                className="rounded-full px-5 py-2.5"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.15)',
                }}
              >
                <Text className="text-white font-bold text-sm">Passer</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Content */}
            <Animated.View style={[{ flex: 1 }, contentStyle]} className="px-6">
              
              {/* Illustration with more space */}
              <View className="flex-1 items-center justify-center pt-8 pb-4">
                <IconIllustration 
                  icon={currentSlide.icon}
                  accentColor={currentSlide.accentColor}
                  secondaryColor={currentSlide.secondaryColor}
                />
              </View>

              {/* Text content with better spacing */}
              <VStack className="mb-8">
                <Animated.View style={titleStyle}>
                  <Heading className="text-4xl font-black text-white mb-4 leading-tight tracking-tight">
                    {currentSlide.title}
                  </Heading>
                  
                  <Text className="text-lg text-white/70 mb-8 leading-relaxed">
                    {currentSlide.description}
                  </Text>
                </Animated.View>

                {/* Features list with improved design */}
                <VStack className="mb-2">
                  {currentSlide.features.map((feature, index) => (
                    <FeatureDot 
                      key={feature}
                      feature={feature}
                      delay={600 + (index * 150)}
                      accentColor={currentSlide.accentColor}
                      index={index}
                    />
                  ))}
                </VStack>
              </VStack>

              {/* Navigation with modern buttons */}
              <Animated.View style={buttonStyle}>
                <VStack className="pb-8 space-y-3">
                  {currentIndex === onboardingData.length - 1 ? (
                    <TouchableOpacity
                      onPress={handleGetStarted}
                      activeOpacity={0.8}
                      className="w-full rounded-2xl h-16 shadow-xl items-center justify-center"
                      style={{ 
                        backgroundColor: currentSlide.accentColor,
                      }}
                    >
                      <Text className="text-lg font-black text-white tracking-wide">
                        Commencer l'aventure
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <HStack className="gap-3">
                      {currentIndex > 0 && (
                        <TouchableOpacity
                          onPress={goToPrevious}
                          activeOpacity={0.8}
                          className="flex-1 rounded-xl h-14 items-center justify-center"
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderWidth: 1.5,
                            borderColor: 'rgba(255,255,255,0.2)',
                          }}
                        >
                          <Text className="text-white font-bold text-base">
                            Retour
                          </Text>
                        </TouchableOpacity>
                      )}
                      
                      <TouchableOpacity
                        onPress={goToNext}
                        activeOpacity={0.8}
                        className="flex-1 rounded-xl h-14 shadow-lg items-center justify-center"
                        style={{ 
                          backgroundColor: currentSlide.accentColor,
                        }}
                      >
                        <Text className="text-white text-base">
                          Continuer
                        </Text>
                      </TouchableOpacity>
                    </HStack>
                  )}
                  
                  {/* Improved pagination */}
                  <View className="items-center mt-6">
                    <View 
                      className="px-4 py-2 rounded-full"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.08)',
                      }}
                    >
                      <Text className="text-white/50 text-sm font-bold tracking-wider">
                        {currentIndex + 1} / {onboardingData.length}
                      </Text>
                    </View>
                  </View>
                </VStack>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

export default StartPage;