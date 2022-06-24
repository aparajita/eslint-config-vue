const baseConfig = require('@aparajita/eslint-config-base')
const config = require('./index.js')

module.exports = {
  root: true,
  ...baseConfig,
  ...config
}
