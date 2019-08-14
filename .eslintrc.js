/*! m0-start */
const config = {
    extends: ['airbnb-base', 'prettier', 'plugin:jest/recommended'],
    env: {
        node: true
    },
    rules: {
        'prettier/prettier': ['error'],
        // 'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        'linebreak-style': ['error', 'unix'],
        'curly': ['error', 'all'],
        'jest/expect-expect': ['error'],
        'endOfLine': 'lf'
    },
    plugins: ['prettier']
};
/*! m0-end */

/*! m0-start */
module.exports = config;
/*! m0-end */

