# @aparajita/eslint-config-vue

This `eslint` config for JavaScript/TypeScript + Vue 3 contains an extremely complete (and strict) set of rules that maximizes type safety and automatic formatting of source code. It was created to make sharing between my projects much easier, and to have a single source of truth for my `eslint` config. You may find it useful as well.

This config uses the same JavaScript/TypeScript rules as [@aparajita/eslint-config-base](https://github.com/aparajita/eslint-config-base), and applies them to `<script>` and `<template>` tags in `.vue` SFC files, while adding rules from [`eslint-plugin-vue`](https://eslint.vuejs.org/rules/).

## Installation

```shell
% pnpm add -D @aparajita/eslint-config-vue
```

This config is a superset of [@aparajita/eslint-config-base](https://github.com/aparajita/eslint-config-base), so follow the same peer dependency [installation instructions](https://github.com/aparajita/eslint-config-base#installation). You may also need these peer dependencies:

```json
{
  "devDependencies": {
    "eslint-plugin-vue": "^9.1.1",
    "vue-eslint-parser": "^9.0.3"
  }
}
```

```shell
% pnpm add -D eslint-plugin-vue vue-eslint-parser
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

// Set this however you want: relative, absolute, calculated, whatever
const rootTsconfigPath = path.resolve('/path/to/root/tsconfig.json')
 
module.exports = {
  extends: ['@aparajita/vue'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      parserOptions: {
        tsconfigRootDir: path.dirname(rootTsconfigPath),
        project: [rootTsconfigPath]
      }
    }
  ]
}
```

### Caching

Some of the TypeScript rules in this config require the linter to parse your TypeScript files. This can [affect performance](https://typescript-eslint.io/docs/linting/type-linting#how-is-performance). Therefore, it is recommended that you use the [`--cache` option](https://eslint.org/docs/latest/user-guide/command-line-interface.html#--cache) with `eslint` so that each lint run will only lint files that have changed. Be sure to add the cache file to `.gitignore`!

## Coding style

In terms of coding style, this config follows [standard js](https://standardjs.com/rules.html) with the exception of disallowing a space after function name declarations ([space-before-function-paren](https://eslint.org/docs/rules/space-before-function-paren.html)).

Any formatting rules that [`Prettier`](https://prettier.io/) handles are not enforced by this config. I have found I can avoid a lot of problems by configuring and running `prettier` separately from `eslint`. As the `prettier` authors point out about integrating `prettier` with `eslint`:

> You end up with a lot of red squiggly lines in your editor, which gets annoying. Prettier is supposed to make you forget about formatting – and not be in your face about it!

## Rule philosophy

The TypeScript rules in this config are extremely strict, to prevent casual subverting of the type system. TypeScript and the [@typescript-eslint rules](https://typescript-eslint.io/rules/) are trying to prevent us from introducing subtle runtime errors, so my philosophy is that you should have to explicitly disable such rules, because that makes you think twice about whether it’s really safe to do so.

You can of course override any of the rules in this config to suit your own tastes.
