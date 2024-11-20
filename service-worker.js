// Nombre del caché y lista de activos que queremos almacenar en caché
const CACHE_NAME = 'mi-pwa-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    'app.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
];

// Evento de instalación: ocurre la primera vez que el Service Worker se registra
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)  // Abre (o crea) el caché con el nombre especificado
        .then(cache => {
            console.log('Abriendo cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Evento de activación: se ejecuta después de que el SW se instala y toma el control
self.addEventListener('activate', event => {
    console.log('Service Worker activado');
});

// Evento de búsqueda (fetch): intercepta las solicitudes de la red
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)  // Intenta encontrar la solicitud en el caché
        .then(response => {
                return response || fetch(event.request).catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            })

        })
    );
});
