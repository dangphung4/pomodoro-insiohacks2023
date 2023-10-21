import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export function Auth({ onSkip, guestMode }) {
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

    async function logOut() {
        const { error } = await supabase.auth.signOut();
        if (error) console.error(error);
    }

    return (
        <Box component="form" autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {session ? (
                <Button variant="contained" color="primary" onClick={() => supabase.auth.signOut()}>
                    Log Out
                </Button>
            ) : !guestMode ? (
                <>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={signUp} fullWidth margin="normal">
                        Sign Up
                    </Button>
                    <Button variant="contained" color="secondary" onClick={logIn} fullWidth margin="normal">
                        Log In
                    </Button>
                    <Button variant="outlined" onClick={onSkip} fullWidth margin="normal">
                        Use as Guest
                    </Button>
                </>
            ) : null}
        </Box>
    );
}
