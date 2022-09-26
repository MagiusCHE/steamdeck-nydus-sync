/* eslint-disable prefer-spread */

import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { Logger, Loggable } from '../server/logger';
import { MainAPIArguments } from './mainAPIContext';

const production = process.env.NODE_ENV == 'production'

interface IMainAPIIpc {
    choose_path(title: string, startig_path?: string): Promise<string>
    //test(...args: unknown[]): Promise<string>
    log_raw(sender: string, format: string, ...args: unknown[]): Promise<void>
    error_raw(sender: string, format: string, ...args: unknown[]): Promise<void>
}

class MainAPIIpc extends Loggable implements IMainAPIIpc {
    constructor(private readonly mainWindow: BrowserWindow) {
        super('Ipc')
        const handler = async (event: Electron.IpcMainInvokeEvent, args: MainAPIArguments) => {
            switch (args.method) {
                /*case "test":
                    return this.test.apply(this, args.args)*/
                case "log":
                    return this.log_raw(args.args[0] as string, args.args[1] as string, ...args.args.slice(2))
                case "error":
                    return this.error_raw(args.args[0] as string, args.args[1] as string, ...args.args.slice(2))
                case "choose_path":
                    return this.choose_path(args.args[0] as string, args.args[1] as string)
                default:
                    throw new Error(`Unsupported APIMethod "${args.method}".`)
            }
        };
        ipcMain.handle('api', handler);
        ipcMain.on('api', handler);
    }
    public async log_raw(sender: string, format: string, ...args: unknown[]) {
        Logger.log(sender, format, ...args)
    }
    public async error_raw(sender: string, format: string, ...args: unknown[]) {
        Logger.error(sender, format, ...args)
    }
    /*public async test(...args: unknown[]) {
        this.log("invoked TEST with args", args)
        this.log("Home %o", app.getPath('home'))
        this.log("UserData %o <<store data here!", app.getPath('userData'))
        this.log("Temp %o", app.getPath('temp'))
        throw new Error("TEST ERROR")
        return "HANDLED"
    }*/
    public async choose_path(title: string, defaultPath?: string): Promise<string> {
        const ret = await dialog.showOpenDialog(this.mainWindow, {
            title: title,
            defaultPath: defaultPath,
            properties: ['openDirectory']
        })
        if (ret.canceled) {
            return undefined
        }
        return ret.filePaths[0]
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerMainAPIIpc = (mainWindow: BrowserWindow) => {
    new MainAPIIpc(mainWindow)
}

export { IMainAPIIpc }