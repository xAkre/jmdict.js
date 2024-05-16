import { JMdictEntry } from '@/types';

class JMdict {
    entries: JMdictEntry[];

    constructor(entries: JMdictEntry[]) {
        this.entries = entries;
    }
}

export { JMdict };
