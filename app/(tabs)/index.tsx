import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/home';
import DetailScreen from './pages/detail';

export type RootStackParamList = {
  Home: undefined;
  Detail: { characterId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Personagens' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalhes do Personagem' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
