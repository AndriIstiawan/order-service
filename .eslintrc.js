module.exports = {
    'env': {
        'commonjs': true,
        'browser': false,
        'es6': true,
        'node': true
    },
    'extends': ['eslint:recommended'],
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 2018
    },
    'ignorePatterns': ['tests/**'],
    'rules': {
        'quotes': ['error', 'single'],
        // we want to force semicolons
        'semi': ['error', 'always'],
        // we use 4 spaces to indent our code
        'indent': ['error', 4],
        // we want to avoid extraneous spaces
        'no-multi-spaces': ['error'],
        // we want to avoid no-multiple-empty-lines
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
        // we use spacing after comma
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        // we use arrow-spacing
        'arrow-spacing': 'error',
        // we use space-infix-ops
        'space-infix-ops': 'error',
        // we use keyword-spacing if else
        'keyword-spacing': ['error', { 'before': true, 'after': true }],
        // we use no-console
        'key-spacing': ['error', { 'afterColon': true }],
        'no-console': 'warn',
        'no-useless-escape': 'warn',
        'no-unused-vars': 'warn',
        'eol-last': ['error', 'always'],
        'object-curly-spacing': ['error', 'always']
    }
};
