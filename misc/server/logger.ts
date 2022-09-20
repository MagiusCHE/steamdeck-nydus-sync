import { debug } from 'debug';

const activeDebugs: {
    [keys: string]: debug.Debugger
} = {}


abstract class Logger {
    public static async log(sender: string, format: string, ...args: unknown[]) {
        const key = "nydus:" + sender
        const internal_key = 'I:' + key
        if (!activeDebugs[internal_key]) {
            activeDebugs[internal_key] = debug(key)
            activeDebugs[internal_key].log = console.log.bind(console)
            //activeDebugs[key].namespace = key
        }
        activeDebugs[internal_key](format, ...args)
    }
    public static async error(sender: string, format: string | Error, ...args: unknown[]) {
        const key = "nydus:" + sender
        const internal_key = 'E:' + key
        if (!activeDebugs[internal_key]) {
            activeDebugs[internal_key] = debug(key)

            //default is already on stderr
            //activeDebugs[internal_key].log = console.error.bind(console)

        }
        activeDebugs[internal_key](format, ...args)
    }
}

abstract class Loggable {
    constructor(private readonly name: string) {

    }
    public get log_name() {
        return this.name
    }
    public log(format: string, ...args: unknown[]) {
        return Logger.log(this.log_name, format, ...args)
    }
    public error(format: string, ...args: unknown[]) {
        return Logger.error(this.log_name, format, ...args)
    }
}

export { Loggable, Logger }