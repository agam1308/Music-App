import { createContext, useContext } from "react";

const AudioContext = createContext({
  songId: null,
  setSong: () => {},
  searchSong: "",
  setSearch: () => {},
});
export const AudioProvider = AudioContext.Provider;

export default function useAudio() {
  return useContext(AudioContext);
}
