const { cosmiconfigSync } = require('cosmiconfig')

/**
 * Retrieves all modules from the .spellbookrc.js file and adds them into the spellbook.
 * @param {Object} spellbook The spellbook, a collection of developer functions.
 * @returns {void}
 */
module.exports = (spellbook) => {
  const explorer = cosmiconfigSync('spellbook')
  const spells = explorer.search()
  if (!spells) return
  if (!spells.config.spellPackages) return
  spells.config.spellPackages.forEach((package) => {
    package(spellbook)
  })
}
