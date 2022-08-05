const { expect } = require('chai')
const fsPromises = require('fs').promises
const fs = require('fs')

const loadPackages = require('../../src/cli/load-packages')

const configFileName = '.spellbookrc.js'

describe('load-packages', () => {
  before(
    async () =>
      fs.existsSync(configFileName) && (await fsPromises.unlink(configFileName))
  )

  afterEach(
    async () => async () =>
      fs.existsSync(configFileName) && (await fsPromises.unlink(configFileName))
  )

  after(
    async () =>
      fs.existsSync(configFileName) && (await fsPromises.unlink(configFileName))
  )

  it(`Given I have no .spellbookrc.js file
  When I call loadPackages
  Then nothing is returned and the spellbook remains the same.`, async () => {
    const spellbook = {}
    await loadPackages(spellbook)
    expect(spellbook).to.be.empty
  })

  it(`Given I have a .spellbookrc.js file
  When I have no spellPackages
  Then the spellbook should only have the default spells in it.`, async () => {
    const spellbook = {}
    await fsPromises.writeFile('.spellbookrc.js', 'module.exports = () => {}')
    await loadPackages(spellbook)
    const keys = Object.keys(spellbook)
    expect(keys).to.have.lengthOf(0)
  })

  it(`
  Given I have a .spellbookrc.js file
  When I have spellPackages
  Then the spellbook should have the spells from the spellPackages in it.`, async () => {
    const spellbook = {}
    await fsPromises.writeFile(
      '.spellbookrc.js',
      `module.exports = ({
      spellPackages: [
        spellbook => spellbook.test = () => {}
      ]
    })`
    )
    await loadPackages(spellbook)
    expect(spellbook).to.have.property('test')
    expect(spellbook.test).to.be.a('function')
  })
})
