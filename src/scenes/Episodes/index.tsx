import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {Container, Header, HeaderContent, SyncButton, SyncIcon} from './styles';
import {useQuery} from '@apollo/client';
import {useTheme} from 'styled-components/native';
import {Filter, Input, Loading, ModalStyled} from '@/components';
import EpisodeItem from './components/EpisodeItem';
import CharactersModal from './components/CharactersModal';
import episodesQuery from '@/graphql/query/episodes';

const Episodes = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [episodeName, setEpisodeName] = useState('');
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [orderById, setOrderById] = useState(1);
  const [visible, setIsVisible] = useState(false);

  const {colors} = useTheme();

  const {data, loading} = useQuery(episodesQuery, {
    variables: {
      page,
      filter: {
        name: episodeName,
      },
    },
  });

  const handleCharacterName = useCallback((value: string) => {
    setEpisodes([]);
    setPage(1);

    setEpisodeName(value);
  }, []);

  const handleConfirm = useCallback(
    (selectedOrderId: number) => {
      if (selectedOrderId !== orderById) {
        setEpisodes([]);
        setPage(selectedOrderId === 1 ? 1 : totalPages);
        setOrderById(selectedOrderId);
      }
    },
    [orderById, totalPages],
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

  const handleRefreshSearch = useCallback(() => {
    setEpisodes([]);
    setEpisodeName('');

    setPage(orderById === 1 ? 1 : totalPages);
  }, [orderById, totalPages]);

  const handleOpenModal = useCallback(
    (id: string) => {
      const selectedEpisode = episodes.find(ep => ep.id === id);

      if (selectedEpisode) {
        setCharacters(selectedEpisode.characters);
        setIsVisible(true);
      }
    },
    [episodes],
  );

  const handleCloseModal = useCallback(() => {
    setCharacters([]);
    setIsVisible(false);
  }, []);

  const renderItem = useCallback(
    ({item, index}) => (
      <EpisodeItem
        {...item}
        index={index}
        selected={false}
        onPress={() => handleOpenModal(item.id)}
      />
    ),
    [handleOpenModal],
  );

  useEffect(() => {
    if (data?.episodes) {
      if (data.episodes.info) {
        setTotalPages(data.episodes.info.pages);
      }

      if (data.episodes.results) {
        const episodesList = [...data.episodes.results];
        const orderedEpisodes =
          orderById === 1 ? episodesList : episodesList.reverse();
        setEpisodes(oldState => [...oldState, ...orderedEpisodes]);
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
          <HeaderContent>
            <Input
              placeholder="Episode Name"
              handleInputSearch={handleCharacterName}
              isValueEmpty={episodeName === ''}
            />

            <Filter
              modalTitle="Sort by"
              defaultSelectedId={orderById}
              onConfirm={handleConfirm}
            />
          </HeaderContent>
        </Header>
      </TouchableWithoutFeedback>

      {episodes && (
        <FlatList
          data={episodes}
          keyExtractor={item => String(item.id)}
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

      {episodeName !== '' && (
        <SyncButton onPress={handleRefreshSearch}>
          <SyncIcon name="refresh-cw" size={24} />
        </SyncButton>
      )}

      <ModalStyled
        visible={visible}
        onDismiss={handleCloseModal}
        hasFlatlist={true}>
        <CharactersModal characters={characters} />
      </ModalStyled>
    </Container>
  );
};

export default Episodes;
