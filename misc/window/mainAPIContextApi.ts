/**
 * Copyright (c) 2022, Magius(CHE)
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author  : Magius(CHE)
 * @project : Electron Window
 * @package : Titlebar Context API
 */

import { MainAPIContextApi } from './mainAPIContext';

const context: MainAPIContextApi = (window as any).electron_window.api;

export default context;
