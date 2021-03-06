/**
 * Bedrock configuration
 * For docs, see https://bedrockapp.org/documentation/configuration/
 * Inline docs available in the default config object
*/

module.exports = {
  pageTree: {
    layoutStyle: 'sidebar' // 'sidebar' or 'fixed'
  },
  js: {
    minify: false
  },
  css: {
    compiler: 'scss',
    minify: false,
    purge: false
  },
  styleguide: {
    search: true,
    colors: './content/scss/_s-colors.scss',
    categoryOrder: [
      'Style guide',
      'Development documentation',
      'Design patterns',
      'Components',
      'Objects'
    ],
    componentCategories: {
      aov: 'Basics',
      c: 'Components',
      o: 'Objects',
      u: 'Utilities'
    },
    codeSamples: {
      jsx: false
    },
  },
};
