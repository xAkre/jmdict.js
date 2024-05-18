<div style="display:flex; gap: 5px;">
    <a href="https://npmcharts.com/compare/jmdict.js">
        <img src="https://img.shields.io/npm/dm/jmdict.js.svg">
    </a>
    <a href="https://packagephobia.com/result?p=jmdict.js">
        <img src="https://packagephobia.com/badge?p=jmdict.js" alt="install size">
    </a>
</div>

# jmdict.js

[jmdict.js](https://www.npmjs.com/package/jmdict.js) is a library for working with [JMdict Japanese dictionary files.](http://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project)

## Installation

You can install jmdict.js via npm:

```bash
npm install jmdict.js
```

## Features

-   Parse JMdict files and XML strings into typesafe objects
-   Write JMdict objects to JSON files

## Usage

### Parsing from an XML string

```typescript
import { readFileSync } from 'fs';
import { JMdictParser } from 'jmdict.js';

const xmlString = readFileSync('pathToJMdictFile.xml', 'utf8');
const jmdict = await JMdictParser.fromXmlString(xmlString);
const entries = jmdict.entries;
```

### Parsing from a file

```typescript
import { JMdictParser } from 'jmdict.js';

const jmdict = await JMdictParser.fromXmlFile('pathToJMdictFile.xml');
const entries = jmdict.entries;
```

### Writing to a JSON file

```typescript
import { JMdictParser } from 'jmdict.js';

const jmdict = await JMdictParser.fromXmlFile('pathToJMdictFile.xml');
jmdict.writeToJsonFile('pathToOutputFile.json');
```
