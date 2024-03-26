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
import Statistic from './src/screens/schedule/Statistic';
import Crops from './src/screens/schedule/Crops';
import Test from './src/screens/schedule/Test';
import LoginScreen from './src/screens/login/LoginScreen';
import RegisterScreen from './src/screens/register/RegisterScreen';
import MainGuide from './src/screens/guides/MainGuide';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainGuide">
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
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
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
        <Stack.Screen
          name="Statistic"
          component={Statistic}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Crops"
          component={Crops}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Test"
          component={Test}
          options={{ headerShown: false }}
        />

        {/* //Guide Take Care Tree */}
        <Stack.Screen
          name="MainGuide"
          component={MainGuide}
          options={{ headerShown: false }}
        />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
