import { contextBridge } from 'electron';
import titlebarContext from './titlebarContext';
import mainAPIContext from './mainAPIContext';

contextBridge.exposeInMainWorld('electron_window', {
  titlebar: titlebarContext,
  api: mainAPIContext
});
