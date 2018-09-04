module.exports = {
    extends: ['tslint-config-prettier', 'tslint-react', 'tslint-config-airbnb'],
    rulesDirectory: './lib',
    rules: {
        'ter-indent': [true, 4, { SwitchCase: 1 }],
        'import-name': false,
        "jsx-no-bind": true,
        'jsx-no-lambda': false,
        'jsx-no-multiline-js': false,
        'variable-name': false,
        'jsx-boolean-value': false,
        'jsx-curly-spacing': false,
        align: false,
        'ter-arrow-parens': false,
        'no-boolean-literal-compare': false,
        'no-increment-decrement': false,
        'no-trailing-whitespace': true,
        'no-irregular-whitespace': true,
        'no-multi-spaces': true,
        semicolon: [true, 'always', 'ignore-bound-class-methods'],
        align: [true, 'parameters', 'statements'],
        "import-type-order": true
    },
};
