# black-magic

Black magic is a custom REPL for generating code. Weave spells together and summon code.

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
  spellPackages: [require('./my-spell')],],
  spellbookName: 'spellbook' // Default spellbook name. Changing this will allow you to reference the spellbook by another name.
}
```

```js
// my-spell.js
const mySpell = (spellbook) => {
  spellbook.explode = () => console.log('BOOM!')
  // Add an optional help description.
  // Can be called in REPL as `spellbook.explode.help()`
  spellbook.explode.help = () => {
    console.group('explode')
    console.log('Description: Log an explosive message')
    console.groupEnd()
  }
}
```
