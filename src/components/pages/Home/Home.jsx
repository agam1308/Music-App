import axios from "axios";
import { useEffect, useState } from "react";
import useAudio from "../../../context/AudioContext";

const Home = () => {
  const [songs, setSongs] = useState(null);
  const { setSong, songId, searchSong } = useAudio();
  const handleClick = (id) => {
    setSong(id);
    console.log(songId);
  };
  const getSongs = async (_name) => {
    try {
      const response = await axios.get(
        `https://saavn.dev/api/search/songs?query=${_name}&limit=80`
      );
      setSongs(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getSongs(searchSong);
  }, [searchSong]);

  if (songs) {
    return (
      <div
        style={{ paddingTop: "80px", paddingBottom: "100px" }}
        className="container-fluid"
      >
        <div className="row">
          {songs.data.results.map((song) => (
            <div className="col" onClick={() => handleClick(song.id)}>
              <img src={song.image[1].url} alt="" />
              <p>{song.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div style={{ paddingTop: "80px" }}>Loading</div>;
  }
};

export default Home;
