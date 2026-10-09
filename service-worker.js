const VERSION = new URL(self.location).searchParams.get('v');
const APP_VERSION = `expense-o-meter-${VERSION}`;

const ASSETS = [
    "./",
    "./index.html",
    "./assets/js/events.js",
    "./assets/js/functions.js",
    "./assets/js/vendors.js",
    "./assets/css/app.css",
    "./assets/img/wallet.svg",
    "./manifest.webmanifest",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(APP_VERSION)
            .then((cache) =>
                cache.addAll(
                    ASSETS.map(
                        (asset) => new Request(asset, { cache: "reload" }),
                    ),
                ),
            ),
    );

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) => key !== APP_VERSION)
                        .map((key) => caches.delete(key)),
                ),
            ),
    );

    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    // Solo interceptar recursos de nuestro dominio.
    if (url.origin !== self.location.origin) {
        return;
    }

    // HTML y JavaScript: Network First.
    if (
        url.pathname.endsWith(".html") ||
        url.pathname.endsWith(".css") ||
        url.pathname.endsWith(".js")
    ) {
        event.respondWith(
            (async () => {
                try {
                    const response = await fetch(event.request);

                    console.log(
                        event.request.url,
                        response.bodyUsed,
                        response.ok,
                    );

                    if (response.ok) {
                        const cache = await caches.open(APP_VERSION);
                        await cache.put(event.request, response.clone());
                    }

                    return response;
                } catch {
                    const cachedResponse = await caches.match(event.request);

                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    throw new Error("Resource not available.");
                }
            })(),
        );

        return;
    }

    // Imágenes, iconos, manifest, etc.: Cache First.
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then((response) => {
                console.log(
                    event.request.url,
                    response.bodyUsed,
                    response.type,
                );

                if (response.ok) {
                    caches.open(APP_VERSION).then((cache) => {
                        cache.put(event.request, response.clone());
                    });
                }

                return response;
            });
        }),
    );
});
