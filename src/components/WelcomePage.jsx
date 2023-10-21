// WelcomePage.jsx
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const WelcomePage = ({ onGetStarted }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h3" gutterBottom>
                Welcome to Slitherman Pomodoro
            </Typography>
            <Typography variant="h6" gutterBottom>
                Stay productive and manage your tasks effectively with the Pomodoro Technique.
            </Typography>
            <Button variant="contained" color="primary" onClick={onGetStarted} size="large">
                Get Started
            </Button>
        </Box>
    );
};

export default WelcomePage;
