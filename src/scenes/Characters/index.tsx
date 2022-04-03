import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {Container, Header, HeaderContent, SyncButton, SyncIcon} from './styles';
import RickMortyLogo from '@/assets/images/rick_morty_logo.svg';
import {Input, CharacterCard, Filter, Loading} from '@/components';
import {useTheme} from 'styled-components/native';
import {gql, useQuery} from '@apollo/client';
import {useEffect} from 'react';

const CHARACTERS = gql`
  query characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
      }
      results {
        id
        name
        image
        location {
          id
          name
        }
        episode {
          id
          name
        }
      }
    }
  }
`;

export interface Character {
  id: string;

  name: string;

  image: string;

  location: Location;

  episode: Episode[];
}

export interface CharacterQuery {
  info: Info;

  results: Character[];
}

export interface Location {
  id: string;

  name: string;
}

export interface Episode {
  id: string;

  name: string;

  characters: Character[];

  air_date: string;
}

export interface EpisodeQuery {
  info: Info;

  results: Episode[];
}

export interface Info {
  count: number;

  pages: number;
}

const ORDERS = [
  {id: 1, label: 'Ascendant'},
  {id: 2, label: 'Decrescent'},
];

const Characters = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [characterName, setCharacterName] = useState('');
  const [characters, setCharacters] = useState<any[]>([]);
  const [orderById, setOrderById] = useState(1);

  const {data, loading} = useQuery(CHARACTERS, {
    variables: {
      page,
      filter: {
        name: characterName,
      },
    },
  });

  const {colors} = useTheme();

  const renderItem = useCallback(({item, index}) => {
    return (
      <CharacterCard imageUri={item.image} name={item.name} index={index} />
    );
  }, []);

  const handleRender = useCallback(async () => {
    if (orderById === 1 && page !== totalPages) {
      setPage(oldState => oldState + 1);
      return;
    }

    if (orderById === 2 && page !== 1) {
      setPage(oldState => oldState - 1);
    }
  }, [orderById, page, totalPages]);

  const handleCharacterName = useCallback((value: string) => {
    setCharacters([]);
    setPage(1);

    setCharacterName(value);
  }, []);

  const handleConfirm = useCallback(
    (selectedOrderId: number) => {
      if (selectedOrderId !== orderById) {
        setCharacters([]);
        setPage(selectedOrderId === 1 ? 1 : totalPages);
        setOrderById(selectedOrderId);
      }
    },
    [orderById, totalPages],
  );

  const handleRefreshSearch = useCallback(() => {
    setCharacters([]);
    setCharacterName('');

    setPage(orderById === 1 ? 1 : totalPages);
  }, [orderById, totalPages]);

  useEffect(() => {
    if (data?.characters) {
      if (data.characters.info) {
        setTotalPages(data.characters.info.pages);
      }

      if (data.characters.results) {
        setCharacters(oldState => [...oldState, ...data.characters.results]);
      }
    }
  }, [data]);

  return (
    <Container>
      <StatusBar
        animated={true}
        translucent={true}
        barStyle="light-content"
        backgroundColor={colors.background}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Header>
          <RickMortyLogo width={'100%'} height={80} />

          <HeaderContent>
            <Input
              placeholder="Character Name"
              handleInputSearch={handleCharacterName}
              isValueEmpty={characterName === ''}
            />

            <Filter
              options={ORDERS}
              modalTitle="Sort by"
              defaultSelectedId={orderById}
              onConfirm={handleConfirm}
            />
          </HeaderContent>
        </Header>
      </TouchableWithoutFeedback>

      {characters && (
        <FlatList
          data={characters}
          keyExtractor={item => String(item.id)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 24,
          }}
          onEndReached={handleRender}
          onEndReachedThreshold={1}
          ListFooterComponent={<Loading isLoading={loading} />}
        />
      )}

      {characterName !== '' && (
        <SyncButton onPress={handleRefreshSearch}>
          <SyncIcon name="refresh-cw" size={24} />
        </SyncButton>
      )}
    </Container>
  );
};

export default Characters;
