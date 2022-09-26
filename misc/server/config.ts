
import { app } from 'electron';
import path from 'path';
import { Loggable } from './logger';

import * as config from '../../package.json'
import fs from 'fs';
import mkdirp from 'mkdirp';
import dateformat from 'dateformat';


class Configuration extends Loggable {
    public readonly data_path: string
    public readonly production: boolean
    public readonly log_path: string
    private logfile_handle: fs.WriteStream
    constructor() {
        super('⚙️ Config')
        this.production = process.env.NODE_ENV == 'production'
        if (!this.production) {
            this.data_path = path.resolve(path.join('./app_config_path'))
            //this.log("Not production found. \"Data path\" will be %o", this.data_path)
        } else
            this.data_path = path.resolve(path.join(app.getPath('userData'), 'server_app'))

        if (!fs.existsSync(this.data_path)) {
            mkdirp.sync(this.data_path)
        }

        this.log_path = this.app_path('log.txt')

        this.logfile_handle = fs.createWriteStream(this.log_path);
        const ori_stdout = process.stdout.write.bind(process.stdout)
        const ori_stderr = process.stderr.write.bind(process.stderr)

        process.stdout.write = (data) => {
            this.logfile_handle.write(dateformat(new Date(), 'HH:MM:ss') + data.toString().replace(
                // eslint-disable-next-line no-control-regex
                /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
            ori_stdout(data)
            return true
        }
        process.stderr.write = (data) => {
            this.logfile_handle.write(dateformat(new Date(), 'HH:MM:ss') + data.toString().replace(
                // eslint-disable-next-line no-control-regex
                /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
            ori_stderr(data)
            return true
        }
        //this.logfile_handle.write.bind(this.logfile_handle);

        this.log("Application started at %o", dateformat(new Date(), 'yyyy/mm/dd'))
        this.log(" - Production is %o", this.production)
        this.log(" - Data root is %o", this.data_path)
        this.log(" - Log in %o", this.log_path)
    }
    public app_path(relative_path: string) {
        return path.resolve(path.join(this.data_path, relative_path.replace(/^[./]*/gm, '')))
    }
    public init() {
        //acquire main path
    }
    public dispose() {
        this.log("Dispose Configuraztion handler.")
        this.logfile_handle.close()
        this.logfile_handle = null
    }
}

export default Configuration