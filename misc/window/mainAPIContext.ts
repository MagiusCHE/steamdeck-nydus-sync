/**
 * Copyright (c) 2022, Magius(CHE)
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author  : Magius(CHE)
 * @project : Electron Window
 * @package : API IPC (Renderer Process)
 */

import debug from 'debug';

import { ipcRenderer } from 'electron';

type AllowedArgumentTypes = (object | string | number)[]

export type MainAPIArguments = {
  method: string,
  args: AllowedArgumentTypes
}

const assemble_args = (...args: unknown[]) => {
  return args as AllowedArgumentTypes
}

const activeDebugs: {
  [keys: string]: debug.Debugger
} = {}

const MainAPIContext = {
  log(sender: string, format: string, ...args: unknown[]) {

    const key = "nydus:" + sender
    const internal_key = 'I:' + key
    if (!activeDebugs[internal_key]) {
      activeDebugs[internal_key] = debug(key)
      activeDebugs[internal_key].log = console.log.bind(console);
    }
    activeDebugs[internal_key](format, ...args)
    const ipcargs: MainAPIArguments = {
      method: "log",
      args: assemble_args(sender, format, ...args)
    }
    return ipcRenderer.send("api", ipcargs);
  },
  error(sender: string, format: string | Error, ...args: unknown[]) {
    const key = "nydus:" + sender
    const internal_key = 'E:' + key
    if (!activeDebugs[internal_key]) {
      activeDebugs[internal_key] = debug(key)

      //default is already on stderr
      activeDebugs[internal_key].log = console.error.bind(console)

    }
    activeDebugs[internal_key](format, ...args)
    const ipcargs: MainAPIArguments = {
      method: "error",
      args: assemble_args(sender, format, ...args)
    }
    return ipcRenderer.send("api", ipcargs);
  },
  async test() {
    const ipcargs: MainAPIArguments = {
      method: "test",
      args: [{ a: 2 }, 43]
    }
    return ipcRenderer.invoke("api", ipcargs);
  },
};

export type MainAPIContextApi = typeof MainAPIContext;

export default MainAPIContext;
