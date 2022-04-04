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
import {useEpisodes} from '@/hooks';

const Episodes = () => {
  const [page, setPage] = useState(1);
  const [episodeName, setEpisodeName] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [orderById, setOrderById] = useState(1);
  const [visible, setIsVisible] = useState(false);
  const [info, setInfo] = useState<Info>({
    count: 0,
    next: 0,
    pages: 1,
    prev: 0,
  });

  const {colors} = useTheme();
  const {episodes, handleEpisodes} = useEpisodes();

  const {data, loading} = useQuery<EpisodeQuery>(episodesQuery, {
    variables: {
      page,
      filter: {
        name: episodeName,
      },
    },
  });

  const handleCharacterName = useCallback(
    (value: string) => {
      handleEpisodes([]);
      setInfo({
        ...info,
        count: 0,
        next: 0,
        prev: 0,
      });

      setPage(orderById === 1 ? 1 : info.pages);
      setEpisodeName(value);
    },
    [handleEpisodes, orderById, info],
  );

  const handleConfirm = useCallback(
    (selectedOrderId: number) => {
      if (selectedOrderId !== orderById) {
        setOrderById(selectedOrderId);

        if (episodes.length === info.count) {
          const orderedEpisodes = episodes.reverse();
          handleEpisodes([...orderedEpisodes]);
          return;
        }

        handleEpisodes([]);
        setInfo({
          ...info,
          count: 0,
          next: 0,
          prev: 0,
        });
        setPage(selectedOrderId === 1 ? 1 : info.pages);
      }
    },
    [orderById, episodes, info, handleEpisodes],
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

  const handleRefreshSearch = useCallback(() => {
    handleEpisodes([]);

    setInfo({
      ...info,
      count: 0,
      next: 0,
      prev: 0,
    });
    setEpisodeName('');

    setPage(orderById === 1 ? 1 : info.pages);
  }, [orderById, handleEpisodes, info]);

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
        setInfo({
          count: data.episodes.info.count,
          next: data.episodes.info.next,
          pages: data.episodes.info.pages,
          prev: data.episodes.info.prev,
        });
      }

      if (data.episodes.results) {
        const episodesList = [...data.episodes.results];
        const orderedEpisodes =
          orderById === 1 ? episodesList : episodesList.reverse();

        handleEpisodes([...episodes, ...orderedEpisodes]);
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

      {!!loading && !episodes.length && (
        <Loading isLoading={loading} size="large" isFullScreen />
      )}

      {episodes?.length > 0 && (
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
