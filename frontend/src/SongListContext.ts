import React from 'react';
import type { SongListState } from './types';

const SongListContext: React.Context<SongListState> = React.createContext<SongListState>(null);

export default SongListContext;
