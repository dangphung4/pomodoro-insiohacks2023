import { useState, useEffect } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import PomodoroTimer from './components/PomodoroTimer';
import Tasks from './components/Tasks';  // Import the Tasks component
import { supabase } from './supabaseClient';

function App() {
  const [session, setSession] = useState(supabase.auth.getSession());
  const [guest, setGuest] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSkip = () => {
    setGuest(true);
  };

 

  return (
    <div className="App">
            <Auth onSkip={handleSkip} guestMode={guest} />
            
            {guest || session ? <PomodoroTimer /> : null }
            {guest || session ? <Tasks />: null }
            
        </div>
  );
}

export default App;
