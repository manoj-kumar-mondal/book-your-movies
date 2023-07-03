import { T_APIInfo } from "./types";

/**
 * @description It will return current date with time to print in the console.
 * @param none
 * @returns [Date Time]
 */
const  getDateAndTime = (): string  => {
    const date = new Date();
    let seconds: number| string = date.getSeconds();
    const formattedDateAndTime = `[${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${seconds < 10 ? ('0' + seconds) : seconds}]`;
    return formattedDateAndTime;
}

/**
 * @class Console
 * @description Contains some static function that useful for logging message on console.
 * @method Info
 * @method Error
 */
export class Console {
    constructor(){}

    static Info(message: string): void {
        console.log(`${(getDateAndTime())} [INFO]: - ${message}`);
    }

    static Error(error: string | any): void {
        if(typeof error === 'string')
            console.error(`${(getDateAndTime())} [ERROR] - ${error}`);
        else
            console.error(`${(getDateAndTime())} [ERROR] - ${error.message}`);
    }

    static Warn(message: string): void {
        console.warn(`${(getDateAndTime())} [WARNNING] - ${message}`);
    }

    static LogApiInfo({ method, path, statusCode, handlingTimeInMilis, hostname }: T_APIInfo) {
        const response = `${(getDateAndTime())}(${hostname}) - ${method.toUpperCase()} ${path} resolved with ${statusCode} in ${handlingTimeInMilis}ms`;
        console.log(response);
    }
}

