// Cancella la cache forzando un ricaricamento completo
if ('caches' in window) {
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
      caches.delete(cacheName);
    });
  });
}

// Ricarica la pagina per garantire che i file aggiornati vengano caricati
window.addEventListener('load', () => {
  const cacheBuster = `?t=${new Date().getTime()}`;
  const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
    const src = script.getAttribute('src');
    if (src) {
      script.setAttribute('src', src.split('?')[0] + cacheBuster);
    }
  });
});
