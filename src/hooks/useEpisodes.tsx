import {useContext} from 'react';
import {EpisodeContext} from '@/contexts/EpisodesContext';

const useEpisodes = () => {
  const context = useContext(EpisodeContext);

  if (context) {
    return context;
  }

  throw new Error('Episode provider must be setted.');
};

export default useEpisodes;
