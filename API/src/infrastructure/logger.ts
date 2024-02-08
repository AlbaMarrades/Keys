import logger from 'winston'
import { transports } from 'winston'

export default class Logger {

    public static configure(): void {
        logger.configure({
            transports: [
                new transports.Console()
            ]
        })
    }

    public static info(message: string): void{
        logger.info(message)
    }
}