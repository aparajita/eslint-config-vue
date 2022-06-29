const path = require('path')
const {
  namingConventions
} = require('@aparajita/eslint-config-base/lib/typescript')

module.exports = {
  overrides: [
    {
      files: ['*.vue'],
      extends: [
        'eslint:recommended',
        'standard',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:vue/vue3-recommended',
        'prettier'
      ],
      parser: 'vue-eslint-parser',

      // Always ignore missing imports from vue
      settings: { 'import/ignore': ['node_modules', 'vue'] },

      parserOptions: {
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        parser: {
          // Script parser for `<script>`
          js: 'espree',

          // Script parser for `<script lang="ts">`
          ts: '@typescript-eslint/parser',

          // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
          // and vue interpolations (e.g. `{{variable}}`).
          // If not specified, the parser determined by `<script lang ="...">` is used.
          '<template>': '@typescript-eslint/parser'
        },
        // @typescript-eslint needs this
        tsconfigRootDir: process.cwd(),
        project: [path.join(process.cwd(), 'tsconfig.json')]
      },
      env: {
        browser: true
      },
      rules: {
        // Override naming rules for object literal properties so that
        // we don't get errors when returning components from setup().
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'objectLiteralProperty',
            format: ['camelCase', 'snake_case', 'PascalCase']
          },
          ...namingConventions
        ],
        'vue/block-spacing': 'error',
        'vue/component-tags-order': [
          'error',
          {
            order: ['template', 'script', 'style']
          }
        ],
        'vue/component-name-in-template-casing': [
          'error',
          'PascalCase',
          {
            registeredComponentsOnly: true,
            ignores: []
          }
        ],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/first-attribute-linebreak': 'off',
        'vue/html-closing-bracket-newline': [
          'error',
          {
            singleline: 'never',
            multiline: 'always'
          }
        ],
        'vue/html-indent': 'off',
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': [
          'off',
          {
            singleline: {
              max: 1
            },
            multiline: {
              max: 1
            }
          }
        ],
        'vue/no-deprecated-destroyed-lifecycle': 'off',
        'vue/no-deprecated-events-api': 'off',
        'vue/no-deprecated-slot-attribute': 'off',
        'vue/no-deprecated-v-on-native-modifier': 'off',
        'vue/no-parsing-error': [
          'error',
          {
            'x-invalid-end-tag': false
          }
        ],
        'vue/singleline-html-element-content-newline': 'off'
      },
      globals: {
        defineProps: true,
        defineEmits: true,
        defineExpose: true,
        useMeta: true
      }
    }
  ]
}
