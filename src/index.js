import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { VideoPlayerProvider } from './components/context/VideoPlayerContext';

import './styles/global.css';
import './styles/App.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <VideoPlayerProvider>
          <App />
        </VideoPlayerProvider>
    </BrowserRouter>
);