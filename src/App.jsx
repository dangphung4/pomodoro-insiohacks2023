import { useState, useEffect } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import PomodoroTimer from "./components/PomodoroTimer";
import Tasks from "./components/Tasks";
import { supabase } from "./supabaseClient";
import WelcomePage from "./components/WelcomePage";
import MusicPlayer from "./components/MusicPlayer";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Logout from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icon for authentication

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [authMenuAnchor, setAuthMenuAnchor] = useState(null); // State to manage the anchor element of the auth menu
  const [session, setSession] = useState(supabase.auth.getSession());
  const [guest, setGuest] = useState(false);
  const [user, setUser] = useState(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false); // State to manage the authentication dialog
  const [showWelcome, setShowWelcome] = useState(true); // State to manage showing the welcome page

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [timerLength, setTimerLength] = useState(25); // Default to 25 minutes
  const [breakLength, setBreakLength] = useState(5); // Default to 5 minutes break
  const [tempCustomPlaylistURL, setTempCustomPlaylistURL] = useState(""); // Temporary custom playlist URL
  const [customPlaylistURL, setCustomPlaylistURL] = useState(""); 


  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#A3A3A3" : "#2B2B2B",
      },
      secondary: {
        main: darkMode ? "#C1C1C1" : "#2D2D2D",
      },
      login: {
        main: darkMode ? "#A3A3A3" : "#A3A3A3",
      },
    },
    typography: {
      fontFamily: "Inter, sans-serif",
      h1: {
        fontSize: "1rem",
      },
      h5: {
        fontWeight: "bold",
      },
      main: darkMode ? "#FFFFFF" : "#CBD7DF",
    },
  });

  const extractPlaylistID = (url) => {
    const match = url.match(/[?&]list=([^&]+)/);
    if (match) {
      const playlistID = match[1];
      return `https://mtyy3u5dh5.execute-api.us-east-1.amazonaws.com/dev/api/playlist/${playlistID}`;
    }
    return null;
  };


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

  const handleGetStarted = () => {
    setShowWelcome(false);
    setAuthDialogOpen(true);
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session) {
          setAuthDialogOpen(false);
          setShowWelcome(false);
        }
        setUser(session?.user);
        console.log(
          "APP.JSX Auth Event:",
          event,
          "Current User:",
          session?.user
        );
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSkip = () => {
    setGuest(true);
    setAuthDialogOpen(false);
  };

  const handleOpenSettings = () => {
    setTempCustomPlaylistURL(customPlaylistURL); // Set the temporary URL to the current custom URL
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  const handleSaveSettings = (newTimerLength, newBreakLength) => {
    setTimerLength(newTimerLength);
    setBreakLength(newBreakLength);
    
    const extractedURL = extractPlaylistID(tempCustomPlaylistURL);
    if (extractedURL) {
      setCustomPlaylistURL(extractedURL);
    } else {
      // Handle the case where the URL is invalid
      // You can show an error message or reset to a default URL
      setCustomPlaylistURL("https://mtyy3u5dh5.execute-api.us-east-1.amazonaws.com/dev/api/lofi");
    }
    
    handleCloseSettings();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowWelcome(true);
    setGuest(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {showWelcome ? (
          <WelcomePage onGetStarted={handleGetStarted} />
        ) : (
          <>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h5" align="center" style={{ flexGrow: 1 }}>
                  Productivity Pom
                </Typography>
                {session ? (
                  <IconButton color="inherit" onClick={handleSignOut}>
                    <ExitToAppIcon />
                  </IconButton>
                ) : (
                  <IconButton color="primary" onClick={handleOpenAuthDialog}>
                    <AccountCircleIcon sx={{ color: "#A1A1A1" }} />
                  </IconButton>
                )}
              </Toolbar>
            </AppBar>
            <div className="main-content">
              <div className="timer-section">
                {guest || session ? (
                  <PomodoroTimer
                    key={timerLength}
                    timerLength={timerLength}
                    breakLength={breakLength}
                  />
                ) : null}
              </div>
              <div className="tasks-section">
                {guest || session ? <Tasks user={user} /> : null}
              </div>
              
            </div>
            <div className="music-section">
            {guest || session ? ( // Conditionally render MusicPlayer
    <MusicPlayer playlistURL={customPlaylistURL || "https://mtyy3u5dh5.execute-api.us-east-1.amazonaws.com/dev/api/lofi"} />
  ) : null}
  </div>
            <footer className="footer-section">
              
              <IconButton color="primary" onClick={handleThemeToggle}>
                {darkMode ? (
                  <DarkModeIcon />
                ) : (
                  <LightModeIcon sx={{ color: "#A1A1A1" }} />
                )}
              </IconButton>
              <IconButton color="primary" onClick={handleOpenSettings}>
                <SettingsIcon />
              </IconButton>
            </footer>

            <Dialog
              open={authDialogOpen}
              onClose={handleCloseAuthDialog}
              maxWidth="100%"
            >
              <DialogContent sx={{ padding: "25% 85px" }}>
                <Auth
                  onSkip={handleSkip}
                  guestMode={guest}
                  darkMode={darkMode}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={settingsOpen} onClose={handleCloseSettings}>
              <Typography
                variant="h5"
                fontWeight={"bold"}
                align="center"
                marginTop={1}
              >
                Settings
              </Typography>
              <DialogContent>
                <TextField
                  label="Timer Length (minutes)"
                  value={timerLength}
                  onChange={(e) => setTimerLength(Number(e.target.value))}
                />
                <TextField
                  label="Break Length (minutes)"
                  value={breakLength}
                  onChange={(e) => setBreakLength(Number(e.target.value))}
                />
                <TextField
                  label="Custom Playlist URL"
                  value={tempCustomPlaylistURL}
                  onChange={(e) => setTempCustomPlaylistURL(e.target.value)}
                  placeholder="Enter a custom playlist URL"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseSettings}>Cancel</Button>
                <Button
                  onClick={() => handleSaveSettings(timerLength, breakLength)}
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
