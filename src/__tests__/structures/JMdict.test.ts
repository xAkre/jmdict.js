import { readFileSync, unlinkSync } from 'fs';
import { inspect } from 'util';
import { join } from 'path';
import { expect, describe, test } from '@jest/globals';
import { JMdictParser } from '@/structures';

describe('JMdict', () => {
    test('Can write JMdict entries to a JSON file', async () => {
        const jsonFilePath = join(__dirname, 'fullDataEntry.json');

        const dict = await JMdictParser.fromXmlFile(
            join(__dirname, '..', 'data/xml/fullDataEntry.xml')
        );
        dict.writeToJsonFile(jsonFilePath);

        const data = readFileSync(jsonFilePath, 'utf-8');
        const expectedData = readFileSync(
            join(__dirname, '..', 'data/expectedJson/fullDataEntry.json'),
            'utf-8'
        );

        console.log(inspect(JSON.parse(data), false, null, true));

        unlinkSync(jsonFilePath);
        expect(JSON.parse(data)).toEqual(JSON.parse(expectedData));
    });
});
