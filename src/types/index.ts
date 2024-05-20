/**
 * These type definitions are based on the JMDict XML DTD file
 *
 * https://www.edrdg.org/jmdict/jmdict_dtd_h.html
 */

/**
 *
 *  JMdict types
 *
 */

/**
 * An entry in the JMdict dictionary
 */
interface JMdictEntry {
    id: string;
    kanji?: JMdictKanjiElement[];
    readings: JMdictReadingElement[];
    senses: JMdictSenseElement[];
}

/**
 * Kanji elements contain information about the kanji form of an entry.
 * Most entries will have a single kanji element, but there are cases where
 * an entry can have multiple kanji elements, in which case they will be
 * orthographical variants of the same word. Sometimes mis-spellings may also be
 * included, provided they are labeled as so inside the information fields
 */
interface JMdictKanjiElement {
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
    priority?: JMdictPriority[];

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
interface JMdictReadingElement {
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
     * Same as {@link JMdictKanjiElement.priority}, but for the reading element
     */
    priority?: JMdictPriority[];
}

/**
 * Priority codes for kanji and reading elements
 */
type JMdictPriority =
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
interface JMdictSenseElement {
    /**
     * This array contains entity codes (resolved or not) that outline what
     * parts of speech the sense element belongs to
     */
    partsOfSpeech?: string[];

    /**
     * This array contains cross-references to other entries that are related
     * to the sense element
     */
    crossReferences?: JMdictCrossReference[];

    /**
     * This array contains antonyms of the sense element. The contents of the
     * strings must match exactly with a kanji representation or a reading
     */
    antonyms?: string[];

    /**
     * This array contains information about the field of application of the
     * sense element. In it's absence, a general application is assumed
     */
    fieldsOfApplication?: string[];

    /**
     * This array contains other miscellaneous information about the sense element
     */
    miscellaneous?: string[];

    /**
     * This array contanins additional information to be recorded about the sense element
     */
    additionalInformation?: string[];

    /**
     * This array contains information about the source of loan words
     */
    sourceLanguages?: JMdictLanguageSource[];

    /**
     * This array contains entity codes (resolved or not) that associate the sense with
     * certain dialects
     */
    dialects?: string[];

    /**
     * This array contains glosses that provide translated equivalents of the Japanese word
     */
    glosses: JMdictGloss[];
}

/**
 * Cross-references are used to point to other entries
 */
interface JMdictCrossReference {
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
type JMdictLanguageSource =
    | string
    | {
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
          type: JMdictLanguageSourceType;

          /**
           * Indicates that the Japanese word has been constructed from words in the
           * source language, and not from an actual phrase in that language
           */
          wasei?: true;
      };

/**
 * Possible language source types
 */
type JMdictLanguageSourceType = 'full' | 'partial';

/**
 * Glosses provide translated equivalents of Japanese words
 */
interface JMdictGloss {
    /**
     * The language code of the gloss
     */
    language: string;

    /**
     * Gender of the word in the target language
     */
    gender?: JMdictGlossGender;

    /**
     * The translated equivalent of the Japanese word
     */
    gloss: string;

