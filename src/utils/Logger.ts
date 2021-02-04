export default class Logger {
  constructor(protected className: string) {}

  info(message: any) {
    console.info(`${new Date().toString()} - [${this.className}]: ${message}`);
  }
}
