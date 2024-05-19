import { describe, expect, test } from '@jest/globals';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

describe('Command line interface', () => {
    test('Can convert XML file to JSON', () => {
        const inputFile = join(__dirname, '..', 'data/xml/fullDataEntry.xml');
        const outputFile = join(__dirname, 'temp.json');

        runCommand('convert', '-i', inputFile, '-o', outputFile);

        const output = readFileSync(outputFile).toString();
        const expectedOutput = readFileSync(
            join(__dirname, '..', 'data/expectedJson/fullDataEntry.json')
        ).toString();

        unlinkSync(outputFile);
        expect(JSON.parse(output)).toEqual(JSON.parse(expectedOutput));
    });
});

const runCommand = (...args: string[]) => {
    return execSync(`node dist/bin/cli.js ${args.join(' ')}`).toString();
};
