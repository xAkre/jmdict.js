import { ArgumentsCamelCase } from 'yargs';

type ConvertArgs = ArgumentsCamelCase<{
    to: string;
    input: string;
    output: string;
    keepOriginalTagNames: boolean;
    resolveEntities: boolean;
}>;

export { ConvertArgs };
