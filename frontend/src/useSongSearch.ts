import { useEffect, useState } from 'react';
import MiniSearch from 'minisearch';

import type { SongListState, Song } from './types';


const miniSearch = new MiniSearch<Song>({
  idField: 'ID',
  fields: ['title', 'artist'],
  storeFields: ['ID', 'title', 'artist']
});

function useSongSearch(songList: SongListState): MiniSearch | null {
  const [miniSearchState, setMiniSearch] = useState<MiniSearch | null>(null);

  useEffect(() => {
    miniSearch.removeAll();
    if (songList instanceof Array) {
      miniSearch.addAllAsync(songList).then(() => {
        setMiniSearch(miniSearch);
      });
    } else {
      setMiniSearch(null);
    }
  }, [songList]);

  return miniSearchState;
}


export default useSongSearch;
