import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsIcon from '@mui/icons-material/Settings';

const WelcomePage = ({ onGetStarted, darkMode, handleThemeToggle, handleOpenSettings }) => {
    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            height="60vh"
            position="relative"
        >
            <Typography variant="h3" style={{ marginTop: '350px' }} gutterBottom>
                Welcome to Pomotivity
            </Typography>
            <Typography variant="h6" gutterBottom style={{ marginTop: '-10px', textAlign: 'center' }}>
                Stay productive and manage your tasks effectively with the Pomodoro Technique.
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={onGetStarted} 
                size="large" 
                style={{ marginTop: '15px' }}
            >
                Get Started
            </Button>
           
        </Box>

        
    );
};

export default WelcomePage;
