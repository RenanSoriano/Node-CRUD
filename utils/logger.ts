export class Logger {
    private context: string;

    constructor(context: string) {
        this.context = context;
    }

    info(message: string, ...args: any[]): void {
        console.log(`[${new Date().toISOString()}] [${this.context}] [INFO] ${message}`, ...args);
    }

    error(message: string, ...args: any[]): void {
        console.error(`[${new Date().toISOString()}] [${this.context}] [ERROR] ${message}`, ...args);
    }

    warn(message: string, ...args: any[]): void {
        console.warn(`[${new Date().toISOString()}] [${this.context}] [WARN] ${message}`, ...args);
    }
}