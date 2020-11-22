const CracoGraphqlLoader = require('craco-graphql-loader');
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    { plugin: CracoGraphqlLoader },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#007D75' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
