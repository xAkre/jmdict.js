import { JMdictEntry } from '@/types/jmdict';

/**
 * Expected object for: {@link '../xml/minimalEntry.xml'}
 */
const expectedObject: JMdictEntry = {
    id: '100',
    readings: [
        {
            reading: '日本'
        }
    ],
    senses: [
        {
            glosses: [
                {
                    language: 'eng',
                    gloss: 'Japan'
                }
            ]
        }
    ]
};

export { expectedObject };
