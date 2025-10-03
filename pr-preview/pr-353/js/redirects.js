/**
 * Client-side redirects for Unraid docs
 * This script handles special URL patterns that need redirection
 */
(function() {
  // Check if the URL matches the pattern /unraid-os/release-notes/X.Y.Z+patch.N
  const patchRegex = /\/unraid-os\/release-notes\/(\d+\.\d+\.\d+)\+patch\.\d+/;
  const currentPath = window.location.pathname;
  const match = currentPath.match(patchRegex);
  
  if (match) {
    // Get the base version (X.Y.Z)
    const baseVersion = match[1];
    
    // Redirect to the patches section of that version
    window.location.href = `/unraid-os/release-notes/${baseVersion}#patches`;
  }
})();
