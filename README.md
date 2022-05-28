﻿# black-magic
Black magic is a custom REPL for generating code.  Weave spells together and summon code.

## Installation
```sh
npm i -G cogwizzle/black-magic
```

## Usage
```sh
black-magic

spellbook.log('hello world')
```

## Config
### Adding spells
Create a `.spellbookrc.js`
```js
module.exports = {
  spellPackages: [
    require('./my-spell')
  ]
}
```

```js
// my-spell.js
const mySpell = (spellbook) => {
  spellbook.explode = () => console.log('BOOM!')
}
```
