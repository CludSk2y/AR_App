import React, { useState, useEffect } from "react";
import "react-native-url-polyfill/auto";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import screens
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import CatalogScreen from "./screens/CatalogScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import PdfViewerScreen from "./screens/PdfViewerScreen";
import SupportScreen from "./screens/SupportScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Catalog" component={CatalogScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="PdfViewer" component={PdfViewerScreen} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
