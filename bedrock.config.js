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
    categoryOrder: [
      'Style guide',
      'Design patterns',
      'Components',
      'Objects',
      'Development documentation'
    ],
    componentCategories: {
      aov: 'Basics',
      c: 'Components',
      o: 'Objects',
      u: 'Utilities'
    },
    codeSamples: {
      jsx: false
    }
  },
};
