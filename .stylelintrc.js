module.exports = {
    extends: ['stylelint-config-standard'],
    rules: {
        'block-no-empty': null,
        'comment-empty-line-before': null,
        'declaration-empty-line-before': null,
        'function-name-case': 'lower',
        'no-descending-specificity': null,
        'no-invalid-double-slash-comments': null,
        'no-missing-end-of-source-newline': null,
        'rule-empty-line-before': 'always',
        indentation: [
            4,
            {
                except: ['block'],
                message: 'Please use 2 spaces for indentation.',
                severity: 'warning',
            },
        ],
    },
    ignoreFiles: ['node_modules/**/*', 'build/**/*'],
};
