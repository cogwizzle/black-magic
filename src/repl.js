const repl = require('repl')
const loadPackages = require('./load-packages')

module.exports = () => {
  const spellbook = {
    log: (input) => console.log(input),
  }
  loadPackages(spellbook)
  global.spellbook = spellbook

  repl.start('🕮->')
}
