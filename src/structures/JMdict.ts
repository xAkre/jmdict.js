import { PathLike, writeFileSync } from 'fs';
import { JMdictEntry } from '@/types/jmdict';

class JMdict {
    entries: JMdictEntry[];

    constructor(entries: JMdictEntry[]) {
        this.entries = entries;
    }

    /**
     * Jsonify JMdict entries
     *
     * @returns - JSON stringified JMdict entries
     */
    toJson() {
        return JSON.stringify(this.entries);
    }

    /**
     * Write JMdict entries to a JSON file
     *
     * @param path - Path to JSON file
     */
    writeToJsonFile(path: PathLike) {
        const jsonString = this.toJson();
        writeFileSync(path, jsonString, {
            encoding: 'utf-8'
        });
    }
}

export { JMdict };
