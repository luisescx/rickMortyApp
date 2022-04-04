import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import theme from '@/styles/themes';
import {ApolloProvider} from '@apollo/client';
import {client} from '@/services';
import CharacterProvider from './CharactersContext';
import EpisodeProvider from './EpisodesContext';

const Contexts: React.FC = ({children}) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <EpisodeProvider>
          <CharacterProvider>{children}</CharacterProvider>
        </EpisodeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Contexts;
