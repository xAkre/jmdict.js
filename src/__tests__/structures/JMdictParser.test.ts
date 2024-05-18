import { describe, test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join } from 'path';
import { JMdictParser } from '@/structures';
import { expectedObject as mininalEntryExpectedObject } from '../data/expectedObjects/minimalEntry';
import { expectedObject as fullDataEntryExpectedObject } from '../data/expectedObjects/fullDataEntry';

describe('JMdictParser', () => {
    test('Can parse minimal JMdict XML string', async () => {
        const xmlString = readFileSync(
            join(__dirname, '..', 'data/xml/minimalEntry.xml'),
            'utf-8'
        );

        const jmdict = await JMdictParser.fromXmlString(xmlString);

        expect(jmdict.entries).toHaveLength(1);

        const entry = jmdict.entries[0];
        expect(entry).toEqual(mininalEntryExpectedObject);
    });

    test('Can parse entry with all possible fields', async () => {
        const xmlString = readFileSync(
            join(__dirname, '..', 'data/xml/fullDataEntry.xml'),
            'utf-8'
        );

        const jmdict = await JMdictParser.fromXmlString(xmlString);

        expect(jmdict.entries).toHaveLength(1);

        const entry = jmdict.entries[0];
        expect(entry).toEqual(fullDataEntryExpectedObject);
    });

    test('Can parse JMdict XML file', async () => {
        const filePath = join(__dirname, '..', 'data/xml/fullDataEntry.xml');

        const jmdict = await JMdictParser.fromXmlFile(filePath);

        expect(jmdict.entries).toHaveLength(1);

        const entry = jmdict.entries[0];
        expect(entry).toEqual(fullDataEntryExpectedObject);
    });
});
