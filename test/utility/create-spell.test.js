const expect = require('chai').expect
const { createSpell } = require('../../src')

describe('create-spell', () => {
  it(`Given the createSpell utility is called
When an invalid spellPath value is passed
Then an error is thrown`, () => {
    expect(() => {
      createSpell({
        spellbook: undefined,
        spellPath: '',
        spell: () => {},
        help: () => {},
      })
    }).to.throw(Error, 'Spell path is required.')
  })

  it(`Given the createSpell utility is called
When an invalid spell function is passed
Then an error is thrown`, () => {
    expect(() => {
      createSpell({
        spellbook: undefined,
        spellPath: 'test',
        // @ts-ignore Testing Invalid type for spell.
        spell: undefined,
        help: () => {},
      })
    }).to.throw(Error, 'Spell is required.')
  })

  it(`Given the createSpell utility is called
When a valid spell, spellPath, and spellbook are passed
Then the spell is added to the spellbook`, () => {
    const result = createSpell({
      spellbook: undefined,
      spellPath: 'test.test',
      spell: () => {},
    })
    expect(result).to.have.property('test')
    expect(result).to.have.property('test').that.has.property('test')
    expect(result.test.test).to.be.a('function')
  })

  it(`Given the createSpell utility is called
When a valid spell, spellPath, help, and spellbook are passed
Then the spell is added to the spellbook`, () => {
    const result = createSpell({
      spellbook: undefined,
      spellPath: 'test.test',
      spell: () => {},
      help: () => {},
    })
    expect(result).to.have.property('test')
    expect(result).to.have.property('test').that.has.property('test')
    expect(result.test.test).to.be.a('function')
    expect(result.test.test.help).to.be.a('function')
  })
})
