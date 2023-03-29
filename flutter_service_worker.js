'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "a7f3a92cb839e67f28adbd795dd6957d",
"assets/assets/fonts/Poppins-Medium.ttf": "bf59c687bc6d3a70204d3944082c5cc0",
"assets/assets/growth_chart_data/bmi_age_2_5_boy.csv": "666e2a296881fd83815d80f55e9401eb",
"assets/assets/growth_chart_data/bmi_age_2_5_girl.csv": "1586f278f8def089b30c79d67f3f75db",
"assets/assets/growth_chart_data/bmi_age_5_19_boy.csv": "4370fffba2a379210dc683498b3b093d",
"assets/assets/growth_chart_data/bmi_age_5_19_girl.csv": "12e9d30cb620e5820cf5f6b93389d9f7",
"assets/assets/growth_chart_data/height_age_2_5_boy.csv": "6e5e70c7977cedaf29a4117c1cd85a00",
"assets/assets/growth_chart_data/height_age_2_5_girl.csv": "2e65bc26cdfb0d76ae2030e80e6982aa",
"assets/assets/growth_chart_data/height_age_5_19_boy.csv": "8106c48b1143408096cd8d9edcda9e32",
"assets/assets/growth_chart_data/height_age_5_19_girl.csv": "53efe8ea6b11535bab438f5ec8bba076",
"assets/assets/growth_chart_data/weight_age_0_5_boy.csv": "b3d8539762acdef5f2fa610b4d302e0c",
"assets/assets/growth_chart_data/weight_age_0_5_girl.csv": "a9c938e03102efc8517640602984af38",
"assets/assets/growth_chart_data/weight_age_5_10_boy.csv": "72a70c1954aaf1c5904c9867727e36cb",
"assets/assets/growth_chart_data/weight_age_5_10_girl.csv": "73cdee947bbba686774e7ce701e54005",
"assets/assets/growth_chart_data/weight_height_2_5_boy.csv": "e1332c40c643f32eae5d0ed2c1c765d3",
"assets/assets/growth_chart_data/weight_height_2_5_girl.csv": "a7c772b511052e40b3e7239455cad331",
"assets/assets/images/bg_banner.png": "ff688f9f754614dab380b51a07b3ed20",
"assets/assets/images/boy.png": "07d842a2f194d8bf21edb6480295e80d",
"assets/assets/images/girl.png": "ccbe6cea3ee2d1e177ae807081490f69",
"assets/assets/images/growth.png": "88ce8f716c8c4bde6eacfdb7eff8670f",
"assets/assets/images/logo.png": "3fbd54ab2ba30bc81c2bcf2058858f30",
"assets/assets/images/odema_test.png": "8af080c8f5ce87f406b0fa94fcc65fb7",
"assets/assets/images/weight.png": "19ea5be6b31a0996b53712e0005b3847",
"assets/assets/images/who.png": "decdff7eed874e41b3d6d3cf6474a4e9",
"assets/assets/vectors/home_page_divider.svg": "0618fbda3a186ac0fe818efd6e66189c",
"assets/FontManifest.json": "9abb3f01c53f113c643a1b3188ef307b",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "7d5c4d2bb75fef26635148857783faaf",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "fa9ac0a730ae0b24f317f9ad75f4256f",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "6a22557c71d3db1531dbac8599f83f5a",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "705500002e9f0d2359bd2140ced9dbb9",
"icons/Icon-512.png": "4b3bf8c520420122e9c4948a0146edf9",
"icons/Icon-maskable-192.png": "705500002e9f0d2359bd2140ced9dbb9",
"icons/Icon-maskable-512.png": "4b3bf8c520420122e9c4948a0146edf9",
"index.html": "df305dd1c7312a6f8220723de2fb191c",
"/": "df305dd1c7312a6f8220723de2fb191c",
"main.dart.js": "61990a260c1d92ed851b2b46403367fb",
"manifest.json": "a9b29b6833618b5cde91f1fe1a3bda7d",
"version.json": "11e1a177d57c5da2bc6e3a6acc3010f4"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
