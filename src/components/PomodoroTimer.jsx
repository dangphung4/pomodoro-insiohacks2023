import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CircularProgress, Box, Typography } from "@mui/material";

const PomodoroTimer = ({ timerLength, breakLength }) => {
  const [minutes, setMinutes] = useState(timerLength);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    } else if (minutes === 0 && seconds === 0) {
      setIsActive(false); // Stop the timer

      if (isBreak) {
        setIsBreak(false); // Switch to work mode
        setMinutes(timerLength);
      } else {
        setIsBreak(true); // Switch to break mode
        setMinutes(breakLength);
      }
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak, timerLength, breakLength]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(timerLength);
    setSeconds(0);
  };

  const totalSeconds = timerLength * 60;
  const elapsedSeconds = (timerLength - minutes) * 60 + seconds;
  const progress = (elapsedSeconds / totalSeconds) * 100;

  return (
    <div>
      <Typography variant="h5" align="center" marginBottom={1}>
        {isBreak ? "Break" : "Study"}
      </Typography>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={100 - progress}
          size={180}
          thickness={3}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h3" component="div" color="textPrimary">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </Typography>
        </Box>
      </Box>
      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={startTimer}
          startIcon={<PlayArrowIcon />}
          style={{ marginRight: "10px" }}
        >
          Start
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={pauseTimer}
          startIcon={<PauseIcon />}
          style={{ marginRight: "10px" }}
        >
          Pause
        </Button>
        <Button
          variant="contained"
          onClick={resetTimer}
          startIcon={<RefreshIcon />}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
