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
      'type-case': [2, 'always', 'lower-case'],
      'subject-case': [2, 'always', 'sentence-case'],
      'header-max-length': [2, 'always', 72],
      'subject-empty': [2, 'never'],
      'type-empty': [2, 'never'],
    },
  };
  