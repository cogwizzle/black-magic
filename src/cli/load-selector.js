const { cosmiconfigSync } = require('cosmiconfig')

/**
 * Loads the project configuration and returns the spellbook name.
 * @returns {String|'spellbook'} Spellbook spell name from config file or default value of 'spellbook'.
 */
module.exports = () => {
  const explorer = cosmiconfigSync('spellbook')
  const configWrapper = explorer.search()
  if (!configWrapper) return 'spellbook'
  return configWrapper.config.spellbookName || 'spellbook'
}
