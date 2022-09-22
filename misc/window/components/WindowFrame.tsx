/**
 * Copyright (c) 2021, Guasam
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author  : guasam
 * @project : Electron Window
 * @package : Window Frame (Component)
 */

import React, { useEffect, useRef } from 'react';
//import Titlebar from './Titlebar';
import Tabs, { selectTab } from './Tabs';
import Panels, { selectPanel } from './Panels';
import logo from '@assets/images/logo.png';

import { Logger } from '@misc/window/logger';
const { log, error } = Logger.create('Frame')

type Props = {
  title?: string;
  borderColor?: string;
  platform: 'windows' | 'mac';
  children: React.ReactNode;
};

type Context = {
  platform: 'windows' | 'mac';
};

export const WindowContext = React.createContext<Context>({
  platform: 'windows',
});

const WindowFrame: React.FC<Props> = (props) => {

  const itsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { parentElement } = itsRef.current;
    parentElement.classList.add('has-electron-window');
    parentElement.classList.add('has-border');

    // Apply border color if prop given
    if (props.borderColor) {
      parentElement.style.borderColor = props.borderColor;
    }

    log("Select tab invoked on useEffect")
    selectTab('games')

  }, []);

  return (
    <WindowContext.Provider value={{ platform: props.platform }}>
      {/* Reference creator */}
      <div className='start-electron-window' ref={itsRef}></div>
      {/* Window Titlebar */}
      <Tabs activatePanel={selectPanel} />
      {/* Window Content (Application to render) */}
      <div className='window-content'>
        <Panels />
        {props.children}
      </div>
    </WindowContext.Provider>
  );
};

export default WindowFrame;
