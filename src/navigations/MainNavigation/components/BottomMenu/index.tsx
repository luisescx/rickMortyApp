import Icon, {IconName} from '@/components/Icon';
import React from 'react';

import {useTheme} from 'styled-components';
import {Container, Title} from './styles';

interface Config {
  characters: {
    title: string;
  };
  episodes: {
    title: string;
  };
}

interface TabProps {
  focused: boolean;
  config: Config;
  screen: 'characters' | 'episodes';
}

const BottomMenu = ({screen, focused, config}: TabProps) => {
  const {colors} = useTheme();

  return (
    <Container>
      <Icon
        name={screen as IconName}
        size={20}
        color={focused ? colors.secondary : colors.secondary_light}
      />

      <Title focused={focused}>{config[screen].title}</Title>
    </Container>
  );
};

export default BottomMenu;
