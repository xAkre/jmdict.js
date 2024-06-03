import { JMdictEntry } from '@/types/jmdict';

/**
 * Expected object for: {@link '../xml/fullDataEntry.xml'}
 */
const expectedObject: JMdictEntry = {
    id: '100',
    kanji: [
        {
            kanji: '日本',
            additionalInformation: [
                'Some additional information',
                'Some other additional information'
            ],
            priority: ['ichi1', 'news1']
        }
    ],
    readings: [
        {
            reading: 'にほん',
            noKanjiReading: true,
            restrictedReading: ['日本'],
            additionalInformation: [
                'Some additional information',
                'Some other additional information'
            ],
            priority: ['ichi1', 'news1']
        }
    ],
    senses: [
        {
            partsOfSpeech: ['&n;', '&adj-i;'],
            crossReferences: [
                {
                    word: 'word'
                },
                {
                    word: 'word',
                    reading: 'reading'
                },
                {
                    word: 'word',
                    senseIndex: 1
                },
                {
                    word: 'word',
                    reading: 'reading',
                    senseIndex: 1
                }
            ],
            antonyms: ['Antonym', 'Another antonym'],
            fieldsOfApplication: ['&biol;', '&biochem;'],
            miscellaneous: [
                'Some misc information',
                'Some other misc information'
            ],
            additionalInformation: [
                'Some additional information',
                'Some other additional information'
            ],
            sourceLanguages: [
                {
                    language: 'eng',
                    type: 'full',
                    word: 'Source',
                    wasei: false
                },
                {
                    language: 'fra',
                    type: 'full',
                    word: 'Source',
                    wasei: false
                },
                {
                    language: 'ger',
                    type: 'partial',
                    word: 'Source',
                    wasei: false
                },
                {
                    language: 'dut',
                    type: 'partial',
                    word: 'Source',
                    wasei: true
                }
            ],
            dialects: ['&hob;', '&ksb;'],
            glosses: [
                {
                    language: 'eng',
                    gloss: 'Japan'
                },
                {
                    language: 'rus',
                    gloss: 'Japan'
                },
                {
                    language: 'dut',
                    gender: 'feminine',
                    gloss: 'Japan'
                },
                {
                    language: 'fra',
                    gender: 'masculine',
                    type: 'trademark',
                    gloss: 'Japan'
                }
            ]
        }
    ]
};

export { expectedObject };
