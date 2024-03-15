import React from 'react';
import Onboarding from './src/screens/onboarding/Onboarding';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainSchedule from './src/screens/schedule/MainSchedule';
import AddSchedule from './src/screens/schedule/AddSchedule';
import SelectTree from './src/screens/schedule/SelectTree';
import AddTask from './src/screens/schedule/AddTask';
import AddWork from './src/screens/schedule/AddWork';
import AddFrequency from './src/screens/schedule/AddFrequency';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="MainSchedule"
          component={MainSchedule}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddSchedule"
          component={AddSchedule}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectTree"
          component={SelectTree}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AddTask"
          component={AddTask}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddWork"
          component={AddWork}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AddFrequency"
          component={AddFrequency}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
