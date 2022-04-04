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
import {useCharacters} from '@/hooks';

const Characters = () => {
  const [page, setPage] = useState(1);
  const [characterName, setCharacterName] = useState('');
  const [orderById, setOrderById] = useState(1);
  const [visible, setIsVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    {} as Character,
  );
  const [info, setInfo] = useState<Info>({
    count: 0,
    next: 0,
    pages: 1,
    prev: 0,
  });

  const {colors} = useTheme();
  const {characters, handleCharacters} = useCharacters();

  const {data, loading} = useQuery<CharacterQuery>(charactersQuery, {
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

  const handleRender = useCallback(() => {
    if (orderById === 1 && info.next) {
      setPage(info.next);
      return;
    }

    if (orderById === 2 && info.prev) {
      setPage(info.prev);
    }
  }, [orderById, info.next, info.prev]);

  const handleCharacterName = useCallback(
    (value: string) => {
      handleCharacters([]);
      setInfo({
        ...info,
        count: 0,
        next: 0,
        prev: 0,
      });

      setPage(orderById === 1 ? 1 : info.pages);
      setCharacterName(value);
    },
    [handleCharacters, orderById, info],
  );

  const handleConfirm = useCallback(
    (selectedOrderId: number) => {
      if (selectedOrderId !== orderById) {
        setOrderById(selectedOrderId);

        if (characters.length === info.count) {
          const orderedCharacters = characters.reverse();
          handleCharacters([...orderedCharacters]);
          return;
        }

        handleCharacters([]);
        setInfo({
          ...info,
          count: 0,
          next: 0,
          prev: 0,
        });
        setPage(selectedOrderId === 1 ? 1 : info.pages);
      }
    },
    [orderById, characters, handleCharacters, info],
  );

  const handleRefreshSearch = useCallback(() => {
    handleCharacters([]);
    setInfo({
      ...info,
      count: 0,
      next: 0,
      prev: 0,
    });
    setCharacterName('');

    setPage(orderById === 1 ? 1 : info.pages);
  }, [orderById, info, handleCharacters]);

  useEffect(() => {
    if (data?.characters) {
      if (data.characters.info) {
        setInfo({
          count: data.characters.info.count,
          next: data.characters.info.next,
          pages: data.characters.info.pages,
          prev: data.characters.info.prev,
        });
      }

      if (data.characters.results) {
        const charactersList = [...data.characters.results];
        const orderedCharacters =
          orderById === 1 ? charactersList : charactersList.reverse();

        handleCharacters([...characters, ...orderedCharacters]);
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

      {!!loading && !characters.length && (
        <Loading isLoading={loading} size="large" isFullScreen />
      )}

      {characters?.length > 0 && (
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
        <DetailModal character={selectedCharacter} onClose={handleCloseModal} />
      </ModalStyled>
    </Container>
  );
};

export default Characters;
