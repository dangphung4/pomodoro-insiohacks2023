import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import PomodoroTimer from "./components/PomodoroTimer";
import Tasks from "./components/Tasks";
import { supabase } from "./supabaseClient";
import WelcomePage from "./components/WelcomePage";
import MusicPlayer from "./components/MusicPlayer";
import ResetPassword from './components/ResetPassword';  

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
  Slider,
  Switch,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useTheme } from '@mui/material/styles';
import Logout from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function App() {



  const THEMES = [
    {
      name: "default",
      light: {
        primary: "#4A4A4A",
        secondary: "#4A4A4A",
        text: "#1a1a1a"
      },
      dark: {
        primary: "#1a1a1a",
        secondary: "#1a1a1a",
        text: "#fafafa"
      }
    },
    {
      name: "8008",
      light: {
        primary: "#f44c7f",
        secondary: "#a2aebd",
        text: "#3c4756"
      },
      dark: {
        primary: "#3c4756",
        secondary: "#a2aebd",
        text: "#f44c7f"
      }
    },
    {
      name: "9009",
      light: {
        primary: "#b6b09a",
        secondary: "#b6b09a",
        text: "#2e2f33"
      },
      dark: {
        primary: "#2e2f33",
        secondary: "#2e2f33",
        text: "#b6b09a"
      }
    },
    {
      name: "leviathan",
      light: {
        primary: "#691f28",
        secondary: "#691f28",
        text: "#1a1a1a"
      },
      dark: {
        primary: "#1a1a1a",
        secondary: "#1a1a1a",
        text: "#691f28"
      }
    },
    {
      name: "carbon",
      light: {
        primary: "#ed6b21",
        secondary: "#ed6b21",
        text: "#575d5e"
      },
      dark: {
        primary: "#575d5e",
        secondary: "#575d5e",
        text: "#ed6b21"
      }
    },
    {
      name: "denim",
      light: {
        primary: "#b8835f",
        secondary: "#e3d5b9",
        text: "#454f63"
      },
      dark: {
        primary: "#454f63",
        secondary: "#e3d5b9",
        text: "#b8835f"
      }
    },
    {
      name: "dracula",
      light: {
        primary: "#bd93f9",
        secondary: "#ff79c6",
        text: "#282a36"
      },
      dark: {
        primary: "#282a36",
        secondary: "#ff79c6",
        text: "#bd93f9"
      }
    },
    {
      name: "eclipse",
      light: {
        primary: "#abc6dc",
        secondary: "#44475a",
        text: "#314f6f"
      },
      dark: {
        primary: "#314f6f",
        secondary: "#44475a",
        text: "#abc6dc"
      }
    },
    {
      name: "gruvbox",
      light: {
        primary: "#d79921",
        secondary: "#d79921",
        text: "#282828"
      },
      dark: {
        primary: "#282828",
        secondary: "#282828",
        text: "#d79921"
      }
    },
    {
      name: "handarbeit",
      light: {
        primary: "#bb2e17",
        secondary: "#71399a",
        text: "#1a1a1a"
      },
      dark: {
        primary: "#1a1a1a",
        secondary: "#71399a",
        text: "#bb2e17"
      }
    },
    {
      name: "hyperfuse",
      light: {
        primary: "#6c3c9d",
        secondary: "#25cdc5",
        text: "#25cdc5"
      },
      dark: {
        primary: "#555761",
        secondary: "#6c3c9d",
        text: "#25cdc5"
      }
    },
    {
      name: "mizu",
      light: {
        primary: "#b9d9eb",
        secondary: "#fafafa",
        text: "#253746"
      },
      dark: {
        primary: "#b9d9eb",
        secondary: "#253746",
        text: "#fafafa"
      }
    },
    {
      name: "moderndolch",
      light: {
        primary: "#81d8d0",
        secondary: "#bc5868",
        text: "#494b4f"
      },
      dark: {
        primary: "#494b4f",
        secondary: "#bc5868",
        text: "#81d8d0"
      }
    },
    {
      name: "monokai",
      light: {
        primary: "#A6E22E",
        secondary: "#A6E22E",
        text: "#171812"
      },
      dark: {
        primary: "#171812",
        secondary: "#171812",
        text: "#A6E22E"
      }
    },
    {
      name: "mrsleeves",
      light: {
        primary: "#d4d4d4",
        secondary: "#f5c7b8",
        text: "#f5c7b8"
      },
      dark: {
        primary: "#f5c7b8",
        secondary: "#f5c7b8",
        text: "#d4d4d4"
      }
    },
    {
      name: "nautilus",
      light: {
        primary: "#eac004",
        secondary: "#155d94",
        text: "#102c4e"
      },
      dark: {
        primary: "#102c4e",
        secondary: "#155d94",
        text: "#eac004"
      }
    },
    {
      name: "nord",
      light: {
        primary: "#eceff4",
        secondary: "#2e3440",
        text: "#2e3440"
      },
      dark: {
        primary: "#242933",
        secondary: "#2e3440",
        text: "#eceff4"
      }
    },
    {
      name: "oblivion",
      light: {
        primary: "#ffac00",
        secondary: "#c8c3b8",
        text: "#464746"
      },
      dark: {
        primary: "#464746",
        secondary: "#c8c3b8",
        text: "#ffac00"
      }
    },
    {
      name: "olivia",
      light: {
        primary: "#e8c4b8",
        secondary: "#e8c4b8",
        text: "#363434"
      },
      dark: {
        primary: "#363434",
        secondary: "#363434",
        text: "#e8c4b8"
      }
    },
    {
      name: "phantom",
      light: {
        primary: "#eed484",
        secondary: "#eed484",
        text: "#211333"
      },
      dark: {
        primary: "#211333",
        secondary: "#211333",
        text: "#eed484"
      }
    },
    {
      name: "rama",
      light: {
        primary: "#eaeaea",
        secondary: "#ffc700",
        text: "#ffc700"
      },
      dark: {
        primary: "#ffc700",
        secondary: "#ffc700",
        text: "#eaeaea"
      }
    },
    {
      name: "sakura",
      light: {
        primary: "#de1d57",
        secondary: "#de1d57",
        text: "#ff98ac"
      },
      dark: {
        primary: "#ff98ac",
        secondary: "#de1d57",
        text: "#ffffff"
      }
    },
    {
      name: "serika",
      light: {
        primary: "#ffcd00",
        secondary: "#302f2b",
        text: "#302f2b"
      },
      dark: {
        primary: "#302f2b",
        secondary: "#302f2b",
        text: "#ffcd00"
      }
    },
    {
      name: "solarizeddark",
      light: {
        primary: "#1a1a1a",
        secondary: "#002b36",
        text: "#2C2C2C"
      },
      dark: {
        primary: "#1a1a1a",
        secondary: "#1a1a1a",
        text: "#002b36"
      }
    },
    {
      name: "yuri",
      light: {
        primary: "#ea4221",
        secondary: "#abc6dc",
        text: "#293649"
      },
      dark: {
        primary: "#293649",
        secondary: "#abc6dc",
        text: "#ea4221"
      }
    },
    {
      name: "honeywell",
      light: {
        primary: "#cc2c24",
        secondary: "#e5e8e6",
        text: "#4d5151"
      },
      dark: {
        primary: "#4d5151",
        secondary: "#e5e8e6",
        text: "#cc2c24"
      }
    },
    {
      name: "spacecadet",
      light: {
        primary: "#dfeaef",
        secondary: "#e5e8e6",
        text: "#136EA3"
      },
      dark: {
        primary: "#136EA3",
        secondary: "#136EA3",
        text: "#dfeaef"
      }
    },
    {
      name: "godspeed",
      light: {
        primary: "#faee69",
        secondary: "#e5e8e6",
        text: "#32321d"
      },
      dark: {
        primary: "#32321d",
        secondary: "#32321d",
        text: "#faee69"
      }
    },
    {
      name: "leviathan",
      light: {
        primary: "#BAEE75",
        secondary: "#BAEE75",
        text: "#182031"
      },
      dark: {
        primary: "#182031",
        secondary: "#182031",
        text: "#BAEE75"
      }
    },
    {
      name: "kobayashi",
      light: {
        primary: "#EBCD01",
        secondary: "#d79e27",
        text: "#F00D00"
      },
      dark: {
        primary: "#F00D00",
        secondary: "#F00D00",
        text: "#EBCD01"
      }
    },
    {
      name: "botanical",
      light: {
        primary: "#EAF1F3",
        secondary: "#495755",
        text: "#7B9C98"
      },
      dark: {
        primary: "#7B9C98",
        secondary: "#495755",
        text: "#EAF1F3"
      }
    },
    {
      name: "lavender",
      light: {
        primary: "#D6D3DF",
        secondary: "#504A62",
        text: "#ADA6C2"
      },
      dark: {
        primary: "#ADA6C2",
        secondary: "#504A62",
        text: "#D6D3DF"
      }
    },
    {
      name: "tiramisu",
      light: {
        primary: "#CFC6B9",
        secondary: "#7D5448",
        text: "#C0976F"
      },
      dark: {
        primary: "#C0976F",
        secondary: "#7D5448",
        text: "#CFC6B9"
      }
    },
    {
      name: "alpine",
      light: {
        primary: "#6C687F",
        secondary: "#9994B8",
        text: "#6C687F"
      },
      dark: {
        primary: "#6C687F",
        secondary: "#9994B8",
        text: "#FFFFFF"
      }
    },
    {
      name: "chaostheory",
      light: {
        primary: "#FD77D7",
        secondary: "#676E8A",
        text: "#141221"
      },
      dark: {
        primary: "#141221",
        secondary: "#676E8A",
        text: "#FD77D7"
      }
    },
    {
      name: "cyberspace",
      light: {
        primary: "#00CE7C",
        secondary: "#9578D3",
        text: "#181C18"
      },
      dark: {
        primary: "#181C18",
        secondary: "#9578D3",
        text: "#00CE7C"
      }
    },
    {
      name: "cheesecake",
      light: {
        primary: "#FDF0D5",
        secondary: "#D91C81",
        text: "#8E2949"
      },
      dark: {
        primary: "#8E2949",
        secondary: "#D91C81",
        text: "#FDF0D5"
      }
    },
    {
      name: "desertoasis",
      light: {
        primary: "#FFF2D5",
        secondary: "#0061FE",
        text: "#D19D01"
      },
      dark: {
        primary: "#D19D01",
        secondary: "#0061FE",
        text: "#FFF2D5"
      }
    },
    {
      name: "stealth",
      light: {
        primary: "#010203",
        secondary: "#5E676E",
        text: "#383E42"
      },
      dark: {
        primary: "#383E42",
        secondary: "#5E676E",
        text: "#010203"
      }
    },
    // Add more themes as needed
  ];

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

  const DEFAULT_THEME = THEMES[0];
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME);
  const [tempSelectedTheme, setTempSelectedTheme] = useState(null);
  const themeToRender = tempSelectedTheme || selectedTheme;

  const [tempTimerLength, setTempTimerLength] = useState(timerLength);
  const [tempBreakLength, setTempBreakLength] = useState(breakLength);

  

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? themeToRender.dark.primary : themeToRender.light.primary
      },
      secondary: {
        main: darkMode ? themeToRender.dark.primary : themeToRender.light.primary
      },
      text: {
        main: darkMode ? themeToRender.dark.primary : themeToRender.light.primary
      }
    },
    typography: {
      fontFamily: "Quicksand, sans-serif",
      h1: {
        fontSize: "1rem",
      },
      h5: {
        fontWeight: "700",
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          ::-webkit-scrollbar {
            width: 15px;
          }
  
          ::-webkit-scrollbar-track {
            background-color: ${darkMode ? themeToRender.dark.primary : themeToRender.light.primary};
          }
  
          ::-webkit-scrollbar-thumb {
            background-color: ${darkMode ? themeToRender.dark.primary : themeToRender.light.primary};
            border-radius: px;
            border: 3px solid ${darkMode ? themeToRender.dark.primary : themeToRender.light.primary};
          }
  
          ::-webkit-scrollbar-thumb:hover {
            background-color: ${darkMode ? themeToRender.dark.primary : themeToRender.light.primary};
          }
        `
      }
    }
  });
  

  useEffect(() => {
    const mode = darkMode ? "dark" : "light";
    document.documentElement.style.setProperty("--theme-primary", themeToRender[mode].primary);
    document.documentElement.style.setProperty("--theme-secondary", themeToRender[mode].secondary);
    document.documentElement.style.setProperty("--theme-text", themeToRender[mode].text);
  }, [themeToRender, darkMode]);

  const extractPlaylistID = (url) => {
    const match = url.match(/[?&]list=([^&]+)/);
    if (match) {
      const playlistID = match[1];
      return `https://mtyy3u5dh5.execute-api.us-east-1.amazonaws.com/dev/api/playlist/${playlistID}`;
    }
    return null;
  };

  useEffect(() => {
    const savedThemeName = localStorage.getItem('theme');
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));

    if (savedThemeName) {
        const foundTheme = THEMES.find(theme => theme.name === savedThemeName);
        if (foundTheme) {
            setSelectedTheme(foundTheme);
        }
    }

    if (typeof savedDarkMode === 'boolean') {
        setDarkMode(savedDarkMode);
    }
}, []);

  

