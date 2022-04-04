import React, {useCallback, useState, useEffect} from 'react';
import {
  FlatList,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {Container, Header, HeaderContent, SyncButton, SyncIcon} from './styles';
import RickMortyLogo from '@/assets/images/rick_morty_logo.svg';
import {Input, CharacterCard, Filter, Loading, ModalStyled} from '@/components';
import {useTheme} from 'styled-components/native';
import {useQuery} from '@apollo/client';
import DetailModal from './DetailModal';
import charactersQuery from '@/graphql/query/characters';

const Characters = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [characterName, setCharacterName] = useState('');
  const [characters, setCharacters] = useState<any[]>([]);
  const [orderById, setOrderById] = useState(1);
  const [visible, setIsVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    {} as Character,
  );

  const {colors} = useTheme();

  const {data, loading} = useQuery(charactersQuery, {
    variables: {
      page,
      filter: {
        name: characterName,
      },
    },
  });

  const handleOpenModal = useCallback(
    (id: string) => {
      const character = characters.find(ep => ep.id === id);

      if (character) {
        setSelectedCharacter(character);
        setIsVisible(true);
      }
    },
    [characters],
  );

  const handleCloseModal = useCallback(() => {
    setSelectedCharacter({} as Character);
    setIsVisible(false);
  }, []);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <CharacterCard
          imageUri={item.image}
          name={item.name}
          index={index}
          onPress={() => handleOpenModal(item.id)}
        />
      );
    },
    [handleOpenModal],
  );

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

      <ModalStyled
        visible={visible}
        onDismiss={handleCloseModal}
        hasFlatlist={true}>
        <DetailModal character={selectedCharacter} />
      </ModalStyled>
    </Container>
  );
};

export default Characters;
