import React from 'react';
import { createRoot } from 'react-dom/client';
import WindowFrame from '@misc/window/components/WindowFrame';
import Application from '@components/Application';
import mainAPI from '@misc/window/mainAPIContextApi';

// Say something
console.log(mainAPI)
mainAPI.log_raw('Renderer', 'execution started');

// Application to Render
const app = (
  <WindowFrame title='Nydus' platform='windows'>
    <Application />
  </WindowFrame>
);

// Render application in DOM
createRoot(document.getElementById('app')).render(app);
