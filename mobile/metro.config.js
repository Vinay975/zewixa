const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
    /android\/.*$/,
    /ios\/.*$/,
];

module.exports = config;


