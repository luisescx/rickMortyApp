import React from 'react';
import {Container} from './styles';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components/native';

interface LoadingProps {
  isLoading: boolean;
  isFullScreen?: boolean;
  size?: 'small' | 'large';
}

const Loading = ({
  isLoading,
  size = 'small',
  isFullScreen = false,
}: LoadingProps) => {
  const {colors} = useTheme();

  if (!isLoading) {
    return null;
  }

  return (
    <Container isFullScreen={isFullScreen}>
      <ActivityIndicator size={size} color={colors.secondary} />
    </Container>
  );
};

export default Loading;