const handleThemeToggle = () => {
  const newDarkMode = !darkMode;
  setDarkMode(newDarkMode);
  localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
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
    setTempTimerLength(timerLength);
    setTempBreakLength(breakLength);
    setTempCustomPlaylistURL(""); // Or "Custom Playlist URL"
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setTempSelectedTheme(null);
    setSettingsOpen(false);
  };

  const handleSaveSettings = () => {
    setTimerLength(tempTimerLength);
    setBreakLength(tempBreakLength);
  
    if (tempSelectedTheme) {
        setSelectedTheme(tempSelectedTheme);
        localStorage.setItem('theme', tempSelectedTheme.name); // Save the theme to localStorage
        setTempSelectedTheme(null);
    }
  
    const extractedURL = extractPlaylistID(tempCustomPlaylistURL);
    if (extractedURL && extractedURL !== customPlaylistURL) {
        setCustomPlaylistURL(extractedURL);
    }
  
    handleCloseSettings();
};


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowWelcome(true);
    setGuest(false);
  };

 const renderThemeOptions = () => {
  return THEMES.map((theme, index) => (
    <Button
      key={index}
      variant="contained"
      className="theme-button"
      style={{
        margin: '5px',
        width: '150px',
        height: '50px',
        fontSize: '11.5px',
        backgroundColor: darkMode ? theme.dark.primary : theme.light.primary,
        color: darkMode ? theme.dark.text : theme.light.text,
      }}
      onClick={() => setTempSelectedTheme(theme)}  // update tempSelectedTheme on click

    >
      {theme.name}
    </Button>
  ));
};

  function isLight(color) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155; // This threshold can be adjusted based on your needs.
}

