import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Montserrat_100Thin } from "@expo-google-fonts/montserrat/100Thin";
import { Montserrat_100Thin_Italic } from "@expo-google-fonts/montserrat/100Thin_Italic";
import { Montserrat_200ExtraLight } from "@expo-google-fonts/montserrat/200ExtraLight";
import { Montserrat_200ExtraLight_Italic } from "@expo-google-fonts/montserrat/200ExtraLight_Italic";
import { Montserrat_300Light } from "@expo-google-fonts/montserrat/300Light";
import { Montserrat_300Light_Italic } from "@expo-google-fonts/montserrat/300Light_Italic";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat/400Regular";
import { Montserrat_400Regular_Italic } from "@expo-google-fonts/montserrat/400Regular_Italic";
import { Montserrat_500Medium } from "@expo-google-fonts/montserrat/500Medium";
import { Montserrat_500Medium_Italic } from "@expo-google-fonts/montserrat/500Medium_Italic";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat/600SemiBold";
import { Montserrat_600SemiBold_Italic } from "@expo-google-fonts/montserrat/600SemiBold_Italic";
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat/700Bold";
import { Montserrat_700Bold_Italic } from "@expo-google-fonts/montserrat/700Bold_Italic";
import { Montserrat_800ExtraBold } from "@expo-google-fonts/montserrat/800ExtraBold";
import { Montserrat_800ExtraBold_Italic } from "@expo-google-fonts/montserrat/800ExtraBold_Italic";
import { Montserrat_900Black } from "@expo-google-fonts/montserrat/900Black";
import { Montserrat_900Black_Italic } from "@expo-google-fonts/montserrat/900Black_Italic";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Button, ButtonText } from './components/ui/button';
import { useFonts } from './node_modules/expo-font/build/FontHooks';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import StartPage from './screens/onboarding';

const Stack = createStackNavigator();

// Keep the splash screen visible while we fetch resources
try {
  SplashScreen.preventAutoHideAsync();
} catch (error) {
  console.warn('Error preventing splash screen from auto hiding:', error);
}

const App: React.FC = () => {
    const [loaded] = useFonts({
        Montserrat_100Thin,
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
        Montserrat_900Black,
        Montserrat_100Thin_Italic,
        Montserrat_200ExtraLight_Italic,
        Montserrat_300Light_Italic,
        Montserrat_400Regular_Italic,
        Montserrat_500Medium_Italic,
        Montserrat_600SemiBold_Italic,
        Montserrat_700Bold_Italic,
        Montserrat_800ExtraBold_Italic,
        Montserrat_900Black_Italic,
      });
    
      useEffect(() => {
    async function initialize() {
      if (loaded) {
        try {
          console.log("Démarrage de l'initialisation de l'application...");
          // Hide the splash screen after resources are loaded
          await SplashScreen.hideAsync();
        } catch (error) {
          console.error("Erreur lors de l'initialisation:", error);
          // Even if there's an error, try to hide the splash screen
          try {
            await SplashScreen.hideAsync();
          } catch (splashError) {
            console.error("Erreur lors de la fermeture du splash screen:", splashError);
          }
        }
      }
    }

    initialize();
  }, [loaded]);
    
      if (!loaded) {
        return null;
      }
    return (
        
    <GluestackUIProvider mode="light">
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={StartPage} />
      </Stack.Navigator>
        </NavigationContainer>
    </GluestackUIProvider>
  
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;