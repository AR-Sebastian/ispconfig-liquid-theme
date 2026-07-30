(function(window, document) {
  'use strict';

  function detectLanguage() {
    var declared = String(document.documentElement.getAttribute('lang') || '').trim().toLowerCase();
    if (declared.indexOf('de') === 0) return 'de';
    if (declared && declared !== 'en') return declared.split('-')[0];

    var source = document.querySelector('meta[name="workbench-language-probe"]');
    var probe = source ? String(source.getAttribute('content') || '') : '';
    if (/(?:^|[\s|])(abmelden|ausloggen|suche|schlie(?:ß|ss)en|navigation\s+öffnen)(?:$|[\s|])/i.test(probe)) return 'de';
    return 'en';
  }

  window.workbenchLanguage = detectLanguage;

  try {
    var preference = window.localStorage && window.localStorage.getItem('ispconfig-liquid-theme');
    document.documentElement.setAttribute('data-wb-theme', preference === 'light' ? 'light' : 'dark');
  } catch (error) {
    /* Keep first paint independent from storage availability. */
  }
})(window, document);