    /**
     * The type of gloss
     */
    type?: JMdictGlossType;
}

/**
 * Possible word genders
 */
type JMdictGlossGender = 'masculine' | 'feminine' | 'neuter';

/**
 * Possible gloss types
 */
type JMdictGlossType = 'figurative' | 'literal' | 'explanation' | 'trademark';

/**
 * A mapping of JMdict entity codes to their human-readable names.
 */
interface JMdictEntityMap {
    bra: string;
    hob: string;
    ksb: string;
    ktb: string;
    kyb: string;
    kyu: string;
    nab: string;
    osb: string;
    rkb: string;
    thb: string;
    tsb: string;
    tsug: string;
    agric: string;
    anat: string;
    archeol: string;
    archit: string;
    art: string;
    astron: string;
    audvid: string;
    aviat: string;
    baseb: string;
    biochem: string;
    biol: string;
    bot: string;
    boxing: string;
    Buddh: string;
    bus: string;
    cards: string;
    chem: string;
    chmyth: string;
    Christn: string;
    civeng: string;
    cloth: string;
    comp: string;
    cryst: string;
    dent: string;
    ecol: string;
    econ: string;
    elec: string;
    electr: string;
    embryo: string;
    engr: string;
    ent: string;
    figskt: string;
    film: string;
    finc: string;
    fish: string;
    food: string;
    gardn: string;
    genet: string;
    geogr: string;
    geol: string;
    geom: string;
    go: string;
    golf: string;
    gramm: string;
    grmyth: string;
    hanaf: string;
    horse: string;
    internet: string;
    jpmyth: string;
    kabuki: string;
    law: string;
    ling: string;
    logic: string;
    MA: string;
    mahj: string;
    manga: string;
    math: string;
    mech: string;
    med: string;
    met: string;
    mil: string;
    min: string;
    mining: string;
    motor: string;
    music: string;
    noh: string;
    ornith: string;
    paleo: string;
    pathol: string;
    pharm: string;
    phil: string;
    photo: string;
    physics: string;
    physiol: string;
    politics: string;
    print: string;
    prowres: string;
    psy: string;
    psyanal: string;
    psych: string;
    rail: string;
    rommyth: string;
    Shinto: string;
    shogi: string;
    ski: string;
    sports: string;
    stat: string;
    stockm: string;
    sumo: string;
    surg: string;
    telec: string;
    tradem: string;
    tv: string;
    vet: string;
    vidg: string;
    zool: string;
    ateji: string;
    ik: string;
    iK: string;
    io: string;
    oK: string;
    rK: string;
    sK: string;
    abbr: string;
    arch: string;
    char: string;
    chn: string;
    col: string;
    company: string;
    creat: string;
    dated: string;
    dei: string;
    derog: string;
    doc: string;
    euph: string;
    ev: string;
    fam: string;
    fem: string;
    fict: string;
    form: string;
    given: string;
    group: string;
    hist: string;
    hon: string;
    hum: string;
    id: string;
    joc: string;
    leg: string;
    'm-sl': string;
    male: string;
    myth: string;
    'net-sl': string;
    obj: string;
    obs: string;
    'on-mim': string;
    organization: string;
    oth: string;
    person: string;
    place: string;
    poet: string;
    pol: string;
    product: string;
    proverb: string;
    quote: string;
    rare: string;
    relig: string;
    sens: string;
    serv: string;
    ship: string;
    sl: string;
    station: string;
    surname: string;
    uk: string;
    unclass: string;
    vulg: string;
    work: string;
    X: string;
    yoji: string;
    'adj-f': string;
    'adj-i': string;
    'adj-ix': string;
    'adj-kari': string;
    'adj-ku': string;
    'adj-na': string;
    'adj-nari': string;
    'adj-no': string;
    'adj-pn': string;
    'adj-shiku': string;
    'adj-t': string;
    adv: string;
    'adv-to': string;
    aux: string;
    'aux-adj': string;
    'aux-v': string;
    conj: string;
    cop: string;
    ctr: string;
    exp: string;
    int: string;
    n: string;
    'n-adv': string;
    'n-pr': string;
    'n-pref': string;
    'n-suf': string;
    'n-t': string;
    num: string;
    pn: string;
    pref: string;
    prt: string;
    suf: string;
    unc: string;
    'v-unspec': string;
    v1: string;
    'v1-s': string;
    'v2a-s': string;
    'v2b-k': string;
    'v2b-s': string;
    'v2d-k': string;
    'v2d-s': string;
    'v2g-k': string;
    'v2g-s': string;
    'v2h-k': string;
    'v2h-s': string;
    'v2k-k': string;
    'v2k-s': string;
    'v2m-k': string;
    'v2m-s': string;
    'v2n-s': string;
    'v2r-k': string;
    'v2r-s': string;
    'v2s-s': string;
    'v2t-k': string;
    'v2t-s': string;
    'v2w-s': string;
    'v2y-k': string;
    'v2y-s': string;
    'v2z-s': string;
    v4b: string;
    v4g: string;
    v4h: string;
    v4k: string;
    v4m: string;
    v4n: string;
    v4r: string;
    v4s: string;
    v4t: string;
    v5aru: string;
    v5b: string;
    v5g: string;
    v5k: string;
    'v5k-s': string;
    v5m: string;
    v5n: string;
    v5r: string;
    'v5r-i': string;
    v5s: string;
    v5t: string;
    v5u: string;
    'v5u-s': string;
    v5uru: string;
    vi: string;
    vk: string;
    vn: string;
    vr: string;
    vs: string;
    'vs-c': string;
    'vs-i': string;
    'vs-s': string;
    vt: string;
    vz: string;
    gikun: string;
    ok: string;
    rk: string;
    sk: string;
}

/**
 *
 * Types representing parsed JMdict data using xml2js
 *
 */
interface ParsedJMdictEntry {
    ent_seq: string[];
    k_ele?: ParsedKanjiElement[];
    r_ele: ParsedReadingElement[];
    sense: ParsedSenseElement[];
}

interface ParsedKanjiElement {
    keb: string[];
    ke_pri?: string[];
    ke_inf?: string[];
}

interface ParsedReadingElement {
    reb: string[];
    re_nokanji?: string[];
    re_pri?: string[];
    re_inf?: string[];
    re_restr?: string[];
}

interface ParsedSenseElement {
    pos: string[];
    xref?: string[];
    ant?: string[];
    field?: string[];
    misc?: string[];
    s_inf?: string[];
    lsource?: ParsedLanguageSource[];
    dial?: string[];
    gloss: ParsedGloss[];
}

interface ParsedLanguageSource {
    _: string;
    $: {
        'xml:lang'?: string;
        ls_type?: string;
        ls_wasei?: string;
    };
}

type ParsedGloss =
    | string
    | {
          _: string;
          $: {
              'xml:lang'?: string;
              g_type?: string;
              g_gend?: string;
          };
      };

export {
    JMdictEntry,
    JMdictKanjiElement,
    JMdictReadingElement,
    JMdictSenseElement,
    JMdictCrossReference,
    JMdictLanguageSource,
    JMdictGloss,
    JMdictLanguageSourceType,
    JMdictGlossGender,
    JMdictGlossType,
    JMdictEntityMap,
    JMdictPriority,
    ParsedJMdictEntry,
    ParsedKanjiElement,
    ParsedReadingElement,
    ParsedSenseElement,
    ParsedLanguageSource,
    ParsedGloss
};
