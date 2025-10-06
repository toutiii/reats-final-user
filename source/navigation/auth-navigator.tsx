import { createStackNavigator } from "@react-navigation/stack";
import StartPage from "@/screens/onboarding";
import LoginScreen from "@/screens/auth/login";
import RegisterScreen from "@/screens/auth/register";
import OTPScreen from "@/screens/auth/otp";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={StartPage} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
