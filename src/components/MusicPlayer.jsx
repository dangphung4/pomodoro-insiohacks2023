import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Slider,
  Grid,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import YouTube from "react-youtube";

const MusicPlayer = ({ playlistURL }) => {
  const [originalPlaylist, setOriginalPlaylist] = useState([]);
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50); // Default volume
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false); // State for shuffle mode

  const playerRef = useRef(null);

  useEffect(() => {
    fetch(playlistURL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Playlist: ", data);
        setOriginalPlaylist(data);
        setShuffledPlaylist([...data]); // Create a shuffled copy of the playlist
      });
  }, [playlistURL]);

  useEffect(() => {
    if (shuffle) {
      // Shuffle the playlist when shuffle mode is enabled
      const shuffledCopy = [...shuffledPlaylist];
      for (let i = shuffledCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCopy[i], shuffledCopy[j]] = [shuffledCopy[j], shuffledCopy[i]];
      }
      setShuffledPlaylist(shuffledCopy);
    } else {
      // If shuffle mode is disabled, revert to the original playlist order
      setShuffledPlaylist([...originalPlaylist]);
    }
  }, [shuffle, originalPlaylist]);

  const playNext = () => {
    if (shuffle) {
      // If shuffle is enabled, generate a random index for the next track
      const randomIndex = Math.floor(Math.random() * shuffledPlaylist.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      // If shuffle is disabled, increment the index
      if (currentTrackIndex < shuffledPlaylist.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        setCurrentTrackIndex(0);
      }
    }
  };

  const playPrev = () => {
    if (shuffle) {
      // If shuffle is enabled, generate a random index for the previous track
      const randomIndex = Math.floor(Math.random() * shuffledPlaylist.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      // If shuffle is disabled, decrement the index
      if (currentTrackIndex > 0) {
        setCurrentTrackIndex(currentTrackIndex - 1);
      } else {
        setCurrentTrackIndex(shuffledPlaylist.length - 1);
      }
    }
  };

  const handlePlayPause = () => {
    const player = playerRef.current;
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      player.setVolume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  if (!shuffledPlaylist.length) return null;

  const currentTrack = shuffledPlaylist?.[currentTrackIndex];

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
    },
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  return (
    <div>
      <YouTube
        videoId={currentTrack?.snippet?.resourceId?.videoId}
        opts={opts}
        onReady={(event) => {
          playerRef.current = event.target;
          event.target.setVolume(isMuted ? 0 : volume);
        }}
      />
      <Card
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <CardMedia
          component="img"
          image={currentTrack?.snippet?.thumbnails?.medium?.url || ""}
          alt={currentTrack?.snippet?.title || ""}
          style={{ width: "60px", height: "60px", flex: 1 }}  // <-- Adjusted here
          />
        <CardContent
          style={{
            justifyContent: "center",
            alignItems: "center",
            
          }}
        >
          <Typography
            variant="subtitle1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "80%",
            }}
          >
            {currentTrack?.snippet?.title}
          </Typography>
        </CardContent>

        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <IconButton onClick={playPrev}>
              <SkipPreviousIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={playNext}>
              <SkipNextIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={toggleShuffle}>
              <ShuffleIcon style={{ color: shuffle ? "blue" : "gray" }} />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <Slider
              value={isMuted ? 0 : volume}
              onChange={(event, newValue) => setVolume(newValue)}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="off"
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default MusicPlayer;
