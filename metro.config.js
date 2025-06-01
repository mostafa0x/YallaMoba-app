const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// أضف 'ogg' إلى قائمة assetExts
config.resolver.assetExts.push('ogg');

module.exports = withNativeWind(config, { input: './global.css' });
