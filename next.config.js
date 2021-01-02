module.exports = {
  webpack: (config, {isServer}) => {
    if(!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    config.module.rules.push({
      test: /\.yml$/,
      use: "js-yaml-loader",
    })
    return config;
  },
};
