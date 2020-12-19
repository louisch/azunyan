import React, { useContext } from 'react';
import SongListContext from './SongListContext';
import type { SongListState } from './types';


function SongList(): React.ReactElement {
  const songList: SongListState = useContext(SongListContext);

  return (
    <div className="mt-8 w-full h-full max-w-2xl p-8 bg-gray-200 sm:rounded-md shadow">
      {songList instanceof Array ? songList.map((song, index) => (
        <div className="w-full p-4" key={index}>
          {song.title}
        </div>
      )) : (
        songList === null ? (
          <div>Songs not loaded yet</div>
        ) : (
          <div>Songs could not be loaded!</div>
        )
      )}
    </div>
  );
}


export default SongList;
