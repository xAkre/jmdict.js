/**
 * These type definitions are based on the KanjiDic XML DTD
 *
 * http://nihongo.monash.edu/kanjidic2/kanjidic2_dtdh.html
 */

/**
 *
 *  KanjiDic types
 *
 */

/**
 * Represents a single character in the KanjiDic
 */
interface KanjiDicCharacter {
    kanji: string;
    codepoints: KanjiDicCodePoint[];
    radicals: KanjiDicRadical[];
    miscellaneous: KanjiDicMisc;
    dictionaryNumbers?: KanjiDicDicNumber[];
    queryCodes?: KanjiDicQueryCode[];
    readings?: KanjiDicReading[];
    meanings?: KanjiDicMeaning[];
    nanori?: string[];
}

/**
 * States the codepoint of the character in various character sets
 */
interface KanjiDicCodePoint {
    codepoint: string;
    standard: 'jis208' | 'jis212' | 'jis213' | 'ucs';
}

/**
 *
 */
interface KanjiDicRadical {
    radical: string;
    type: 'classical' | 'nelson_c';
}

interface KanjiDicMisc {
    grade?: string;
    strokeCount: string;
    variants?: KanjiDicMiscVariant[];
    frequency?: string;
    radicalName?: string;
    jlpt?: string;
}

interface KanjiDicMiscVariant {
    variant: string;
    type:
        | 'jis208'
        | 'jis212'
        | 'jis213'
        | 'deroo'
        | 'njecd'
        | 's_h'
        | 'nelson_c'
        | 'oneill'
        | 'ucs';
}

interface KanjiDicDicNumber {
    number: string;
    dictionary:
        | 'nelson_c'
        | 'nelson_n'
        | 'halpern_njecd'
        | 'halpern_kkld'
        | 'halpern_kkd'
        | 'heisig'
        | 'gakken'
        | 'oneill_names'
        | 'oneill_kk'
        | 'moro'
        | 'henshall'
        | 'sh_kk'
        | 'sakade'
        | 'jf_cards'
        | 'henshall3'
        | 'tutt_cards'
        | 'crowley'
        | 'kanji_in_context'
        | 'busy_people'
        | 'kodansha_compact'
        | 'maniette'
        | string;
    volume?: string;
    page?: string;
}

interface KanjiDicQueryCode {
    code: string;
    type: 'skip' | 'sh_desc' | 'four_corner' | 'deroo' | 'misclass';
    skipMisclass?: 'posn' | 'stroke_count' | 'stroke_and_posn' | 'stroke_diff';
}

interface KanjiDicReading {
    reading: string;
    type:
        | 'pinyin'
        | 'korean_r'
        | 'korean_h'
        | 'ja_on'
        | 'ja_kun'
        | 'ja_go'
        | 'ja_kun'
        | string;
    onType?: 'ja_kun' | 'ja_on';
    status?: string;
}

interface KanjiDicMeaning {
    meaning: string;
    language: string;
}

/**
 *
 *  Types representing parsed KanjiDic data using xml2js
 *
 */
interface ParsedKanjiDicCharacter {
    literal: string[];
    codepoint: ParsedKanjiDicCodepoint[];
    radical: ParsedKanjiDicRadical[];
    misc: ParsedKanjiDicMisc[];
    dic_number?: ParsedKanjiDicDicNumber[];
    query_code?: ParsedKanjiDicQueryCode[];
    reading_meaning?: ParsedKanjiDicReadingMeaning[];
}

interface ParsedKanjiDicCodepoint {
    cp_value: {
        _: string;
        $: {
            cp_type: 'jis208' | 'jis212' | 'jis213' | 'ucs';
        };
    }[];
}

interface ParsedKanjiDicRadical {
    rad_value: {
        _: string;
        $: {
            rad_type: 'classical' | 'nelson_c';
        };
    }[];
}

interface ParsedKanjiDicMisc {
    grade?: string[];
    stroke_count: string[];
    variant?: ParsedKanjiDicMiscVariant[];
    freq?: string[];
    rad_name?: string[];
    jlpt?: string[];
}

interface ParsedKanjiDicMiscVariant {
    _: string;
    $: {
        var_type:
            | 'jis208'
            | 'jis212'
            | 'jis213'
            | 'deroo'
            | 'njecd'
            | 's_h'
            | 'nelson_c'
            | 'oneill'
            | 'ucs';
    };
}

interface ParsedKanjiDicDicNumber {
    dic_ref: {
        _: string;
        $: {
            dr_type:
                | 'nelson_c'
                | 'nelson_n'
                | 'halpern_njecd'
                | 'halpern_kkld'
                | 'heisig'
                | 'gakken'
                | 'oneill_names'
                | 'oneill_kk'
                | 'moro'
                | 'henshall'
                | 'sh_kk'
                | 'sakade'
                | 'jf_cards'
                | 'henshall3'
                | 'tutt_cards'
                | 'crowley'
                | 'kanji_in_context'
                | 'busy_people'
                | 'kodansha_compact'
                | 'maniette';
            m_vol?: string;
            m_page?: string;
        };
    }[];
}

interface ParsedKanjiDicQueryCode {
    q_code: {
        _: string;
        $: {
            qc_type: 'skip' | 'sh_desc' | 'four_corner' | 'deroo' | 'misclass';
            skip_misclass?:
                | 'posn'
                | 'stroke_count'
                | 'stroke_and_posn'
                | 'stroke_diff';
        };
    }[];
}

interface ParsedKanjiDicReadingMeaning {
    rmgroup?: ParsedKanjiDicReadingMeaningGroup[];
    nanori?: string[];
}

interface ParsedKanjiDicReadingMeaningGroup {
    reading?: {
        _: string;
        $: {
            r_type:
                | 'pinyin'
                | 'korean_r'
                | 'korean_h'
                | 'ja_on'
                | 'ja_kun'
                | 'ja_go'
                | 'ja_kun';
            on_type?: 'ja_kun' | 'ja_on';
            r_status?: string;
        };
    }[];
    meaning?: (
        | {
              _: string;
              $: {
                  m_lang: string;
              };
          }
        | string
    )[];
}

export {
    KanjiDicCharacter,
    KanjiDicCodePoint,
    KanjiDicRadical,
    KanjiDicMisc,
    KanjiDicMiscVariant,
    KanjiDicDicNumber,
    KanjiDicQueryCode,
    KanjiDicReading,
    KanjiDicMeaning,
    ParsedKanjiDicCharacter,
    ParsedKanjiDicCodepoint,
    ParsedKanjiDicRadical,
    ParsedKanjiDicMisc,
    ParsedKanjiDicMiscVariant,
    ParsedKanjiDicDicNumber,
    ParsedKanjiDicQueryCode,
    ParsedKanjiDicReadingMeaning,
    ParsedKanjiDicReadingMeaningGroup
};
