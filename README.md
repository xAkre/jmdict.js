# [jmdict.js](https://www.npmjs.com/package/jmdict.js)

[jmdict.js](https://www.npmjs.com/package/jmdict.js) is a library for working with [JMdict Japanese dictionary files.](http://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project)

## Installation

You can install jmdict.js via npm:

```bash
npm install jmdict.js
```

## Features

-   Parse JMdict files and XML strings into typesafe objects

## Usage

### Parsing from an XML string

```typescript
import { readFileSync } from 'fs';
import { JMdictParser } from 'jmdict.js';

const xmlString = readFileSync('pathToJMdictFile.xml', 'utf8');
const jmdict = await JMdictParser.fromXmlString(xmlString);
const entries = jmdict.entries;
```
