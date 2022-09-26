import { contextBridge } from 'electron';
import titlebarContext from './titlebarContext';
import { MainAPIContextApi }  from './mainAPIContext';

contextBridge.exposeInMainWorld('electron_window', {
  titlebar: titlebarContext,
  api: new MainAPIContextApi()
});