import { FC, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import RootNavigator from "@/navigation/root-navigator";
import { AuthProvider } from "@/context/AuthContext";
import "@/global.css";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App: FC = () => {
  const [loaded, error] = useFonts({
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
    if (error) {
      console.error("Error loading fonts:", error);
    }
    if (loaded && !error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded || error) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </GluestackUIProvider>
  );
};

export default App;