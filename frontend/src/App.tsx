import React from 'react';

import useSongLoader from './useSongLoader';
import SongListContext from './SongListContext';


function App(): React.ReactElement {
  const songList = useSongLoader();

  return (
    <SongListContext.Provider value={songList}>
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-full p-4 bg-gray-200 shadow">
          <h1 className="text-xl">Azunyan</h1>
        </div>
      </div>
    </SongListContext.Provider>
  );
}


export default App;
