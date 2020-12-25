import React, { createContext } from 'react';
import type MiniSearch from 'minisearch';
import type { SongListState } from './types';

const SongListContext: React.Context<SongListState> = createContext<SongListState>(null);
const SongSearchContext: React.Context<MiniSearch | null> = createContext<MiniSearch | null>(null);

export { SongListContext, SongSearchContext };
