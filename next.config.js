const path = require('path');

module.exports = () => {
  const localeSubpaths = {};

  const sassOptions = {
    includePaths: [path.join(__dirname, 'assets/scss')],
  };

  const devIndicators = {
    autoPrerender: false,
  };

  const publicRuntimeConfig = {
    localeSubpaths,
  };

  const pageExtensions = ['page.tsx', 'page.ts', 'page.jsx', 'page.js'];

  const webpack = cfg => {
    const originalEntry = cfg.entry;
    cfg.entry = async () => {
      const entries = await originalEntry();
      if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
        entries['main.js'].unshift('./client/polyfills.js');
      }
      return entries;
    };

    return cfg;
  };
  const env = {
    API_URL: (() => process.env.API_URL)(),
  };

  return {
    publicRuntimeConfig,
    sassOptions,
    devIndicators,
    webpack,
    pageExtensions,
    swcMinify: true,
    env,
    images: {
      disableStaticImages: true,
    },
  };
};
