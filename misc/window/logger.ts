import mainAPI from './mainAPIContextApi';

/*type Loggable = {
    log(format: string, ...args: unknown[]): void
    error(format: string, ...args: unknown[]): void
}*/

class Logger {
    public static create(name: string) {

        return {
            log: (format: string, ...args: unknown[]) => {
                mainAPI.log(name, format, ...args)
            },
            error: (format: string, ...args: unknown[]) => {
                mainAPI.error(name, format, ...args)
            }
        }
    }

}

export { Logger }