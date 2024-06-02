import { PathLike, writeFileSync } from 'fs';
import { KanjiDicCharacter } from '@/types/kanjidic';

class KanjiDic {
    characters: KanjiDicCharacter[];

    constructor(characters: KanjiDicCharacter[]) {
        this.characters = characters;
    }

    /**
     * Jsonify KanjiDic characters
     *
     * @returns - JSON stringified KanjiDic characters
     */
    toJson() {
        return JSON.stringify(this.characters);
    }

    /**
     * Write KanjiDic characters to a JSON file
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

export { KanjiDic };
