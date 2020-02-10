module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'semi': ['warn', 'always'],
        'quotes': ['warn', 'single'],
        'eol-last': ['warn'],
        'indent': ['warn', 4],
        'no-return-assign': ['off'],
        'space-before-function-paren': ['warn'],
        'no-trailing-spaces': ['warn'],
        'no-console': ['off'],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
