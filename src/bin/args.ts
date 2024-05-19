import yargs, { ArgumentsCamelCase } from 'yargs';
import { ConvertArgs } from '@/types/cli';
import { convert } from './convert';

const args = yargs
    .scriptName('jmdictjs')
    .version()
    .alias('v', 'version')
    .help()
    .alias('h', 'help')
    .command(
        'convert',
        'Convert JMdict files to different formats',
        (yargs) => {
            return (
                yargs
                    .option('to', {
                        alias: 't',
                        type: 'string',
                        description: 'Format to convert to',
                        choices: ['json'],
                        default: 'json'
                    })
                    .option('input', {
                        alias: 'i',
                        type: 'string',
                        description: 'Path to JMdict file',
                        demandOption: true
                    })
                    .option('output', {
                        alias: 'o',
                        type: 'string',
                        description: 'Path to output file',
                        demandOption: true
                    })
                    /**
                     * @todo Implement this option
                     */
                    .option('keepOriginalTagNames', {
                        type: 'boolean',
                        description:
                            'Keep original tag names when converting (currently not implemented)',
                        default: false
                    })
                    .option('resolveEntities', {
                        type: 'boolean',
                        description: 'Resolve entities when converting',
                        default: false
                    })
                    .parse()
            );
        },
        /**
         * For some reason, the type needs to be wrapped in ArgumentsCamelCase here,
         * even when it is already wrapped in the original type definition
         */
        (args: ArgumentsCamelCase<ConvertArgs>) => convert(args)
    );

export { args };
