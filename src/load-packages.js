const { cosmiconfigSync } = require('cosmiconfig')

module.exports = (spellbook) => {
  const explorer = cosmiconfigSync('spellbook')
  const spells = explorer.search()
  if (!spells) return
  spells.config.spellPackages.forEach((package) => {
    package(spellbook)
  })
}
