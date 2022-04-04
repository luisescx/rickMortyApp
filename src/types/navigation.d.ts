import {NavigatorScreenParams} from '@react-navigation/native';

type MainParamsList = {
  Characters: undefined;
  Episodes: undefined;
};

export type AppStackParamsList = {
  MainHome: NavigatorScreenParams<MainParamsList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamsList {}
  }
}
