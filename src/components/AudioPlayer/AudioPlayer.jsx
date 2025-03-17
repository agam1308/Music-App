import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  BiSolidSkipPreviousCircle,
  BiSolidSkipNextCircle,
} from "react-icons/bi";
import { IoPlayCircleSharp, IoPauseCircleSharp } from "react-icons/io5";
import useAudio from "../../context/AudioContext";
import "./AudioPlayer.css";
import { CgClose } from "react-icons/cg";
import { FaVolumeUp } from "react-icons/fa";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audio = useRef(null);
  const [song, setSong] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [volume, setVolume] = useState(100);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [duration, setDuration] = useState(0);
  const { songId } = useAudio();

  const handleMusicPlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  };

  function fancyTimeFormat(duration, ret = false) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let res = "";

    if (hrs > 0) {
      res += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    res += "" + mins + ":" + (secs < 10 ? "0" : "");
    res += "" + secs;

    if (ret) {
      return res;
    } else {
      setDuration(res);
    }
  }

  const getSong = async (_name) => {
    try {
      const response = await axios.get(`https://saavn.dev/api/songs/${_name}`);
      setSong(response.data);
      setIsPlaying(true);
      console.log(song);
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  const getSongSuggestions = async (_id) => {
    try {
      const response = await axios.get(
        `https://saavn.dev/api/songs/${_id}/lyrics`
      );
      setLyrics(response.data);
      console.log(lyrics);
    } catch (error) {
      console.error("Error fetching lyrics:", error.message);
    }
  };

  useEffect(() => {
    getSong(songId);
    getSongSuggestions(songId);
  }, [songId]);

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    fancyTimeFormat(currentDuration);
  }, [currentDuration]);

  if (!song) return null;

  return (
    <div>
      <div
        className={`fixed-bottom w-100 py-2 px-4 bg-primary d-flex align-items-center`}
        style={{ height: "100px", zIndex: 10001, top: "calc(100vh - 100px)" }}
        onClick={() => setIsFullScreen(!isFullScreen)}
      >
        <input
          type="range"
          name="seek"
          id="seek"
          min="0"
          value={currentDuration}
          max={song.data[0].duration}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            setIsPlaying(false);
            audio.current.pause();
            setCurrentDuration(e.target.value);
            audio.current.currentTime = currentDuration;
            console.log(currentDuration);
          }}
          onMouseUp={() => {
            setIsPlaying(true);
            audio.current.play();
          }}
          className="position-absolute"
          style={{
            top: -10,
            left: 0,
            width: "100%",
          }}
        />
        <div className="row w-100">
          <div className="col-4 d-flex align-items-center gap-2">
            <img
              src={
                song
                  ? song.data[0].image[1].url
                  : "https://static.turbosquid.com/Preview/2014/05/21__03_48_03/dummy_6.jpg8ed0eb08-e208-48e0-a1ae-9dc0805bcc6cZoom.jpg"
              }
              alt=""
              className="rounded"
              style={{ width: "80px" }}
            />
            <div className="container-fluid">
              <h5 className="w-100 mb-0">{song?.data[0].name}</h5>
              <p>{song?.data[0].artists.primary[0].name}</p>
              <p>
                {duration} / {fancyTimeFormat(song.data[0].duration, true)}
              </p>
            </div>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center gap-1">
            <BiSolidSkipPreviousCircle className="h1 mb-0" />
            {isPlaying ? (
              <IoPauseCircleSharp
                className="display-4 mx-3"
                onClick={handleMusicPlay}
              />
            ) : (
              <IoPlayCircleSharp
                className="display-4 mx-3"
                onClick={handleMusicPlay}
              />
            )}
            <BiSolidSkipNextCircle className="h1 mb-0" />
          </div>

          <div className="col-4 d-flex justify-content-end align-items-center">
            <FaVolumeUp className="fs-4" />
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={volume}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                e.stopPropagation();
                setVolume(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      {song && (
        <audio
          src={song.data[0].downloadUrl[4].url}
          controls={true}
          className="d-none"
          ref={audio}
          autoPlay={true}
          onTimeUpdate={(e) => {
            if (isPlaying) {
              setCurrentDuration(e.target.currentTime);
            }
          }}
        ></audio>
      )}

      <div
        className={`audio-full-screen ${
          isFullScreen ? "full-screen-show" : "full-screen-close"
        }`}
      >
        <div className="row">
          <div className="col-12 d-flex justify-content-end py-4 px-5">
            <CgClose
              className="fs-2"
              style={{ color: "white", cursor: "pointer" }}
              onClick={() => setIsFullScreen(false)}
            />
          </div>
        </div>

        <div className="row px-5">
          <div className="col-4 d-flex flex-column" style={{ height: "80vh" }}>
            <img
              src={song.data[0].image[2].url}
              className="img-fluid rounded"
              alt=""
            />
            <h3 className="text-light">{song.data[0].name}</h3>
            <p className="text-light">
              {song.data[0].artists.primary.map((artist) => (
                <span key={artist.id}>{artist.name}, &nbsp;</span>
              ))}
              {song.data[0].artists.featured.map((artist, index) => (
                <span key={artist.id}>
                  {artist.name}
                  {index !== song.data[0].artists.featured.length - 1 &&
                    ","}{" "}
                  &nbsp;
                </span>
              ))}
            </p>
          </div>
          <div className="col-8" style={{ height: "70vh", overflowY: "auto" }}>
            {lyrics && (
              <p
                className="text-light text-center"
                dangerouslySetInnerHTML={{ __html: lyrics?.data.lyrics }}
              ></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
