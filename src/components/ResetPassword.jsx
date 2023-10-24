import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from '@mui/material';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true);  
  
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (password !== passwordConfirmation) {
      setMessage('Passwords do not match.');
      setSnackbarOpen(true);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Password updated successfully. You can now login with your new password.');
      setDialogOpen(false);  
      navigate('/');
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={dialogOpen} maxWidth="xs">  
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          style={{ marginTop: '16px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleResetPassword} color="primary">
          Reset Password
        </Button>
      </DialogActions>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={message.includes("successfully") ? "success" : "error"} elevation={6} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default ResetPassword;
