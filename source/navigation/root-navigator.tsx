import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "@/context/AuthContext";

import AuthNavigator from "./auth-navigator";
import MainNavigator from "./main-navigator";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated
? (
          <Stack.Screen name="Main" component={MainNavigator} />
        )
: (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
