module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: [
            'Chrome >= 49',
            'Firefox >= 45',
            'Safari >= 10',
            'Edge >= 13',
            'iOS >= 10',
            'Electron >= 0.36'
          ]
        },
        modules: false,
        spec: true,
        useBuiltIns: "usage",
        forceAllTransforms: true,
        corejs: {
          version: 3,
          proposals: false
        }
      }
    ],
    ["@babel/preset-typescript"]
  ]
};