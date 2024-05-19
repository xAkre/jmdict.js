import { ConvertArgs } from '@/types/cli';
import { JMdictParser, Logger } from '@/structures';

/**
 * Convert JMdict files to different formats
 *
 * @param args - Command line arguments
 */
const convert = async (args: ConvertArgs) => {
    const logger = new Logger();

    const jmdict = await JMdictParser.fromXmlFile(args.input, {
        resolveEntities: args.resolveEntities
    });

    switch (args.to) {
        case 'json': {
            jmdict.writeToJsonFile(args.output);
            logger.info(`Converted JMdict file to JSON: ${args.output}`);
            break;
        }
    }
};

export { convert };
