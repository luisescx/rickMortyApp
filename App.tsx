import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigation from '@/navigations';
import Contexts from '@/contexts';
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

LogBox.ignoreAllLogs();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Contexts>
      <Navigation />
    </Contexts>
  );
};

export default App;
