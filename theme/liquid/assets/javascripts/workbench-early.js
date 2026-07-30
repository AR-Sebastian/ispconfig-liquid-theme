(function(window, document) {
  'use strict';

  try {
    var preference = window.localStorage && window.localStorage.getItem('ispconfig-liquid-theme');
    document.documentElement.setAttribute('data-wb-theme', preference === 'light' ? 'light' : 'dark');
  } catch (error) {
    /* Keep first paint independent from storage availability. */
  }
})(window, document);
