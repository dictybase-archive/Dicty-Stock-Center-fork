importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js",
)

// matches a properly formed URL
const regexUrl = "(?:https://.*)?"

workbox.routing.registerRoute(
  new RegExp(`${regexUrl}/users/.*`),
  workbox.strategies.cacheFirst({
    cacheName: "user-api-data",
  }),
)

workbox.routing.registerRoute(
  new RegExp(`${regexUrl}/contents/.*`),
  workbox.strategies.cacheFirst({
    cacheName: "content-api-data",
  }),
)

// image caching
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
)

// css caching
workbox.routing.registerRoute(
  /\.(?:css)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "css",
  }),
)

// font caching
workbox.routing.registerRoute(
  /\.(?:woff|woff2|eot|ttf)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "fonts",
  }),
)

// self.addEventListener("fetch", event => {
//   if (event.request.url === `${regexUrl}/contents/*`) {
//     const staleWhileRevalidate = new workbox.strategies.StaleWhileRevalidate()
//     event.respondWith(staleWhileRevalidate.handle({ event }))
//   }
// })

// this would cache *everything* per https://developers.google.com/web/tools/workbox/guides/precache-files/webpack
// workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
