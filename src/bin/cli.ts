#!/usr/bin/env node
import { args } from './args';

const main = async () => {
    await args.parse();
};

main();
