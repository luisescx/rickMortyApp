import React from 'react';
import {Container} from './styles';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components/native';

interface LoadingProps {
  isLoading: boolean;
  size?: 'small' | 'large';
}

const Loading = ({isLoading, size = 'small'}: LoadingProps) => {
  const {colors} = useTheme();

  if (!isLoading) {
    return null;
  }

  return (
    <Container>
      <ActivityIndicator size={size} color={colors.secondary} />
    </Container>
  );
};

export default Loading;
