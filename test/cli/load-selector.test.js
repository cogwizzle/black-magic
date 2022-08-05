const { expect } = require('chai')
const fs = require('fs')
const fsPromises = require('fs').promises
const loadSelector = require('../../src/cli/load-selector')

const configFileName = '.spellbookrc.js'

describe('load-selector', () => {
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

  it(`Given I do not have a config
  When I run the load-selector function
  Then I get the default spellbook name, "spellbook"`, () => {
    const result = loadSelector()
    expect(result).to.equal('spellbook')
  })

  it(`Given I have a configuration file without a spellbookName
  When I run the load-selector function
  Then I get the default spellbook name, "spellbook"`, async () => {
    await fsPromises.writeFile(configFileName, 'module.exports = () => {}')
    const result = loadSelector()
    expect(result).to.equal('spellbook')
  })

  it(`Given I have a configuration file with a spellbookName
  When I run the load-selector function
  Then I get the spellbookName in the configuration file.`, async () => {
    await fsPromises.writeFile(
      configFileName,
      'module.exports = { spellbookName: "test" }'
    )
    const result = loadSelector()
    expect(result).to.equal('test')
  })
})
