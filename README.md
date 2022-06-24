# @aparajita/eslint-config-vue

This config for JavaScript/TypeScript + Vue 3 contains an extremely complete set of rules that maximizes type safety and automatic formatting of source code. It was created to make sharing between my projects much easier, and to have a single source of truth for my eslint config. You may find it useful as well.

This config uses the same JavaScript/TypeScript rules as [@aparajita/eslint-config-base](https://github.com/aparajita/eslint-config-base), and applies them to `<script>` and `<script setup>` tags in `.vue` SFC files. It assumes you are using TypeScript in your SFC files.

In addition to linting and formatting `script` tags in SFC files, it also lints and formats the html in the `<template>` using [eslint-plugin-prettier-vue](https://github.com/meteorlxy/eslint-plugin-prettier-vue).

## Installation

```shell
% pnpm add -D @aparajita/eslint-config-vue
```

This config is a superset of [@aparajita/eslint-config-base](https://github.com/aparajita/eslint-config-base), so follow the same peer dependency [installation instructions](https://github.com/aparajita/eslint-config-base#installation), but do **NOT** install `eslint-plugin-prettier`.

Instead, install the following:

```json
{
  "devDependencies": {
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier-vue": "^4.1.0",
    "eslint-plugin-vue": "^9.1.1"
  }
}
```
```shell
% pnpm add -D eslint-plugin-prettier-vue eslint-plugin-vue
```

## Usage

In order to use this config, add it to the `extends` clause of your eslint config.

```js
module.exports = {
  extends: ['@aparajita/vue']
}
```

The `@typescript-eslint` plugin used by this config needs to know the directory where your root tsconfig is, and the name of your root tsconfig. By default, these are set to `process.cwd()` and `process.cwd()/tsconfig.json` respectively.

If your root tsconfig is not in the directory from which eslint will be run, add the following to the eslint config of your project.

```js
const path = require('path')

// Set this however you want: relative, absolute,
// calculated, whatever.
const rootTsconfigPath = '/path/to/root/tsconfig.json'

module.exports = {
  extends: ['@aparajita/base'],
  parserOptions: {
    tsconfigRootDir: path.dirname(rootTsconfigPath)
  },
  overrides: [
    // TypeScript
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: rootTsconfigPath
      }
    },
    // Vue
    {
      files: ['*.vue'],
      parserOptions: {
        project: [rootTsconfigPath]
      }
    }
  ]
}
```
