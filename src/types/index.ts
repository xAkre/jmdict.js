/**
 * These type definitions are based on the JMDict XML DTD file
 *
 * https://www.edrdg.org/jmdict/jmdict_dtd_h.html
 */

interface Entry {
    id: string;
    kanji: KanjiElement[];
    readings: ReadingElement[];
    senses: Sense[];
}

/**
 * Kanji elements contain information about the kanji form of an entry.
 * Most entries will have a single kanji element, but there are cases where
 * an entry can have multiple kanji elements, in which case they will be
 * orthographical variants of the same word. Sometimes mis-spellings may also be
 * included, provided they are labeled as so inside the information fields
 */
interface KanjiElement {
    /**
     * A kanji representation of the entry containing at least one non-kana
     * character
     */
    kanji: string;

    /**
     * This array contains information about how common the kanji is,
     * in the form of priority codes. The priority codes are:
     *
     * - news1 and news2: Words contained in Alexande Girardi's "wordfreq" file.
     *   Words in the first 12,000 are marked as "news1" and words in
     *   the second 12,000 as "news2"
     * - ichi1/2: Words that appear the "Ichimango goi bunruishuu" list. Entries
     *   marked ichi2 are lower in frequency than those marked ichi1
     * - spec1 and spec2: These codes are used for words that are detected as common
     *   but not included in other lists
     * - gai1/2: Common loanwords
     * - nfxx: This code is an indicator of frequency-of-use ranking in the
     *   wordfreq file. "xx" is the number of the set of 500 words in which
     *   the entry can be found, with "01" assigned to the first 500, "02"
     *   to the second, and so on.
     */
    priority?: Priority[];

    /**
     * This array contains information relating to the orthography of the
     * kanji element, such as okurigana iregularities
     */
    additionalInformation?: string[];
}

/**
 * Reading elements usually hold the valid readings of the word(s) represented
 * by the kanji element, using contemporary kana usage. When there are multiple reading elements,
 * they often serve as alternative readings for the kanji element. If there's no kanji element,
 * such as in the case of a word or phrase entirely written in Kana,
 * these elements will define the entry
 */
interface ReadingElement {
    /**
     * This property contains a reading for the entry, and is limited
     * to kana and other necessary characters
     */
    reading: string;

    /**
     * When this property is set to true, it indicates that the reading
     * cannot be truly regarded as a reading of the kanji element, like, for example,
     * in foreign names
     */
    noKanjiReading?: true;

    /**
     * If this array is populated, it indicates that the reading can only be
     * associated with a subset of the kanji elements in the entry. The contents of
     * the strings must match exactly with the kanji representations in the
     * kanji elements. In the abscence of this property, the reading applies to all
     * the kanji elements in the entry
     */
    restrictedReading?: string[];

    /**
     * This array contains information relating to the specific reading
     */
    additionalInformation?: string[];

    /**
     * Same as {@link KanjiElement.priority}, but for the reading element
     */
    priority?: Priority[];
}

/**
 * Priority codes for kanji and reading elements
 */
type Priority =
    | 'news1'
    | 'news2'
    | 'ichi1'
    | 'ichi2'
    | 'spec1'
    | 'spec2'
    | 'gai1'
    | 'gai2'
    | string;

/**
 * The sense element captures the translated equivalent of the Japanese word
 * along with additional related details. In cases where there are multiple
 * distinct meanings for the word, several sense elements will be utilized
 */
interface Sense {
    /**
     * This array contains entity codes (resolved or not) that outline what
     * parts of speech the sense element belongs to
     */
    partsOfSpeech: string[];

    /**
     * This array contains cross-references to other entries that are related
     * to the sense element
     */
    crossReferences: CrossReference[];

    /**
     * This array contains antonyms of the sense element. The contents of the
     * strings must match exactly with a kanji representation or a reading
     */
    antonyms: string[];

    /**
     * This array contains information about the field of application of the
     * sense element. In it's absence, a general application is assumed
     */
    fieldsOfApplication: string[];

    /**
     * This array contains other miscellaneous information about the sense element
     */
    miscellaneous: string[];

    /**
     * This array contanins additional information to be recorded about the sense element
     */
    additionalInformation: string[];

    /**
     * This array contains information about the source of loan words
     */
    sourceLanguages: LanguageSource[];

    /**
     * This array contains entity codes (resolved or not) that associate the sense with
     * certain dialects
     */
    dialects: string[];

    /**
     * This array contains glosses that provide translated equivalents of the Japanese word
     */
    glosses: Gloss[];
}

/**
 * Cross-references are used to point to other entries
 */
interface CrossReference {
    /**
     * The word that the cross-reference points to
     */
    word: string;

    /**
     * Options reading of the word that the cross-reference points to
     */
    reading?: string;

    /**
     * Optional array index of the sense of the word the cross-reference points to
     */
    senseIndex?: number;
}

/**
 * Language sources are used to indicate the source language of a loan word
 */
interface LanguageSource {
    /**
     * The word in the source language
     */
    word: string;

    /**
     * The language code of the source language
     */
    language: string;

    /**
     * Indicates whether the language source element fully or partially describes
     * the source word or phrase of the loanword. Possible values are 'full' and 'partial'
     */
    type?: LanguageSourceType;

    /**
     * Indicates that the Japanese word has been constructed from words in the
     * source language, and not from an actual phrase in that language
     */
    wasei?: true;
}

/**
 * Possible language source types
 */
type LanguageSourceType = 'full' | 'partial';

/**
 * Glosses provide translated equivalents of Japanese words
 */
interface Gloss {
    /**
     * The language code of the gloss
     */
    language: string;

    /**
     * Gender of the word in the target language
     */
    gender?: GlossGender;

    /**
     * The translated equivalent of the Japanese word
     */
    gloss: string;

    /**
     * The type of gloss
     */
    type?: GlossType;
}

/**
 * Possible word genders
 */
type GlossGender = 'masculine' | 'feminine' | 'neuter';

/**
 * Possible gloss types
 */
type GlossType = 'figurative' | 'literal' | 'explanation' | 'trademark';

export {
    Entry,
    KanjiElement,
    ReadingElement,
    Sense,
    CrossReference,
    LanguageSource,
    Gloss,
    LanguageSourceType,
    GlossGender,
    GlossType,
};
