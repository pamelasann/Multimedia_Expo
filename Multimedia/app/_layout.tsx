import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import {useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Easing } from "react-native";

import Index from './index';
import PlayScreen from './play';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Bungee': require('../assets/fonts/Bungee-Regular.ttf'),
    'Rubik': require('../assets/fonts/Rubik-Regular.ttf'),
  });


  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync(); 
      }
    };
    prepare();
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  };

  
  return (
      <Stack.Navigator 
      screenOptions={{
          headerShown: false,
        }} 
      >
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen name="play" component={PlayScreen} />
      </Stack.Navigator>
  );
}
