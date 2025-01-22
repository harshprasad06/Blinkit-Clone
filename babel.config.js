module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins:[
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root:['./src'],
        alias: {
          "@assets": "./src/assets",
          "@features": "./src/features",
          "@service": "./src/service",
          "@components": "./src/components",
          "@state": "./src/state",
          "@utils": "./src/utils",
          "@navigation": "./src/navigation",
          "@styles": "./src/styles",
        }
      }
    ]
  ]
};
