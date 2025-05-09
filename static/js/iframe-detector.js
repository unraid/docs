/**
 * Iframe detection for Unraid docs
 * This script detects if the page is loaded in an iframe and sets a CSS variable
 */

// Function to check if we're in an iframe
function isInIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    // If we can't access window.top due to same-origin policy,
    // we're in a cross-origin iframe
    return true;
  }
}

// Apply iframe detection as a CSS variable
function applyIframeMode() {
  // Define the behavior as a CSS variable on :root that can be used in stylesheets
  const inIframe = isInIframe();
  document.documentElement.style.setProperty('--is-iframe', inIframe ? 'true' : 'false');
  
  // Also apply a data attribute for easier CSS targeting
  if (inIframe) {
    document.documentElement.setAttribute('data-iframe', 'true');
    console.log('Detected iframe environment');
  } else {
    document.documentElement.removeAttribute('data-iframe');
  }
}

// Apply only once when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  applyIframeMode();
}); 