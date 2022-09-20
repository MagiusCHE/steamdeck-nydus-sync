/* eslint-disable prefer-spread */

import { app, BrowserWindow, ipcMain } from 'electron';
import { MainAPIArguments } from './mainAPIContext';

import { debug } from 'debug';

const activeDebugs: {
    [keys: string]: debug.Debugger
} = {}

const production = process.env.NODE_ENV == 'production'

class MainAPIIpc {
    constructor(private readonly mainWindow: BrowserWindow) {
        const handler = async (event: Electron.IpcMainInvokeEvent, args: MainAPIArguments) => {
            switch (args.method) {
                case "test":
                    return this.test(...args.args)
                case "log":
                    return this.log.apply(this, args.args)
                default:
                    console.error(`Unsupported APIMethod ${args.method}`)
            }
        };

        ipcMain.handle('api', handler);
        ipcMain.on('api', handler);
    }
    public async log(sender: string, format: string, ...args: unknown[]) {
        const key = "nydus:" + sender
        const internal_key = 'I:' + key
        if (!activeDebugs[internal_key]) {
            activeDebugs[internal_key] = debug(key)
            activeDebugs[internal_key].log = console.log.bind(console)
            //activeDebugs[key].namespace = key
        }
        activeDebugs[internal_key](format, ...args)
    }
    public async error(sender: string, format: string | Error, ...args: unknown[]) {
        const key = "nydus:" + sender
        const internal_key = 'E:' + key
        if (!activeDebugs[internal_key]) {
            activeDebugs[internal_key] = debug(key)

            //default is already on stderr
            //activeDebugs[internal_key].log = console.error.bind(console)

        }
        activeDebugs[internal_key](format, ...args)
    }
    public async test(...args: unknown[]) {
        this.log("IPC", "invoked TEST with args", args)
        this.log("IPC", "Home %o", app.getPath('home'))
        this.log("IPC", "UserData %o <<store data here!", app.getPath('userData'))
        this.log("IPC", "Temp %o", app.getPath('temp'))
        return "HANDLED"
    }

}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerMainAPIIpc = (mainWindow: BrowserWindow) => {
    new MainAPIIpc(mainWindow)
}