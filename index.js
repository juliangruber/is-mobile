'use strict'

module.exports = isMobile;
module.exports.isMobile = isMobile;

var mobileRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;

var tabletRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i;

function isMobile (ua, opts) {
  if (ua && typeof ua === 'object') {
    if (!opts) opts = ua;
    ua = ua.headers && ua.headers['user-agent'];
  }
  if (ua === undefined && typeof navigator !== 'undefined') ua = navigator.userAgent;
  if (typeof ua !== 'string') return false;
  if (!opts) opts = {};

  return opts.tablet
    ? tabletRE.test(ua)
    : mobileRE.test(ua);
}
