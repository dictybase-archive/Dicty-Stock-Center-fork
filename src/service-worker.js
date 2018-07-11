importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js",
)

// matches a properly formed URL
const regexUrl = "https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b"

workbox.routing.registerRoute(
  new RegExp(`${regexUrl}/users/*`),
  workbox.strategies.cacheFirst(),
)

workbox.routing.registerRoute(
  new RegExp(`${regexUrl}/contents/*`),
  workbox.strategies.cacheFirst(),
)

// workbox.precaching.precacheAndRoute([])
