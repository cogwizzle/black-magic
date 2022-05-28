const repl = require('repl')
const loadPackages = require('./load-packages')

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
  loadPackages(spellbook)
  global.spellbook = spellbook

  repl.start('🕮  >')
}
