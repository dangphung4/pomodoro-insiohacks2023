import { useState, useEffect } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import PomodoroTimer from './components/PomodoroTimer';
import Tasks from './components/Tasks';
import { supabase } from './supabaseClient';
import { ThemeProvider, createTheme, CssBaseline, IconButton, AppBar, Toolbar, Typography, Menu, MenuItem, Dialog, DialogContent } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icon for authentication

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [authMenuAnchor, setAuthMenuAnchor] = useState(null); // State to manage the anchor element of the auth menu
  const [session, setSession] = useState(supabase.auth.getSession());
  const [guest, setGuest] = useState(false);
  const [user, setUser] = useState(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false); // State to manage the authentication dialog

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#A3A3A3' : '#2B2B2B',
      },
      secondary: {
        main: darkMode ? '#C1C1C1' : '#2D2D2D',
      },
      login: {
        main: darkMode ? '#A3A3A3' : '#A3A3A3',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      h1: {
        fontSize: '1rem',
      },
      h5: {
        fontWeight: 'bold',
      },
      main: darkMode ? '#FFFFFF' : '#CBD7DF',
    },
  });

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleOpenAuthMenu = (event) => {
    setAuthMenuAnchor(event.currentTarget); // Open the auth menu
  };

  const handleCloseAuthMenu = () => {
    setAuthMenuAnchor(null); // Close the auth menu
  };

  const handleOpenAuthDialog = () => {
    setAuthDialogOpen(true); // Open the authentication dialog
  };

  const handleCloseAuthDialog = () => {
    setAuthDialogOpen(false); // Close the authentication dialog
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user);
      console.log('APP.JSX Auth Event:', event, 'Current User:', session?.user);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSkip = () => {
    setGuest(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" align="center" style={{ flexGrow: 1 }}>
              Slitherman Pomodoro
            </Typography>

            <IconButton
              color="primary"
              onClick={handleOpenAuthDialog}
            >
              <AccountCircleIcon sx={{ color: '#A1A1A1' }}/> {/* Icon for authentication */}
            </IconButton>

            <IconButton color="primary" onClick={handleThemeToggle}>
              {darkMode ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon sx={{ color: '#A1A1A1' }} />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
        {guest || session ? <Tasks user={user} /> : null}
        {guest || session ? <PomodoroTimer /> : null}

        <Dialog
          open={authDialogOpen}
          onClose={handleCloseAuthDialog}
          maxWidth="100%" // Set the maximum width of the dialog
        >
          <DialogContent sx={{ padding: '25% 85px' }}>
            <Auth onSkip={handleSkip} guestMode={guest} darkMode={darkMode} />
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default App;
