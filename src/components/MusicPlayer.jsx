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
import zIndex from "@mui/material/styles/zIndex";

const MusicPlayer = ({ playlistURL }) => {
  const [originalPlaylist, setOriginalPlaylist] = useState([]);
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userClickedPlay, setUserClickedPlay] = useState(false);
  const [volume, setVolume] = useState(50); // Default volume
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false); // State for shuffle mode
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [userIsScrubbing, setUserIsScrubbing] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [userScrubbedFirst, setUserScrubbedFirst] = useState(false);


  const updateIntervalRef = useRef(null); //ref to store the interval ID

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
        // Store the current song's ID
        const currentSongID = shuffledPlaylist[currentTrackIndex]?.snippet?.resourceId?.videoId;

        // Shuffle the playlist
        const shuffledCopy = [...originalPlaylist];
        for (let i = shuffledCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCopy[i], shuffledCopy[j]] = [shuffledCopy[j], shuffledCopy[i]];
        }
        setShuffledPlaylist(shuffledCopy);

        // Set the current track index to the shuffled position of the current song
        const newIndex = shuffledCopy.findIndex(track => track.snippet.resourceId.videoId === currentSongID);
        setCurrentTrackIndex(newIndex !== -1 ? newIndex : 0);
    } else {
        // If un-shuffled, revert to the original position
        const currentSongID = shuffledPlaylist[currentTrackIndex]?.snippet?.resourceId?.videoId;
        const originalIndex = originalPlaylist.findIndex(track => track.snippet.resourceId.videoId === currentSongID);
        setCurrentTrackIndex(originalIndex !== -1 ? originalIndex : 0);
        setShuffledPlaylist([...originalPlaylist]);
    }
}, [shuffle, originalPlaylist]);


  const handleSongChange = () => {
    setIsLoading(true);
  };

  const handleSongLoaded = () => {
    setIsLoading(false);
    setIsPlaying(true);
  };

  const playNext = () => {
    if (!isLoading) {
        setCurrentTime(0);
        const newIndex = (currentTrackIndex + 1) % shuffledPlaylist.length;
        setCurrentTrackIndex(newIndex);
        handleSongChange();
    }
};

const playPrev = () => {
    if (!isLoading) {
        setCurrentTime(0);
        const newIndex = (currentTrackIndex - 1 + shuffledPlaylist.length) % shuffledPlaylist.length;
        setCurrentTrackIndex(newIndex);
        handleSongChange();
    }
};


const handlePlayPause = () => {
  setUserClickedPlay(true);
  const player = playerRef.current;
  if (player && playerReady) {
    // If the song hasn't been played before and the user has scrubbed, seek to the current slider position
    if (!isPlaying && userScrubbedFirst) {
      player.seekTo(currentTime);
    }

    // Check if the player is ready
    if (!isPlaying) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
    setIsPlaying(!isPlaying); // Toggle the isPlaying state
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
          setDuration(event.target.getDuration());
          setPlayerReady(true);
          if (isPlaying && !userScrubbedFirst) {
            event.target.playVideo();
          } else {
            event.target.pauseVideo();
          }
        }}
        
        onStateChange={(event) => {
          // Clear any existing intervals whenever the state changes
          if (updateIntervalRef.current) {
            clearInterval(updateIntervalRef.current);
            updateIntervalRef.current = null;
          }

          if (event.data === YouTube.PlayerState.PLAYING && !userIsScrubbing) {
            setIsPlaying(true); // Update the isPlaying state here
            handleSongLoaded();
            updateIntervalRef.current = setInterval(() => {
              setCurrentTime(event.target.getCurrentTime());
            }, 1000);
          }

          if (event.data === YouTube.PlayerState.PAUSED) {
            setIsPlaying(false); // Update the isPlaying state here
          }

          if (event.data === YouTube.PlayerState.ENDED) {
            if (isPlaying) {
              playNext();
            }
          }
        }}
      />

      <Card
      className="music-player-card"
        style={{
          display: "flex",
          padding: "10px",
          width: "480px",
          alignItems: "center",
          borderRadius: "22px",
        }}
      >
        <CardMedia
            className="music-player-thumbnail"
          component="img"
          image={currentTrack?.snippet?.thumbnails?.medium?.url || ""}
          alt={currentTrack?.snippet?.title || ""}
          style={{
            width: "60px",
            height: "60px",
            marginLeft: "10px",
            marginRight: "0px",
            flexShrink: 0,
            borderRadius: "5px",
          }}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Slider
            style={{
              width: "90%",
            }}
            value={currentTime}
            max={duration}
            onChange={(event, newValue) => {
              setUserIsScrubbing(true);
              setCurrentTime(newValue);
              if (updateIntervalRef.current) {
                clearInterval(updateIntervalRef.current);
                updateIntervalRef.current = null;
              }
              if (!userClickedPlay) {
                setUserScrubbedFirst(true);
              }
            }}
            onChangeCommitted={(event, newValue) => {
              if (userClickedPlay) {
                playerRef.current.seekTo(newValue);
                setUserIsScrubbing(false);
                if (!updateIntervalRef.current) {
                  updateIntervalRef.current = setInterval(() => {
                    setCurrentTime(playerRef.current.getCurrentTime());
                  }, 100);
                }
              }
            }}
            
            aria-labelledby="song-scrubber"
          />

          <Typography
              className="music-player-title"

            variant="subtitle1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "80%",
              textAlign: "left",
              marginBottom: "10px",
              marginRight: "30px",
              width: "auto",
              cursor: "pointer",
            }}
          >
            {currentTrack?.snippet?.title}
          </Typography>

          <Grid
              className="music-controls-grid"

            container
            alignItems="center"
            spacing={2}
            justifyContent="center"
          >
            <Grid item>
              <IconButton onClick={playPrev}>
                <SkipPreviousIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={handlePlayPause}>
                {userClickedPlay && isPlaying ? (
                  <PauseIcon />
                ) : (
                  <PlayArrowIcon />
                )}
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
        </div>
      </Card>
    </div>
  );
};

export default MusicPlayer;