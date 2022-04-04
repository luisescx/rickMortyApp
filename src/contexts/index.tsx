import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import theme from '@/styles/themes';
import {ApolloProvider} from '@apollo/client';
import {client} from '@/services';

const Contexts: React.FC = ({children}) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ApolloProvider>
  );
};

export default Contexts;
