<div style="display:flex; gap: 5px;">
    <a href="https://npmcharts.com/compare/jmdict.js">
        <img src="https://img.shields.io/npm/dm/jmdict.js.svg">
    </a>
    <a href="https://packagephobia.com/result?p=jmdict.js">
        <img src="https://packagephobia.com/badge?p=jmdict.js" alt="install size">
    </a>
</div>

# jmdict.js

[jmdict.js](https://www.npmjs.com/package/jmdict.js) is a library for working with [JMdict Japanese dictionary files](http://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project) and [KanjiDic2 kanji dictionary files](https://www.edrdg.org/wiki/index.php/KANJIDIC_Project)

## Installation

You can install jmdict.js via npm:

```bash
npm install jmdict.js
```

## Features

-   Parse JMdict files and XML strings into typesafe objects
-   Write JMdict objects to JSON files
-   Parse KanjiDic2 files and XML strings into typesafe objects
-   Write KanjiDic2 objects to JSON files
-   CLI for converting JMdict files to JSON

## Usage

### Parsing a JMdict from an XML string

```typescript
import { readFileSync } from 'fs';
import { JMdictParser } from 'jmdict.js';

const xmlString = readFileSync('pathToJMdictFile.xml', 'utf8');
const jmdict = await JMdictParser.fromXmlString(xmlString);
const entries = jmdict.entries;
```

### Parsing a JMdict from a file

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

### KanjiDic2

The KanjiDic2 parser works just like the JMdict parser, but with the `KanjiDicParser` class

### Using the CLI

To convert a JMdict file to JSON, you can use the CLI:

```bash
jmdictjs convert -i pathToJMdictFile.xml -o pathToOutputFile.json
```

Converting KanjiDic2 files is not yet supported in the CLI
