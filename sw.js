!function() {
  'use strict'; self.addEventListener('install', function(e) {
    return self.skipWaiting();
  }), self.addEventListener('activate', function(e) {
    return self.clients.claim();
  }); let e = ['assets/hackernews-291073ce822d7842a037a9921f67fbee.css', 'assets/hackernews-9c869886fe29921384661ef73e4559c8.js', 'assets/images/buffer-88ae28d5c187118d47dc6b454eeceb65.svg', 'assets/images/ember-hn-inverted-9bc6a322ec8d20e7129f1a2a6bcebec7.svg', 'assets/images/ember-hn-inverted180-2d0e4a86e4377ec13352a2c61f47c73b.png', 'assets/images/ember-hn-inverted192-2fe474b03b0b88745b1f15ae3b6524df.png', 'assets/images/ember-hn-inverted512-7631610d3c6ce2f3fb3f3a345603b06c.png', 'assets/images/ember-hn-logo.sketch', 'assets/images/ember-hn-f962422c66f3073af241b40a69d5c460.svg', 'assets/images/ember-hn180-544102f109343e8f843512585265ea4f.png', 'assets/images/ember-hn192-d6c18f4cfd30b8116ab4dac5f8298126.png', 'assets/images/ember-hn512-132941570a242b2561054d4e5c8d6bde.png', 'assets/images/ic_comment_black_24px-54de18bf1818cf487f1920d6e003d121.svg', 'assets/images/ic_person_black_24px-0543d4484b5a141e87c76641462cb40d.svg', 'assets/vendor-d41d8cd98f00b204e9800998ecf8427e.css', 'assets/vendor-663c746db58838f7bdfc4b85d57a6000.js'], t = function(e, t) {
      return caches.keys().then(function(n) {
        n.forEach(function(n) {
          let s = 0 === n.indexOf(e), i = n !== t; s && i && caches.delete(n);
        });
      });
    }, n = 'esw-asset-cache-4', s = e.map(function(e) {
      return new URL(e, self.location).toString();
    }), i = function() {
      caches.open(n).then(function(e) {
        return e.keys().then(function(t) {
          t.forEach(function(t) {
            -1 === s.indexOf(t.url) && e.delete(t);
          });
        });
      });
    }; self.addEventListener('install', function(e) {
      e.waitUntil(caches.open(n).then(function(e) {
        return Promise.all(s.map(function(t) {
          let n = new Request(t, { mode: 'cors' }); return fetch(n).then(function(n) {
          if (n.status >= 400) {
            throw new Error(`Request for ${t  } failed with status ${  n.statusText}`);
          } return e.put(t, n);
        }).catch(function(e) {
          console.error(`Not caching ${t  } due to ${  e}`);
        });
        }));
      }));
    }), self.addEventListener('activate', function(e) {
      e.waitUntil(Promise.all([t('esw-asset-cache', n), i()]));
    }), self.addEventListener('fetch', function(e) {
      let t = 'GET' === e.request.method, i = -1 !== s.indexOf(e.request.url); t && i && e.respondWith(caches.match(e.request, { cacheName: n }).then(function(t) {
      return t || fetch(e.request);
    }));
    }); let a = new URL('index.html', self.location).toString(); self.addEventListener('install', function(e) {
    e.waitUntil(fetch(a, { credentials: 'include' }).then(function(e) {
      return caches.open('esw-index-1').then(function(t) {
      return t.put(a, e);
    });
    }));
  }), self.addEventListener('activate', function(e) {
    e.waitUntil(t('esw-index', 'esw-index-1'));
  }), self.addEventListener('fetch', function(e) {
  let t = e.request, n = 'GET' === t.method, s = -1 !== t.headers.get('accept').indexOf('text/html'), i = new URL(t.url).origin === location.origin; n && s && i && e.respondWith(caches.match(a, { cacheName: 'esw-index-1' }));
});
}();
