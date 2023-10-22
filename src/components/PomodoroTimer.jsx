import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RefreshIcon from '@mui/icons-material/Refresh';
import { CircularProgress, Box, Typography } from '@mui/material';

const PomodoroTimer = ({ timerLength, breakLength }) => {
  const [timeInSeconds, setTimeInSeconds] = useState(timerLength * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && timeInSeconds > 0) {
      interval = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeInSeconds === 0) {
      setIsActive(false);

      if (isBreak) {
        setIsBreak(false);
        setTimeInSeconds(timerLength * 60);
      } else {
        setIsBreak(true);
        setTimeInSeconds(breakLength * 60);
      }
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeInSeconds, isBreak, timerLength, breakLength]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeInSeconds(timerLength * 60);
  };

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const progress = (100 * (isBreak ? breakLength * 60 - timeInSeconds : timerLength * 60 - timeInSeconds)) / (isBreak ? breakLength * 60 : timerLength * 60);


  return (
    <div className="pomodoro-section">
      <Typography variant="h5" align="center" marginBottom={1} fontSize="3rem">
        {isBreak ? "Break" : "Study"}
      </Typography>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={100 - progress}
          size={475}
          thickness={3.5}
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
          <Typography variant="h2" fontSize={"125px"} fontWeight="500" component="div" color="textPrimary">
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
