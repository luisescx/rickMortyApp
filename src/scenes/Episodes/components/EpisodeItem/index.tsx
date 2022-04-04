import React from 'react';
import {Button, Description} from './styles';

interface EpisodeItemProps {
  index: number;
  selected: boolean;
  id: string;
  name: string;
  air_date: string;
  isModal?: boolean;
  onPress?: (id: string) => void;
}

const EpisodeItem = ({
  index,
  id,
  name,
  selected,
  air_date,
  isModal = false,
  onPress,
}: EpisodeItemProps) => {
  return (
    <Button
      hitSlop={{top: 8, right: 8, bottom: 8, left: 8}}
      index={index}
      activeOpacity={isModal ? 1 : 0.5}
      onPress={() => (onPress ? onPress(id) : null)}>
      <Description isSelected={selected}>
        {id} - {name}
      </Description>
      <Description isSelected={selected}>Air Date: {air_date}</Description>
    </Button>
  );
};

export default EpisodeItem;
