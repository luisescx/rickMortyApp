import React, {createContext, useCallback, useMemo, useState} from 'react';

interface EpisodesProps {
  episodes: Episode[];
  handleEpisodes: (episodes: Episode[]) => void;
}

export const EpisodeContext = createContext({} as EpisodesProps);

const EpisodeProvider: React.FC = ({children}) => {
  const [episodes, setCharacters] = useState<Episode[]>([]);

  const handleEpisodes = useCallback((episodesList: Episode[]) => {
    setCharacters(episodesList);
  }, []);

  const value = useMemo(
    () => ({
      episodes,
      handleEpisodes,
    }),
    [episodes, handleEpisodes],
  );

  return (
    <EpisodeContext.Provider value={value}>{children}</EpisodeContext.Provider>
  );
};

export default EpisodeProvider;
