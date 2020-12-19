import { useEffect, useState } from 'react';

import type { SongListState, SongList } from './types';


const HOST = 'http://localhost:8000';

function useSongLoader(): SongListState {
  const [songList, setSongList] = useState<SongListState>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch(`${HOST}/api/getsongslist`);
        console.log(response)
        const songs = await response.json();
        console.log(songs)
        if (!cancelled) {
          setSongList(songs);
        }
      } catch (e) {
        setSongList(e)
      }
    }
    load();
    return () => {
      cancelled = true;
    }
  }, []);

  return songList;
}


export type { SongListState, SongList };
export default useSongLoader;
