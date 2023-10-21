import { useState, useEffect } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import PomodoroTimer from './components/PomodoroTimer';
import Tasks from './components/Tasks';  // Import the Tasks component
import { supabase } from './supabaseClient';
import { ThemeProvider, createTheme, CssBaseline, Button } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const [session, setSession] = useState(supabase.auth.getSession());
  const [guest, setGuest] = useState(false);
  const [user, setUser] = useState(null); // Add this state to hold the current user


  useEffect(() => {


    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user); // Update user state here
      console.log("APP.JSX Auth Event: ", event, "Current User: ", session?.user);

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
    <Button variant="contained" onClick={handleThemeToggle}>
          Toggle Theme
        </Button>
            <Auth onSkip={handleSkip} guestMode={guest} />
            
            {guest || session ? <PomodoroTimer /> : null }
            {guest || session ? <Tasks user={user} />: null }
            
        </div>
        </ThemeProvider>
  );
}

export default App;
