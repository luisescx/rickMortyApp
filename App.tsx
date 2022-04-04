import 'react-native-gesture-handler';
import React from 'react';
import Navigation from '@/navigations';
import Contexts from '@/contexts';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Contexts>
      <Navigation />
    </Contexts>
  );
};

export default App;
