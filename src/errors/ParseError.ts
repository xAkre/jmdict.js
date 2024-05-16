/**
 * Thrown when there is a problem parsing data
 */
class ParseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ParseError';
    }
}

export { ParseError };
