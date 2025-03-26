module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'], // Ensure commit types are lowercase
    'subject-case': [2, 'always', 'sentence-case'], // Subject must start with a capital letter
    'header-max-length': [2, 'always', 72], // Commit message max length is 72
    'subject-empty': [2, 'never'], // Subject cannot be empty
    'type-empty': [2, 'never'], // Type cannot be empty
  },
}
