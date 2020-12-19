export type SongListState = SongList | Error | null;
export type SongList = Song[];
export interface Song {
  title: string,
  artist: string,
}
