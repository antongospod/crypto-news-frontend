import antfu from '@antfu/eslint-config'

export default antfu(
  {
    stylistic: {
      indent: 2,
      quotes: 'single',
    },
    vue: true,
    unocss: true,
    markdown: false,
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
    typescript: {
      overrides: {
        'node/prefer-global/process': ['off'],
        'import/order': [
          'warn',
          {
            'newlines-between': 'always',
          },
        ],
      },
    },
  },
  {
    rules: {
      'import/order': 'warn',
      'sort-imports': 'off',
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-exports': 'off',
    },
  },
)
