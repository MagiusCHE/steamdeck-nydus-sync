import { contextBridge } from 'electron';
import titlebarContext from './titlebarContext';
import { MainAPIContextApi }  from './mainAPIContext';

const toexpose = new MainAPIContextApi()
console.log("MainAPIContextApi toexpose",toexpose, toexpose.created)
contextBridge.exposeInMainWorld('electron_window', {
  titlebar: titlebarContext,
  api: toexpose//mainAPIContext
});