import React, { useContext, useMemo, useState } from 'react';
import { SongListContext, SongSearchContext } from './contexts';
import type MiniSearch from 'minisearch';
import type { SearchResult } from 'minisearch';
import type { SongListState, Song } from './types';


function SongList(): React.ReactElement {
  const songList: SongListState = useContext(SongListContext);
  const songSearch: MiniSearch<Song> | null = useContext(SongSearchContext);

  const [searchQuery, setSearchQuery] = useState<string>('');
  function handleSongQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }
  const searchResults = useMemo<SearchResult[] | null>(() => {
    if (searchQuery !== undefined && songSearch !== null) {
      return songSearch.search(searchQuery);
    }
    return null;
  }, [searchQuery]);

  return (
    <div>
      <input type="text" name="search_query" id="search_query" className="mt-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full max-w-2xl p-4 shadow-sm sm:text-sm border-gray-300 rounded-md" value={searchQuery} onChange={handleSongQuery}/>
      <div className="mt-8 w-full h-full flex flex-col shadow">
        {(songList instanceof Array) ? (
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Artist
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchResults !== null ? (
                      searchResults.map(({ ID, title, artist }) => (
                        <tr key={ID}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {ID}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {artist}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      songList.map(({ ID, title, artist}) => (
                        <tr key={ID}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {ID}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {artist}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          songList === null ? (
            <div>Songs not loaded yet</div>
          ) : (
            <div>Songs could not be loaded!</div>
          )
        )}
      </div>
    </div>
  );
}


export default SongList;
