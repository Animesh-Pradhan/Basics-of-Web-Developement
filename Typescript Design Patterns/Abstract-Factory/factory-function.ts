interface ILogger {
    info(message: string): void;
    debug(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}

const productionLogger = (): ILogger => {
    return {
        info(message: string): void {},
        debug(message: string): void {},
        warn(message: string): void {
            console.log(message + "Hello");
        },
        error(message: string): void {
            console.log(message);
        }
    }
}

const developementLogger = (): ILogger => {
    return {
        info(message: string): void {
            console.log(message);
        },
        debug(message: string): void {
            console.log(message);
        },
        warn(message: string): void {
            console.log(message);
        },
        error(message: string): void {
            console.log(message);
        }
    }
}



export const createLogger = (): ILogger => {
    if (process.env.NODE_ENV === "production") {
        return productionLogger();
    } else {
        return developementLogger();
    }
}