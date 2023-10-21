import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ThemeProvider  from './ThemeWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ThemeProvider >
        <App />

        </ThemeProvider>
    </React.StrictMode>
    
);
