// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './components/ChatScreen';
import DocumentScreen from './components/DocumentScreen';
import RightsAdviceScreen from './components/RightsAdviceScreen';
import CasePredictionScreen from './components/CasePredictionScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Chat"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'chatbubbles';

            if (route.name === 'Chat') iconName = 'chatbubbles';
            else if (route.name === 'Documents') iconName = 'document';
            else if (route.name === 'Rights') iconName = 'shield-checkmark';
            else if (route.name === 'Prediction') iconName = 'analytics';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Documents" component={DocumentScreen} />
        <Tab.Screen name="Rights" component={RightsAdviceScreen} />
        <Tab.Screen name="Prediction" component={CasePredictionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
