import { describe, test, expect } from '@jest/globals';
import { JMdictEntry } from '@/types';
import { JMdictParser } from '@/structures';

describe('JMdictParser', () => {
    test('Can parse minimal JMdict XML string', async () => {
        const xmlString = `
            <JMdict>
                <entry>
                    <ent_seq>1</ent_seq>
                    <k_ele>
                        <keb>日本</keb>
                    </k_ele>
                    <r_ele>
                        <reb>にほん</reb>
                    </r_ele>
                    <sense>
                        <gloss>Japan</gloss>
                    </sense>
                </entry>
            </JMdict>
        `;

        const jmdict = await JMdictParser.fromXmlString(xmlString);

        expect(jmdict).toBeDefined();
        expect(jmdict.entries).toHaveLength(1);

        const entry = jmdict.entries[0];
        const expectedObject: JMdictEntry = {
            id: '1',
            kanji: [
                {
                    kanji: '日本'
                }
            ],
            readings: [
                {
                    reading: 'にほん'
                }
            ],
            senses: [
                {
                    glosses: [
                        {
                            gloss: 'Japan',
                            language: 'eng'
                        }
                    ]
                }
            ]
        };

        expect(entry).toEqual(expectedObject);
    });

    test('Can parse entry with all possible fields', async () => {
        const xmlString = `
            <JMdict>
                <entry>
                    <ent_seq>1</ent_seq>
                    <k_ele>
                        <keb>日本</keb>
                        <ke_inf>inf</ke_inf>
                        <ke_inf>inf2</ke_inf>
                        <ke_pri>news1</ke_pri>
                        <ke_pri>news2</ke_pri>
                    </k_ele>
                    <r_ele>
                        <reb>にほん</reb>
                        <re_nokanji />
                        <re_restr>restr</re_restr>
                        <re_restr>restr2</re_restr>
                        <re_inf>inf</re_inf>
                        <re_inf>inf2</re_inf>
                        <re_pri>news1</re_pri>
                        <re_pri>news2</re_pri>
                    </r_ele>
                    <sense>
                        <pos>pos</pos>
                        <pos>pos2</pos>
                        <xref>xref</xref>
                        <xref>xref2・1</xref>
                        <xref>xref3・xref4</xref>
                        <xref>xref5・xref6・2</xref>
                        <ant>ant</ant>
                        <ant>ant2</ant>
                        <field>field</field>
                        <field>field2</field>
                        <misc>misc</misc>
                        <misc>misc2</misc>
                        <s_inf>s_inf</s_inf>
                        <s_inf>s_inf2</s_inf>
                        <lsource>source</lsource>
                        <lsource lang="ger" ls_type="part">quelle</lsource>
                        <lsource lang="ger" ls_type="part" ls_wasei="y">quelle</lsource>
                        <dial>dialect</dial>
                        <dial>dialect2</dial>
                        <gloss>Japan</gloss>
                        <gloss xml:lang="ger">Japan</gloss>
                        <gloss xml:lang="fra" g_gend="feminine">Japan</gloss>
                        <gloss xml:lang="fra" g_gend="neuter" g_type="expl">Japan</gloss>
                    </sense>
                </entry>
            </JMdict>
        `;

        const jmdict = await JMdictParser.fromXmlString(xmlString);

        expect(jmdict).toBeDefined();
        expect(jmdict.entries).toHaveLength(1);

        const entry = jmdict.entries[0];
        const expectedObject: JMdictEntry = {
            id: '1',
            kanji: [
                {
                    kanji: '日本',
                    additionalInformation: ['inf', 'inf2'],
                    priority: ['news1', 'news2']
                }
            ],
            readings: [
                {
                    reading: 'にほん',
                    noKanjiReading: true,
                    restrictedReading: ['restr', 'restr2'],
                    additionalInformation: ['inf', 'inf2'],
                    priority: ['news1', 'news2']
                }
            ],
            senses: [
                {
                    partsOfSpeech: ['pos', 'pos2'],
                    crossReferences: [
                        {
                            word: 'xref'
                        },
                        {
                            word: 'xref2',
                            senseIndex: 1
                        },
                        {
                            word: 'xref3',
                            reading: 'xref4'
                        },
                        {
                            word: 'xref5',
                            reading: 'xref6',
                            senseIndex: 2
                        }
                    ],
                    antonyms: ['ant', 'ant2'],
                    fieldsOfApplication: ['field', 'field2'],
                    miscellaneous: ['misc', 'misc2'],
                    additionalInformation: ['s_inf', 's_inf2'],
                    sourceLanguages: [
                        {
                            language: 'eng',
                            word: 'source',
                            type: 'full'
                        },
                        {
                            language: 'ger',
                            word: 'quelle',
                            type: 'partial'
                        },
                        {
                            language: 'ger',
                            word: 'quelle',
                            type: 'partial',
                            wasei: true
                        }
                    ],
                    dialects: ['dialect', 'dialect2'],
                    glosses: [
                        {
                            gloss: 'Japan',
                            language: 'eng'
                        },
                        {
                            gloss: 'Japan',
                            language: 'ger'
                        },
                        {
                            gloss: 'Japan',
                            language: 'fra',
                            gender: 'feminine'
                        },
                        {
                            gloss: 'Japan',
                            language: 'fra',
                            gender: 'neuter',
                            type: 'explanation'
                        }
                    ]
                }
            ]
        };

        expect(entry).toEqual(expectedObject);
    });

    test('Can parse multiple entries', async () => {
        const xmlString = `
            <JMdict>
                <entry>
                    <ent_seq>1</ent_seq>
                    <k_ele>
                        <keb>日本</keb>
                    </k_ele>
                    <r_ele>
                        <reb>にほん</reb>
                    </r_ele>
                    <sense>
                        <gloss>Japan</gloss>
                    </sense>
                </entry>
                <entry>
                    <ent_seq>2</ent_seq>
                    <k_ele>
                        <keb>日本語</keb>
                    </k_ele>
                    <r_ele>
                        <reb>にほんご</reb>
                    </r_ele>
                    <sense>
                        <gloss>Japanese language</gloss>
                    </sense>
                </entry>
            </JMdict>
        `;

        const jmdict = await JMdictParser.fromXmlString(xmlString);

        expect(jmdict).toBeDefined();
        expect(jmdict.entries).toHaveLength(2);

        const entry1 = jmdict.entries[0];
        const expectedObject1: JMdictEntry = {
            id: '1',
            kanji: [
                {
                    kanji: '日本'
                }
            ],
            readings: [
                {
                    reading: 'にほん'
                }
            ],
            senses: [
                {
                    glosses: [
                        {
                            gloss: 'Japan',
                            language: 'eng'
                        }
                    ]
                }
            ]
        };

        expect(entry1).toEqual(expectedObject1);

        const entry2 = jmdict.entries[1];
        const expectedObject2: JMdictEntry = {
            id: '2',
            kanji: [
                {
                    kanji: '日本語'
                }
            ],
            readings: [
                {
                    reading: 'にほんご'
                }
            ],
            senses: [
                {
                    glosses: [
                        {
                            gloss: 'Japanese language',
                            language: 'eng'
                        }
                    ]
                }
            ]
        };

        expect(entry2).toEqual(expectedObject2);
    });
});
