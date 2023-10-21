import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RefreshIcon from '@mui/icons-material/Refresh';

const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval;

        if (isActive && (minutes > 0 || seconds > 0)) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 0) {
                        setMinutes(prevMinutes => prevMinutes - 1);
                        return 59;
                    } else {
                        return prevSeconds - 1;
                    }
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, seconds, minutes]);

    const startTimer = () => {
        setIsActive(true);
    };

    const pauseTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMinutes(25);
        setSeconds(0);
    };

    return (
        <div>
            <h1>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </h1>
            <Button variant="contained" color="primary" onClick={startTimer} startIcon={<PlayArrowIcon />}>
                Start
            </Button>
            <Button variant="contained" color="secondary" onClick={pauseTimer} startIcon={<PauseIcon />}>
                Pause
            </Button>
            <Button variant="contained" onClick={resetTimer} startIcon={<RefreshIcon />}>
                Reset
            </Button>
        </div>
    );
};

export default PomodoroTimer;
