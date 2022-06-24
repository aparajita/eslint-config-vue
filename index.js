const { join } = require('path')
const {
  kNamingConventions,
  kTypeScriptRules
} = require('@aparajita/eslint-config-base/rules')

module.exports = {
  extends: ['@aparajita/base', 'plugin:prettier-vue/recommended'],

  overrides: [
    // Vue
    {
      files: ['*.vue'],
      plugins: ['vue'],
      extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
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
        project: [join(process.cwd(), 'tsconfig.json')]
      },
      env: {
        browser: true
      },
      settings: {
        'prettier-vue': {
          SFCBlocks: {
            template: false,
            script: true,
            style: true,

            customBlocks: {
              docs: { lang: 'markdown' },
              config: { lang: 'json' },
              module: { lang: 'ts' },
              comments: false
            }
          },

          usePrettierrc: true,
          fileInfoOptions: {
            withNodeModules: false
          }
        }
      },
      rules: {
        ...kTypeScriptRules,

        // Override naming rules for object literal properties so that
        // we don't get errors when returning components from setup().
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'objectLiteralProperty',
            format: ['camelCase', 'snake_case', 'PascalCase']
          },
          ...kNamingConventions
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
        'vue/custom-event-name-casing': 'off',
        'vue/html-closing-bracket-newline': [
          'error',
          {
            singleline: 'never',
            multiline: 'always'
          }
        ],
        // eslint-disable-next-line no-magic-numbers
        'vue/html-indent': ['error', 2],
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': [
          'error',
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
        ]
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
