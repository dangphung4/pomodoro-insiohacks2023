import './Auth.css';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export function Auth({ onSkip, darkMode }) {
    const theme = useTheme();

    const [session, setSession] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            const currentUser = session?.user;
            setSession(session);
            console.log("Auth Event: ", event, "Current User: ", currentUser);
        });
    }, []);

    async function signUp() {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) console.error(error);
    }

    async function logIn() {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) console.error(error);
    }

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
                >
                    Log In
                </Button>
            </Box>
            <Box mt={1.5} sx={{ width: '100%' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={signUp}
                    fullWidth
                    sx={{ backgroundColor: theme.palette.text.secondary, color: theme.palette.primary.contrastText }}
                    >
                    Sign Up
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
        </Box>
    );
}