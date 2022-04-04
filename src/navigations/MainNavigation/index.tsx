import React, {useCallback} from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {useTheme} from 'styled-components/native';
import {Platform} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {CharactersScreen, EpisodesScreen} from '@/scenes';
import BottomMenu from './components/BottomMenu';
import BottomMenuAnimation from './components/BottomMenuAnimation';
import {useSharedValue, withTiming} from 'react-native-reanimated';

const {Navigator, Screen} = createBottomTabNavigator();

const os = Platform.select({
  android: {
    height: 60,
    paddingVertical: 0,
  },
  ios: {
    height: 60 + getBottomSpace(),
    paddingVertical: 5,
  },
});

const MainNavigation = () => {
  const animTab = useSharedValue(0);

  const {colors} = useTheme();

  const handleTabChange = useCallback(
    (event: any) => {
      const tabIndex = event.data.state.index;

      animTab.value = withTiming(tabIndex, {
        duration: 350,
      });
    },
    [animTab],
  );

  const screenOptions = useCallback((): BottomTabNavigationOptions => {
    return {
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: os?.height,
        paddingVertical: os?.paddingVertical,
        backgroundColor: colors.background_light,
        borderTopWidth: 0,
        elevation: 0,
      },
    };
  }, [colors.background_light]);

  const options = useCallback(
    (screen: 'characters' | 'episodes'): BottomTabNavigationOptions => {
      const config = {
        characters: {
          title: 'Characters',
        },
        episodes: {
          title: 'Episodes',
        },
      };

      return {
        tabBarIcon: ({focused}) => (
          <BottomMenu focused={focused} config={config} screen={screen} />
        ),
        tabBarBackground: () => <BottomMenuAnimation animTab={animTab} />,
      };
    },
    [animTab],
  );

  return (
    <Navigator
      screenOptions={screenOptions}
      screenListeners={{state: handleTabChange}}>
      <Screen
        name="Characters"
        component={CharactersScreen}
        options={() => options('characters')}
      />
      <Screen
        name="Episodes"
        component={EpisodesScreen}
        options={() => options('episodes')}
      />
    </Navigator>
  );
};

export default MainNavigation;
