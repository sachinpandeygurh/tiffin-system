import { createStackNavigator } from "@react-navigation/stack";
import Index from "./index";
import SplashScreen from "./SplashScreen";
import Account from "./account";
import CartScreen from "./cart";
import SubCategory from "./subCategory"
import Notifications from "./notifications"
import Categories from "./categories"
import LoginScreen from "./login"
import SignupScreen from "./signup"
import SearchScreen from "./searchScreen"

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Index" component={Index} />
       <Stack.Screen name="cart" component={CartScreen} />
     <Stack.Screen name="subCategory" component={SubCategory} />
      <Stack.Screen name="notifications" component={Notifications} />
      <Stack.Screen name="categories" component={Categories} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
    <Stack.Screen name="searchScreen" component={SearchScreen} />
    <Stack.Screen name="account" component={Account} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} /> 
    </Stack.Navigator>
  );
}
