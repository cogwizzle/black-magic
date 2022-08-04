const { expect } = require('chai')
const cosmiconfig = require('cosmiconfig')
const sinon = require('sinon')
const loadPackages = require('../../src/cli/load-packages')

describe('load-packages', () => {
  it(`Given I have a .spellbookrc.js file
  When I have no spellPackages
  Then the spellbook should only have the default spells in it.`, () => {
    const spellbook = {}
    const explorer = {
      search: () => {
        return {
          config: {
            spellPackages: undefined,
          },
        }
      },
    }
    sinon.replace(
      cosmiconfig,
      'cosmiconfigSync',
      // @ts-ignore
      sinon.fake((_) => explorer)
    )
    loadPackages(spellbook)
    const keys = Object.keys(spellbook)
    expect(keys).to.have.lengthOf(0)
    sinon.restore()
  })
})
