import 'react-native-gesture-handler';
import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {ThemeProvider} from 'styled-components/native';
import theme from '@/styles/themes';
import Navigation from '@/navigations';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
