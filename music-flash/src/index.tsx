import React from 'react';
import Application from './application';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(<Application />);

reportWebVitals();
