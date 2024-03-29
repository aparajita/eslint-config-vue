const path = require('path')
const {
  namingConventions,
  typeScriptRules,
} = require('@aparajita/eslint-config-base/lib/typescript')

module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
    parser: {
      js: 'espree',
      ts: '@typescript-eslint/parser',
      '<template>': '@typescript-eslint/parser',
    },
    tsconfigRootDir: process.cwd(),
    project: [path.join(process.cwd(), 'tsconfig.json')],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
    {
      files: ['*.vue'],
      extends: ['plugin:vue/vue3-recommended'],
      // Always ignore missing imports from vue
      settings: { 'import/ignore': ['node_modules', 'vue'] },
      env: {
        browser: true,
      },
      rules: {
        ...typeScriptRules,

        // Most formatting stuff we turn off because prettier handles it.

        // Override naming rules for object literal properties so that
        // we don't get errors when returning components from setup().
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'objectLiteralProperty',
            format: ['camelCase', 'snake_case', 'PascalCase'],
          },
          ...namingConventions,
        ],
        'vue/block-spacing': 'error',
        'vue/component-tags-order': [
          'error',
          {
            order: ['template', 'script', 'style'],
          },
        ],
        'vue/component-name-in-template-casing': [
          'error',
          'PascalCase',
          {
            registeredComponentsOnly: false,
            ignores: ['/^ion-/'],
          },
        ],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/first-attribute-linebreak': 'off',
        'vue/html-closing-bracket-newline': [
          'error',
          {
            singleline: 'never',
            multiline: 'always',
          },
        ],
        'vue/html-indent': 'off',
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': [
          'off',
          {
            singleline: {
              max: 1,
            },
            multiline: {
              max: 1,
            },
          },
        ],
        'vue/no-deprecated-destroyed-lifecycle': 'error',
        'vue/no-deprecated-events-api': 'error',

        // We don't want to enforce this rule because it conflicts
        // with Ionic component slots.
        'vue/no-deprecated-slot-attribute': 'off',
        'vue/no-deprecated-v-on-native-modifier': 'error',
        'vue/no-parsing-error': [
          'error',
          {
            'x-invalid-end-tag': false,
          },
        ],
        'vue/singleline-html-element-content-newline': 'off',
      },
      globals: {
        defineProps: true,
        defineEmits: true,
        defineExpose: true,
        useMeta: true,
      },
    },
  ],
}
