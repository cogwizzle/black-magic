const repl = require('repl')
const loadPackages = require('./load-packages')
const loadSelector = require('./load-selector')

module.exports = () => {
  const spellbook = {
    log: (input) => console.log(input),
    init() {
      const fs = require('fs')
      if (!fs.existsSync('./.spellbookrc.js'))
        fs.writeFileSync(
          './.spellbookrc.js',
          `module.exports = {
  spellPackages: []
}`
        )
    },
  }
  spellbook.log.help = () => {
    console.group('Log ')
    console.log('Description: Log output to the REPL')
    console.log('Params:')
    console.log('  - string value to output.')
    console.groupEnd()
  }
  spellbook.init.help = () => {
    console.group('Init ')
    console.log('Description: initialize black magic spell.')
    console.groupEnd()
  }
  loadPackages(spellbook)
  const spellbookName = loadSelector()
  global[spellbookName] = spellbook

  repl.start('/*  >')
}
