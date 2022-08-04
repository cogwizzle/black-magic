const repl = require('repl')
const loadPackages = require('./load-packages')
const loadSelector = require('./load-selector')
const { createSpell } = require('../index')

module.exports = () => {
  const spellbook = createSpell({
    spellbook: createSpell({
      spellbook: undefined,
      spellPath: 'log',
      spell: (input) => console.log(input),
      help: () => {
        console.group('Log ')
        console.log('Description: Log output to the REPL')
        console.log('Params:')
        console.log('  - string value to output.')
        console.groupEnd()
      },
    }),
    spellPath: 'init',
    spell: () => {
      const fs = require('fs')
      if (!fs.existsSync('./.spellbookrc.js'))
        fs.writeFileSync(
          './.spellbookrc.js',
          `module.exports = {
spellPackages: []
}`
        )
    },
    help: () => {
      console.group('Init ')
      console.log('Description: initialize black magic spell.')
      console.groupEnd()
    },
  })

  loadPackages(spellbook)
  const spellbookName = loadSelector()
  global[spellbookName] = spellbook

  repl.start('/*  >')
}
