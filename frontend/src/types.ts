export type SongListState = SongList | Error | null;
export type SongList = Song[];
export interface Song {
  ID: string,
  creator: string,
  title: string,
  artist: string,
  source: string,
  language: string,
  bpm: string,
  is_duet: string,
  genre: string,
  year: string
}
