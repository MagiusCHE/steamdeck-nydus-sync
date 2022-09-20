/* eslint-disable prefer-spread */

import { app, BrowserWindow, ipcMain } from 'electron';
import { Logger, Loggable } from '../server/logger';
import { MainAPIArguments } from './mainAPIContext';

const production = process.env.NODE_ENV == 'production'

class MainAPIIpc extends Loggable {
    constructor(private readonly mainWindow: BrowserWindow) {
        super('Ipc')
        const handler = async (event: Electron.IpcMainInvokeEvent, args: MainAPIArguments) => {
            switch (args.method) {
                case "test":
                    return this.test(...args.args)
                case "log":
                    return Logger.log.apply(this, args.args)
                case "error":
                    return Logger.error.apply(this, args.args)
                default:
                    console.error(`Unsupported APIMethod ${args.method}`)
            }
        };
        ipcMain.handle('api', handler);
        ipcMain.on('api', handler);
    }    
    public async test(...args: unknown[]) {
        this.log("invoked TEST with args", args)
        this.log("Home %o", app.getPath('home'))
        this.log("UserData %o <<store data here!", app.getPath('userData'))
        this.log("Temp %o", app.getPath('temp'))
        throw new Error("TEST ERROR")
        return "HANDLED"
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerMainAPIIpc = (mainWindow: BrowserWindow) => {
    new MainAPIIpc(mainWindow)
}