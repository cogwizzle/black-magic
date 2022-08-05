/**
 * @typedef {{[key: string]: Object|Function}} Spellbook
 */

/**
 * @typedef {Object} CreateSpellArgs
 * @property {Spellbook|undefined} spellbook - The spellbook to add the spell to.
 * @property {String} spellPath - The path to the spell. Paths are "." delimited.
 * @property {function} spell - The spell function.
 * @property {?function} [help] - The help function to describe how to use the spell.
 */

/**
 * Create a spell.
 * @param {CreateSpellArgs} spellOptions - The options to create the spell.
 * @returns {Spellbook} The spellbook.
 */
module.exports = ({ spellbook = {}, spellPath, spell, help }) => {
  const tokens = spellPath.split('.')
  if (typeof spellPath !== 'string' || spellPath === '') {
    throw new Error('Spell path is required.')
  }
  if (typeof spell !== 'function') {
    throw new Error('Spell is required.')
  }
  /**
   *
   * @param {Spellbook} section
   * @param {string} token
   * @param {number} index
   * @returns {Spellbook}
   */
  const reduce = (section, token, index) => {
    if (index === tokens.length - 1) {
      section[token] = spell
      if (help) section[token].help = help
      return section
    }
    if (!section.hasOwnProperty(token)) {
      /** @type Spellbook */
      const newSection = {}
      section[token] = newSection
      return newSection
    }
    return section
  }
  tokens.reduce(reduce, spellbook)
  return spellbook
}
