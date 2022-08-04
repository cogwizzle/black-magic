module.exports.createSpell = ({ spellbook = {}, spellPath, spell, help }) => {
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
