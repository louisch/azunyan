import React from 'react';

import useSongLoader from './useSongLoader';
import useSongSearch from './useSongSearch';
import { SongListContext, SongSearchContext } from './contexts';
import SongList from './SongList';


function App(): React.ReactElement {
  const songList = useSongLoader();
  const songSearch = useSongSearch(songList);

  return (
    <SongListContext.Provider value={songList}>
      <SongSearchContext.Provider value={songSearch}>
        <div className="w-full h-full flex flex-col items-center">
          <div className="w-full p-4 bg-gray-200 shadow">
            <h1 className="text-xl">Azunyan</h1>
            <SongList />
          </div>
        </div>
      </SongSearchContext.Provider>
    </SongListContext.Provider>
  );
}


export default App;
