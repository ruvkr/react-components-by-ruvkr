module.exports = {
  jsxSingleQuote: true,
  quoteProps: 'consistent',
  singleQuote: true,
  useEditorConfig: false,
  arrowParens: 'avoid',
  printWidth: 80,
  overrides: [
    {
      files: '*.js',
      options: {
        parser: 'jsdoc-parser',
      },
    },
  ],
};
