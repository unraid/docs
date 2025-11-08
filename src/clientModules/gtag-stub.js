if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtagStub() {
      window.dataLayer.push(arguments);
    };
  }
}

