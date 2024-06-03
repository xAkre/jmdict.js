import { readFileSync, PathLike } from 'fs';
import { Parser, ParserOptions } from 'xml2js';
import {
    JMdictEntry,
    JMdictEntityMap,
    JMdictKanjiElement,
    JMdictReadingElement,
    JMdictLanguageSource,
    JMdictGloss,
    JMdictGlossGender,
    JMdictCrossReference,
    JMdictGlossType,
    JMdictSenseElement,
    ParsedJMdictEntry,
    ParsedKanjiElement,
    ParsedReadingElement,
    ParsedSenseElement,
    ParsedLanguageSource,
    ParsedGloss
} from '@/types/jmdict';
import { ParseError } from '@/errors';
import { JMdict } from '@/structures';
import { defaultEntityMap } from '@/util/defaults';

interface ParseOptions {
    resolveEntities?: boolean;
    entityMap?: JMdictEntityMap;
}

const defaultParseOptions: ParseOptions = {
    resolveEntities: false,
    entityMap: defaultEntityMap
};

class JMdictParser {
    /**
     * Parse a JMdict from an XML string
     *
     * @param xmlString - The XML string to parse
     * @param options - Optional parsing options
     * @returns A JMdict object
     * @throws {ParseError} If there is an error parsing the XML
     */
    static async fromXmlString(
        xmlString: string,
        options: ParseOptions = defaultParseOptions
    ): Promise<JMdict> {
        /**
         * This needs to be done as the XML parser does not handle custom entities, and therefore
         * throws an error when it enounters them. This replaces all instances of '&' that are not
         * part of a valid entity with '&amp;' to avoid this
         */
        xmlString = xmlString.replace(
            /&(?!(?:apos|quot|[gl]t|amp);|#)/g,
            '&amp;'
        );
        options = { ...defaultParseOptions, ...options };

        const parserOptions: ParserOptions = {
            trim: true
        };

        /* Resolve entities if the user has requested it */
        if (options.resolveEntities) {
            parserOptions.valueProcessors = [
                this.resolveEntities(options.entityMap!)
            ];
        }

        const parser = new Parser(parserOptions);

        /* Try to parse the input XML */
        let parsedData;
        try {
            parsedData = await parser.parseStringPromise(xmlString);
        } catch (error) {
            throw new ParseError(`Error parsing JMdict file: ${error}`);
        }

        /* Transform the parsed data */
        const entries = this.transformParsedData(parsedData);

        return new JMdict(entries);
    }

    /**
     * Parse a JMdict from an XML file
     *
     * @param path - The path to the XML file to parse
     * @param options - Optional parsing options
     * @returns A JMdict object
     * @throws {ParseError} If there is an error reading the file
     */
    static async fromXmlFile(
        path: PathLike,
        options: ParseOptions = defaultParseOptions
    ): Promise<JMdict> {
        let xmlString: string;

        try {
            xmlString = readFileSync(path, 'utf-8');
        } catch (error) {
            throw new ParseError(`Error reading JMdict file: ${error}`);
        }

        return this.fromXmlString(xmlString, options);
    }

    /**
     * Factory function that returns a function that resolves entities according to the provided entity map
     *
     * @private
     * @static
     * @param entityMap - The entity map to use for resolving entities
     * @returns A function that resolves entities
     */
    private static resolveEntities(
        entityMap: JMdictEntityMap
    ): (value: string) => string {
        return (value: string) =>
            /* Replace & and ; with an empty string as the entity map only contains the entity name */
            value.replace(/[&;]/g, '') in entityMap
                ? entityMap[value.replace(/[&;]/g, '') as keyof JMdictEntityMap]
                : value;
    }

    /**
     * Transform data parsed using xml2js into an array of JMdictEntry objects
     *
     * @private
     * @static
     * @param parsedData - The data parsed using xml2js
     * @returns An array of JMdictEntry objects
     */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    private static transformParsedData(parsedData: any): JMdictEntry[] {
        const parsedEntries: ParsedJMdictEntry[] = parsedData.JMdict.entry;

        /* Map the parsed entries to JMdictEntry objects */
        const entries: JMdictEntry[] = parsedEntries.map((entry) =>
            this.transformParsedEntry(entry)
        );

        return entries;
    }

    /**
     * Transform a parsed entry into a JMdictEntry object
     *
     * @private
     * @static
     * @param entry - The entry parsed using xml2js
     * @returns A JMdictEntry object
     * @throws {ParseError} If the entry is missing an ID
     */
    private static transformParsedEntry(entry: ParsedJMdictEntry): JMdictEntry {
        const id = entry.ent_seq[0];

        if (!id) {
            throw new ParseError('Entry is missing ID');
        }

        const kanjiElements = entry.k_ele?.map((kanjiElement) =>
            this.transformParsedKanjiElement(kanjiElement)
        );

        const readingElements = entry.r_ele.map((readingElement) =>
            this.transformParsedReadingElement(readingElement)
        );

        /**
         * Parts of speech are inherited from the previous sense if they are not present.
         * See {@link JMdictParser.transformParsedSenseElement} to see how this is done
         */
        let lastPartsOfSpeech: string[] | undefined = undefined;
        const senseElements = entry.sense.map((senseElement) => {
            const transformedSenseElement = this.transformParsedSenseElement(
                senseElement,
                lastPartsOfSpeech
            );
            lastPartsOfSpeech = transformedSenseElement.partsOfSpeech;
            return transformedSenseElement;
        });

        return {
            id,
            kanji: kanjiElements,
            readings: readingElements,
            senses: senseElements
        };
    }

    /**
     * Transform a parsed kanji element into a JMdictKanjiElement object
     *
     * @private
     * @static
     * @param kanjiElement - The kanji element parsed using xml2js
     * @returns A JMdictKanjiElement object
     * @throws {ParseError} If the kanji element is missing kanji
     */
    private static transformParsedKanjiElement(
        kanjiElement: ParsedKanjiElement
    ): JMdictKanjiElement {
        const kanji = kanjiElement.keb[0];

        if (!kanji) {
            throw new ParseError('Kanji element is missing kanji');
        }

        return {
            kanji,
            priority: kanjiElement.ke_pri,
            additionalInformation: kanjiElement.ke_inf
        };
    }

    /**
     * Transform a parsed reading element into a JMdictReadingElement object
     *
     * @private
     * @static
     * @param readingElement - The reading element parsed using xml2js
     * @returns A JMdictReadingElement object
     * @throws {ParseError} If the reading element is missing reading
     */
    private static transformParsedReadingElement(
        readingElement: ParsedReadingElement
    ): JMdictReadingElement {
        const reading = readingElement.reb[0];

        if (!reading) {
            throw new ParseError('Reading element is missing reading');
        }

        return {
            reading,
            noKanjiReading: readingElement.re_nokanji ? true : undefined,
            priority: readingElement.re_pri,
            additionalInformation: readingElement.re_inf,
            restrictedReading: readingElement.re_restr
        };
    }

    /**
     * Transform a parsed sense element into a JMdictSenseElementElement object
     *
     * @private
     * @static
     * @param senseElement - The sense element parsed using xml2js
     * @param lastPartsOfSpeech - The parts of speech of the previous sense
     * @returns A JMdictSenseElement object
     * @throws {ParseError} If the sense element is missing glosses
     */
    private static transformParsedSenseElement(
        senseElement: ParsedSenseElement,
        lastPartsOfSpeech: string[] | undefined
    ): JMdictSenseElement {
        const sourceLanguages = senseElement.lsource?.map((sourceLanguage) =>
            this.transformParsedLanguageSource(sourceLanguage)
        );

        const crossReferences = senseElement.xref?.map((crossReference) =>
            this.transformParsedCrossReference(crossReference)
        );

        const glosses = senseElement.gloss?.map((gloss) =>
            this.transformParsedGloss(gloss)
        );

        /* Parts of speech are inherited from the previous sense if they are not present */
        const partsOfSpeech = senseElement.pos
            ? senseElement.pos
            : lastPartsOfSpeech;

        const antonyms = senseElement.ant ? senseElement.ant : undefined;
        const fieldsOfApplication = senseElement.field
            ? senseElement.field
            : undefined;
        const miscellaneous = senseElement.misc ? senseElement.misc : undefined;
        const additionalInformation = senseElement.s_inf
            ? senseElement.s_inf
            : undefined;
        const dialects = senseElement.dial ? senseElement.dial : undefined;

        return {
            partsOfSpeech,
            crossReferences,
            sourceLanguages,
            glosses,
            antonyms,
            fieldsOfApplication,
            miscellaneous,
            additionalInformation,
            dialects
        };
    }

    /**
     * Transform a parsed language source into a JMdictLanguageSource object
     *
     * @private
     * @static
     * @param languageSource - The language source parsed using xml2js
     * @returns A JMdictLanguageSource object
     * @throws {ParseError} If the language source is missing a word
     */
    private static transformParsedLanguageSource(
        languageSource: ParsedLanguageSource
    ): JMdictLanguageSource {
        if (typeof languageSource === 'string') {
            return {
                word: languageSource,
                language: 'eng',
                type: 'full',
                wasei: false
            };
        }

        return {
            word: languageSource._,
            language: languageSource.$?.['xml:lang'] ?? 'eng',
            type: languageSource.$?.ls_type === 'part' ? 'partial' : 'full',
            wasei: languageSource.$?.ls_wasei ? true : false
        };
    }

    /**
     * Transform a parsed cross reference into a JMdictCrossReference object
     *
     * @private
     * @static
     * @param crossReference - The cross reference parsed using xml2js
     * @returns A JMdictCrossReference object
     */
    private static transformParsedCrossReference(
        crossReference: string
    ): JMdictCrossReference {
        const parts = crossReference.split('・');

        /* Word always exists */
        const xref: JMdictCrossReference = {
            word: parts[0]
        };

        if (parts.length === 1) {
            return xref;
        }

        /**
         * If the second part is a number and the third part does not exist,
         * then the second part is the sense index
         */
        if (+parts[1] && !parts[2]) {
            xref.senseIndex = +parts[1];
            return xref;
        }

        /**
         * If the second part is not a number and the third part does not exist,
         * then the second part is the reading
         */
        if (parts[1] && !parts[2]) {
            xref.reading = parts[1];
            return xref;
        }

        xref.reading = parts[1];
        xref.senseIndex = +parts[2];
        return xref;
    }

    /**
     * Transform a parsed gloss into a JMdictGloss object
     *
     * @private
     * @static
     * @param parsedGloss - The gloss parsed using xml2js
     * @returns A JMdictGloss object
     */
    private static transformParsedGloss(parsedGloss: ParsedGloss): JMdictGloss {
        if (typeof parsedGloss === 'string') {
            return {
                language: 'eng',
                gloss: parsedGloss
            };
        }

        const gloss: JMdictGloss = {
            language: parsedGloss.$?.['xml:lang']
                ? parsedGloss.$['xml:lang']
                : 'eng',
            gloss: parsedGloss._,
            gender: parsedGloss.$?.g_gend
                ? (parsedGloss.$?.g_gend as JMdictGlossGender)
                : undefined
        };

        if (parsedGloss.$?.g_type) {
            switch (parsedGloss.$.g_type) {
                case 'expl':
                    gloss.type = 'explanation';
                    break;
                case 'lit':
                    gloss.type = 'literal';
                    break;
                case 'fig':
                    gloss.type = 'figurative';
                    break;
                case 'tm':
                    gloss.type = 'trademark';
                    break;
                default:
                    gloss.type = parsedGloss.$.g_type as JMdictGlossType;
            }
        }

        return gloss;
    }
}

export { JMdictParser };
