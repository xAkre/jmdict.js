class Logger {
    /**
     * Log a message to the console
     *
     * @param message - Message to log
     */
    log(message: unknown) {
        console.log(message);
    }

    /**
     * Log an error message to the console
     *
     * @param message - Error message to log
     */
    error(message: unknown) {
        console.error(message);
    }

    /**
     * Log a warning message to the console
     *
     * @param message - Warning message to log
     */
    warn(message: unknown) {
        console.warn(message);
    }

    /**
     * Log an info message to the console
     *
     * @param message - Info message to log
     */
    info(message: unknown) {
        console.info(message);
    }
}

export { Logger };