useEffect(() => {
  const mode = darkMode ? "dark" : "light";
  document.documentElement.style.setProperty("--theme-primary", selectedTheme[mode].primary);
  document.documentElement.style.setProperty("--theme-secondary", selectedTheme[mode].secondary);
  document.documentElement.style.setProperty("--theme-text", selectedTheme[mode].text);
}, [selectedTheme, darkMode]);




return (
  
  <ThemeProvider theme={theme}>
     <Analytics />
    <CssBaseline />
    <Router>
    <div className="App">
    <Routes>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="*"
            element={
              <>  
      {showWelcome ? (
        <WelcomePage onGetStarted={handleGetStarted} />
      ) : (
        <>
<AppBar position="static" style={{ width: '100%', margin: 0, padding: 0, backgroundColor: theme.palette.background.paper }}>
  <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" style={{ flexGrow: 1, paddingLeft: '7%'}}>
      Pomotivity
    </Typography>
    <IconButton color="primary" onClick={handleThemeToggle}>
      {darkMode ? (
        <DarkModeIcon style={{ color: theme.palette.text.primary }}/>
      ) : (
        <LightModeIcon style={{ color: theme.palette.text.primary }}/>
      )}
    </IconButton>
          {session ? (
              <IconButton color="inherit" onClick={handleSignOut}>
              <ExitToAppIcon style={{ color: theme.palette.text.primary }} />
            </IconButton>
          ) : (
            <IconButton color="primary" onClick={handleOpenAuthDialog}>
            <AccountCircleIcon style={{ color: theme.palette.text.primary }} />
          </IconButton>
          )}
          <IconButton color="primary" onClick={handleOpenSettings}>
            <SettingsIcon style={{ color: theme.palette.text.primary }} />
          </IconButton>
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
        <div className="music-section" style={{ backgroundColor: theme.palette.background.paper }}>
          {guest || session ? ( // Conditionally render MusicPlayer
            <MusicPlayer
              playlistURL={
                customPlaylistURL ||
                "https://mtyy3u5dh5.execute-api.us-east-1.amazonaws.com/dev/api/lofi"
              }
            />
          ) : null}
        </div>

        <Dialog
          open={authDialogOpen}
          onClose={() => {
            if (session || guest) {
              handleCloseAuthDialog();
            }
          }}
          maxWidth="100%"
          disableBackdropClick={!session && !guest}
          disableEscapeKeyDown={!session && !guest}
        >
          <Auth onSkip={handleSkip} guestMode={guest} darkMode={darkMode} />
        </Dialog>

        <Dialog open={settingsOpen} onClose={handleCloseSettings} BackdropProps={{ 
       style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } 
   }}>
      <DialogTitle >Settings</DialogTitle>
      <DialogContent>
        <Typography variant="h6" style={{fontWeight:"600"}} gutterBottom>
        </Typography>
        <div style={{ marginBottom: '20px' }}>
        <TextField
  label="Timer Length (minutes)"
  type="number"
  value={tempTimerLength}
  onChange={(e) => setTempTimerLength(e.target.value)}
  style={{ marginRight: '10px', color: theme.palette.text.secondary }} // added color property here
  InputLabelProps={{
    style: { color: theme.palette.text.secondary } // setting the color for the label text
  }}
/>
<TextField
  label="Break Length (minutes)"
  type="number"
  value={tempBreakLength}
    onChange={(e) => setTempBreakLength(e.target.value)}
  style={{ marginRight: '10px',color: theme.palette.text.secondary }} // added color property here
  InputLabelProps={{
    style: { color: theme.palette.text.secondary } // setting the color for the label text
  }}
/>
<TextField
  label="Custom Playlist URL"
  fullWidth
  defaultValue=""
  value={tempCustomPlaylistURL}
  onChange={(e) => setTempCustomPlaylistURL(e.target.value)}
  style={{ marginTop: '10px', color: theme.palette.text.secondary }} // added color property here
  InputLabelProps={{
    style: { color: theme.palette.text.secondary } // setting the color for the label text
  }}
/>
        </div>
        <Typography variant="h6" style={{fontWeight:"600"}} gutterBottom>
          Themes
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {renderThemeOptions()}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseSettings} 
          style={{ color: theme.palette.text.primary }} >
          CANCEL
        </Button>
        <Button
          onClick={() => handleSaveSettings(timerLength, breakLength)}
          style={{ color: theme.palette.text.primary }}
        >
       SAVE 
        </Button>
      </DialogActions>
      </Dialog>
                  </>
                )}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  </ThemeProvider>
);
}

export default App;
