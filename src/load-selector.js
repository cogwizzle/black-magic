const { cosmiconfigSync } = require('cosmiconfig')

module.exports = () => {
  const explorer = cosmiconfigSync('spellbook')
  const configWrapper = explorer.search()
  if (!configWrapper) return 'spellbook'
  return configWrapper.config.spellbookName || 'spellbook'
}
