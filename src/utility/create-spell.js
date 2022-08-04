/**
 * @typedef {Object} CreateSpellArgs
 * @property {Object} spellbook - The spellbook to add the spell to.
 * @property {string} spellPath - The path to the spell. Paths are "." delimited.
 * @property {function} spell - The spell function.
 * @property {function} [help] - The help function to describe how to use the spell.
 */

/**
 * Create a spell.
 * @param {CreateSpellArgs} spellOptions - The options to create the spell.
 * @returns {Object} The spellbook.
 */
module.exports = ({ spellbook = {}, spellPath, spell, help }) => {
  const tokens = spellPath.split('.')
  tokens.reduce((section, token, index) => {
    if (index === tokens.length - 1) {
      section[token] = spell
      if (help) section[token].help = help
      return
    } else {
      if (!section.hasOwnProperty(token)) {
        section[token] = {}
      }
      return section[token]
    }
  }, spellbook)
  return spellbook
}