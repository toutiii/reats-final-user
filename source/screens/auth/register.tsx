import AuthHeader from "@/components/auth/auth-header";
import CircleEffect from "@/components/auth/svgs/circle-effect";
import PathEffect from "@/components/auth/svgs/path-effect";

import { ThemedView } from "@/components/ui/themed-view";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Animated, { 
  FadeInUp, 
  SlideInRight,
  SlideInLeft
} from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient';
import RegisterForm from "@/components/auth/register-form";

const RegisterScreen = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <StatusBar style='light' />
      
      {/* Gradient Background */}
      <LinearGradient
        colors={['#0a0f1c', '#111827', '#1f2937']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        {/* Header Section with SVG positioned */}
        <View className="flex-1 relative">
          {/* Circle Effect - Positioned at left */}
          <Animated.View 
            className="absolute top-8 -left-12 w-72 h-72 opacity-50"
            entering={SlideInLeft.delay(200).duration(1500)}
          >
            <CircleEffect />
          </Animated.View>
          
          {/* Path Effect - Positioned at right */}
          <Animated.View 
            className="absolute top-16 -right-8 w-64 h-64 opacity-40"
            entering={SlideInRight.delay(400).duration(1200)}
          >
            <PathEffect />
          </Animated.View>
          
          {/* Gradient overlay for better text readability */}
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'transparent', 'rgba(0,0,0,0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="absolute inset-0"
          />
          
          {/* Header Content Section */}
          <View className="flex-1 pt-24">
            {/* Reusable Auth Header */}
            <AuthHeader
              category="Authentification"
              title="Créer un compte"
              description="Accédez à tous vos services de livraison en un seul endroit"
              showSeparator={true}
              delayOffset={0}
            />

            {/* Login Form Section */}
            <Animated.View
              entering={FadeInUp.delay(2200).duration(800)}
              className="flex-1 relative z-10"
            >
              <RegisterForm />
            </Animated.View>
          </View>
          
          {/* Bottom subtle gradient */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.15)']}
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          />
        </View>
      </LinearGradient>
    </ThemedView>
  );
};

export default RegisterScreen;