const cosmiconfig = require('cosmiconfig').cosmiconfig

/**
 * Retrieves all modules from the .spellbookrc.js file and adds them into the spellbook.
 * @param {Object} spellbook The spellbook, a collection of developer functions.
 * @returns {Promise<void>}
 */
module.exports = async (spellbook) => {
  const explorer = await cosmiconfig('spellbook')
  const searchResults = await explorer.search()
  console.log({ searchResults })
  if (!searchResults) return Promise.resolve()
  if (!searchResults.config.spellPackages) return Promise.resolve()
  return Promise.resolve(
    searchResults.config.spellPackages.reduce((spellbook, package) => {
      package(spellbook)
      return spellbook
    }, spellbook)
  )
}
