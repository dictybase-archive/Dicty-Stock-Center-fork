importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js",
)

// matches a properly formed URL
const regexUrl = "https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b"

workbox.routing.registerRoute(
  new RegExp(`${regexUrl}/users/*`),
  workbox.strategies.cacheFirst({
    cacheName: "users data",
  }),
)

workbox.routing.registerRoute(
  new RegExp(`${regexUrl}/contents/*`),
  workbox.strategies.cacheFirst({
    cacheName: "content data",
  }),
)

// image caching
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
)

// css caching
workbox.routing.registerRoute(
  /\.(?:css)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "css-resources",
  }),
)

// workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
