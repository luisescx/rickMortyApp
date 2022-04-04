import React, {useCallback} from 'react';
import EpisodeItem from '@/scenes/Episodes/components/EpisodeItem';
import {FlatList} from 'react-native';
import {OptionContainer, SubTitle, Title} from './styles';
import {Footer} from '@/components';

interface DetailModalProps {
  character: Character;
  onClose: () => void;
}

const DetailModal = ({character, onClose}: DetailModalProps) => {
  const {name, episode, location} = character;

  const renderItem = useCallback(
    ({item, index}) => (
      <EpisodeItem {...item} index={index} selected={false} isModal />
    ),
    [],
  );

  return (
    <>
      <Title>{name}</Title>

      <SubTitle>{location?.name}</SubTitle>

      <OptionContainer>
        <FlatList
          data={episode}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
          }}
        />
      </OptionContainer>

      <Footer onPress={onClose} label="Close" />
    </>
  );
};

export default DetailModal;
