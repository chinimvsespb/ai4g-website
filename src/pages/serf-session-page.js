// src/pages/serf-session-page.js
/**
 * Serf Session Page - Animation initialization
 * Uses unified SessionAnimations library
 */

import SessionAnimations from './session-animations.js';

document.addEventListener('DOMContentLoaded', function () {
  // Initialize simple animations for this page
  const animations = new SessionAnimations({ type: 'simple' });
  animations.init();

  // Cleanup on page unload (important for SPAs)
  window.addEventListener('beforeunload', () => animations.destroy());
});
