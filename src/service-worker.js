importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js",
)

// matches a properly formed URL
const regexUrl = "(?:https://.*)?"

// cache routes for user api
workbox.routing.registerRoute(
  new RegExp(`${regexUrl}/users/.*`),
  workbox.strategies.networkFirst({
    cacheName: "user-api-data",
  }),
)

// cache data fetched from content api
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

// js caching
workbox.routing.registerRoute(
  /\.(?:js)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "javascript",
  }),
)

// font caching
workbox.routing.registerRoute(
  /\.(?:woff|woff2|eot|ttf)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "fonts",
  }),
)

// below command would cache *everything* per https://developers.google.com/web/tools/workbox/guides/precache-files/webpack
// workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
