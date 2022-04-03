import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainNavigation from '../MainNavigation';

const {Navigator, Screen} = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Navigator
      initialRouteName="Characters"
      screenOptions={{headerShown: false}}>
      <Screen name="MainHome" component={MainNavigation} />
    </Navigator>
  );
};

export default AppNavigation;
