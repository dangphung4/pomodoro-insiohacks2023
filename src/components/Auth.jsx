import './Auth.css';
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect} from "react";
import { supabase } from '../supabaseClient';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { CircularProgress, Snackbar, Alert } from '@mui/material';
import { isEmail } from 'validator';


export function Auth({ onSkip, darkMode }) {
    const theme = useTheme();

    const [session, setSession] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);  // Add this state to handle loading state
    const [snackbarOpen, setSnackbarOpen] = useState(false);  // To open/close snackbar
    const [message, setMessage] = useState('');  // To store the message
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            const currentUser = session?.user;
            setSession(session);
            console.log("Auth Event: ", event, "Current User: ", currentUser);
        });
    }, []);

    async function signUp() {
        setLoading(true); // start loading
        const { error } = await supabase.auth.signUp({ email, password });
        setLoading(false); // stop loading
        if (error) {
            console.error(error);
            setMessage('Unable to sign up. Please try again later.');  // set error message
            setSnackbarOpen(true);  // open snackbar
        } else {
            setMessage('Signup successful! Please check your email to verify your account.');  // set success message
            setSnackbarOpen(true);  // open snackbar
        }
    }

    async function logIn() {
       
        setLoading(true); // start loading
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false); // stop loading
        if (error) {
            console.error(error);
            setMessage('Invalid email or password.');  // set error message
            setSnackbarOpen(true);  // open snackbar
        } else {
            setMessage('Login successful!');  // set success message
            setSnackbarOpen(true);  // open snackbar
        }
    }

    const validate = () => {
        let isValid = true;
        if (!isEmail(email)) {
            setEmailError('Enter a valid email.');
            isValid = false;
        } else {
            setEmailError('');
        }
        if (!password) {
            setPasswordError('Password is required.');
            isValid = false;
        } else {
            setPasswordError('');
        }
        return isValid;
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Box component="form" autoComplete="off" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '500px',
            padding: '3.5rem',
            borderRadius: '5px',
            boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: darkMode ? theme.palette.background.default : theme.palette.background.paper,
            overflow: 'hidden',
        }}>
            <h1 style={{ color: theme.palette.text.primary, marginBottom: '1.5rem' }}>
                Sign In
            </h1>
            <TextField
                error={Boolean(emailError)}
                helperText={emailError}
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ marginBottom: '.25rem', width: '100%' }}
            />
            <TextField
                error={Boolean(passwordError)}
                helperText={passwordError}
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ marginBottom: '1rem', width: '100%' }}
            />
            <Box mt={1.5} sx={{ width: '100%' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={logIn}
                fullWidth
                sx={{ backgroundColor: theme.palette.text.primary.secondary, color: theme.palette.secondary.text }}
                disabled={loading}  // disable button during login
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
            </Button>
        </Box>
        <Box mt={1.5} sx={{ width: '100%' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={signUp}
                fullWidth
                sx={{ backgroundColor: theme.palette.text.secondary, color: theme.palette.primary.contrastText }}
                disabled={loading}  // disable button during signup
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
        </Box>
            <Box mt={1.5} sx={{ width: '100%' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSkip}
                    fullWidth
                    sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
                >
                    Use as Guest
                </Button>
            </Box>

{/* Snackbar for feedback */}
<Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={message.includes("successful") ? "success" : "error"} elevation={6} variant="filled">
                    {message}
                </Alert>
            </Snackbar>

        </Box>


    );
}