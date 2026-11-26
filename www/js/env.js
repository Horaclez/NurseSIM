/* Detecta dónde corre la app y evita errores de Service Worker y de rutas.
   window.APP_ENV = 'web' | 'electron' | 'capacitor' */
(function () {
  var ua = navigator.userAgent || '';
  var isElectron = /Electron\//.test(ua);
  var isCapacitor = !!(window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function' && window.Capacitor.isNativePlatform());
  var env = isElectron ? 'electron' : (isCapacitor ? 'capacitor' : 'web');
  window.APP_ENV = env;
  document.documentElement.setAttribute('data-env', env);
  if (!('serviceWorker' in navigator)) return;
  var seguro = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (env === 'web' && seguro) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () {});
    });
  } else {
    // En Electron (file://) y en Capacitor todo ya está empaquetado: no se usa Service Worker
    navigator.serviceWorker.getRegistrations().then(function (rs) { rs.forEach(function (r) { r.unregister(); }); }).catch(function () {});
  }
})();
