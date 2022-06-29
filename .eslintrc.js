const baseConfig = require('@aparajita/eslint-config-base')
const config = require('.')

module.exports = {
  root: true,
  ...baseConfig,
  ...config
}
