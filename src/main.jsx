import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from 'react-router-dom';
import SmashRouter from './nav/SmashRouter.jsx';

createRoot(document.getElementById('root')).render(
    <SmashRouter/>
)
