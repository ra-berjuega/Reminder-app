import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import Reminder from './reminder';
const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <Reminder />
    </StrictMode>
);