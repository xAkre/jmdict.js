import { PathLike, readFileSync } from 'fs';
import { Parser } from 'xml2js';
import { KanjiDic } from '@/structures';
import { ParseError } from '@/errors';
import { KanjiDicCharacter, ParsedKanjiDicCharacter } from '@/types/kanjidic';

class KanjiDicParser {
    /**
     * Parse a KanjiDic from an XML string
     *
     * @param xmlString - The XML string to parse
     * @returns A KanjiDic object
     * @throws {ParseError} If there is an error parsing the XML
     */
    static async fromXmlString(xmlString: string): Promise<KanjiDic> {
        const parser = new Parser({ trim: true });

        let parsedData;
        try {
            parsedData = await parser.parseStringPromise(xmlString);
        } catch (error) {
            throw new ParseError(`Error parsing KanjiDic file: ${error}`);
        }

        const characters = this.transformParsedData(parsedData);
        return new KanjiDic(characters);
    }

    /**
     * Parse a KanjiDic from an XML file
     *
     * @param path - The path to the XML file to parse
     * @returns A KanjiDic object
     * @throws {ParseError} If there is an error reading the file
     */
    static async fromXmlFile(path: PathLike): Promise<KanjiDic> {
        let xmlString: string;
        try {
            xmlString = readFileSync(path, 'utf-8');
        } catch (error) {
            throw new ParseError(`Error reading KanjiDic file: ${error}`);
        }

        return this.fromXmlString(xmlString);
    }

    /**
     * Transform data parsed using xml2js into an array of KanjiDicCharacter objects
     *
     * @private
     * @static
     * @param parsedData - The data parsed using xml2js
     * @returns An array of KanjiDicCharacter objects
     */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    private static transformParsedData(parsedData: any): KanjiDicCharacter[] {
        const parsedEntries: ParsedKanjiDicCharacter[] =
            parsedData.kanjidic2.character;

        const entries: KanjiDicCharacter[] = parsedEntries.map((entry) =>
            this.transformParsedCharacter(entry)
        );

        return entries;
    }

    /**
     * Transform a single parsed character into a KanjiDicCharacter object
     *
     * @private
     * @static
     * @param parsedCharacter - The parsed character object
     * @returns A KanjiDicCharacter object
     */
    private static transformParsedCharacter(
        parsedCharacter: ParsedKanjiDicCharacter
    ): KanjiDicCharacter {
        const character: KanjiDicCharacter = {
            kanji: parsedCharacter.literal[0],
            codepoints: parsedCharacter.codepoint[0].cp_value.map(
                (codepoint) => ({
                    codepoint: codepoint._,
                    standard: codepoint.$.cp_type
                })
            ),
            radicals: parsedCharacter.radical[0].rad_value.map((radical) => ({
                radical: radical._,
                type: radical.$.rad_type
            })),
            miscellaneous: {
                grade: parsedCharacter.misc[0].grade?.[0],
                strokeCount: parsedCharacter.misc[0].stroke_count[0],
                frequency: parsedCharacter.misc[0].freq?.[0],
                jlpt: parsedCharacter.misc[0].jlpt?.[0],
                radicalName: parsedCharacter.misc[0].rad_name?.[0],
                variants: parsedCharacter.misc[0].variant?.map((variant) => ({
                    variant: variant._,
                    type: variant.$.var_type
                }))
            },
            dictionaryNumbers: parsedCharacter.dic_number?.[0].dic_ref.map(
                (dicNumber) => ({
                    number: dicNumber._,
                    dictionary: dicNumber.$.dr_type,
                    volume: dicNumber.$.m_vol,
                    page: dicNumber.$.m_page
                })
            ),
            queryCodes: parsedCharacter.query_code?.[0].q_code.map(
                (queryCode) => ({
                    type: queryCode.$.qc_type,
                    skipMisclass: queryCode.$.skip_misclass,
                    code: queryCode._
                })
            ),
            readings:
                parsedCharacter.reading_meaning?.[0].rmgroup?.[0].reading?.map(
                    (reading) => ({
                        reading: reading._,
                        type: reading.$.r_type,
                        onType: reading.$.on_type
                    })
                ),
            meanings:
                parsedCharacter.reading_meaning?.[0].rmgroup?.[0].meaning?.map(
                    (meaning) => ({
                        meaning:
                            typeof meaning === 'string' ? meaning : meaning._,
                        language:
                            typeof meaning === 'string'
                                ? 'en'
                                : meaning.$.m_lang
                    })
                ),
            nanori: parsedCharacter.reading_meaning?.[0].nanori
        };
        return character;
    }
}

export { KanjiDicParser };
