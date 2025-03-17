import { useState } from "react";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import Nav from "./components/Nav/Nav";
import Home from "./components/pages/Home/Home";
import "./theme.scss";
import * as bootstrap from "bootstrap";
import { AudioProvider } from "./context/AudioContext";

const App = () => {
  const [songId, setSongId] = useState("");
  const [searchSong, setSearchSong] = useState("null");
  function setSearch(value) {
    setSearchSong(value);
  }
  function setSong(id) {
    setSongId(id);
  }
  return (
    <div>
      <AudioProvider value={{ setSong, songId, searchSong, setSearch }}>
        <Nav />
        <Home />
        <AudioPlayer />
      </AudioProvider>
    </div>
  );
};
export default App;
