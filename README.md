# content
- create a a webpage with css/js/images.
-



Lessons

### 01 - Create Webpage

- Lets first create a webpge with some js, css and images.

- On running lighthouse audit on the page we see followign result

  ![image-20191020132635008](/Users/dawn/Documents/projects/service-workers/docs:images/01-create-project-audit.png)

### 02 - Create and register a service worker

- create empty **sw.js** file at root

  ```javascript
  self.addEventListener('install', event => {
    console.log('Service worker Install event!');
  });
  
  self.addEventListener('activate', event => {
    console.log('Service worker activate event!');
  });
  
  self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
  });
  ```

- Check if the browser supports service worker, if yes, register service worker from **sw.js** on window load event

  ```html
  <script>
      if(window.navigator.serviceWorker){
        window.addEventListener('load', () => {
          window.navigator.serviceWorker.register('/sw.js').then( (serviceWorkerRegistration) => {
              console.log('service worker registered', serviceWorkerRegistration);
          }).catch(error => {
            console.error('service worker failed to register', error)
          });
        });
      }
    </script>
  ```



- Reload page to check if service worker registration works, we see following message if it succeeds 

  ![image-20191020134209235](/Users/dawn/Documents/projects/service-workers/docs:images/02-sw-register-success.png)



- now reload the page for second time, and we see following 

  ![image-20191020134654960](/Users/dawn/Library/Application Support/typora-user-images/image-20191020134654960.png)

  

- Notice that once installed and activated, ther service worker does not re-install on subsequent reloads.

- Now lets close the page and open url again, we see following on console 

  ![image-20191020134854607](/Users/dawn/Documents/projects/service-workers/docs:images/02-sw-register-open-close-again.png)

- Note that this time, the service worker was installed and activated once again.



### 03 - Cache some files with service worker

- In this step, we will add some static files to cache.

- Though we will **not enable offline feature in this steap**

- Create a version for cache (reset after we change teh cached files later on)

- And create list of first few files we want to cache

  ```javascript
  const cacheName = 'cache-v1';
  
  const cachedResources = [
    '/',
    'index.html',
    'style/main.css',
    'images/still_life_medium.jpg'
  ];
  ```

  

- Load the list of files into the cache on **installation** in sw.js

  ```javascript
  const cacheName = 'cache-v1';
  
  const cachedResources = [
    '/',
    'index.html',
    'style/main.css',
    'images/still_life_medium.jpg'
  ];
  
  self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
      caches.open(cacheName)
        .then(cache => {
          return cache.addAll(precacheResources);
        })
    );
  });
  ```

  

- Now chech the cached files in devtools: 

  ![image-20191020150208666](/Users/dawn/Documents/projects/service-workers/docs/images/02-add-static-cache.png)

  

**Note**

- inside service worker, there is ***no window object***
- self inside service worker refers to the service worker object.
- 


Todo**

- create



# Resources

- **Service worker for static files** : https://codelabs.developers.google.com/codelabs/pwa-caching-service-worker/index.html?index=..%2F..dev-pwa-training#0
- **PWA basics :** https://codelabs.developers.google.com/dev-pwa-training/
- https://www.youtube.com/playlist?list=PLNYkxOF6rcIB2xHBZ7opgc2Mv009X87Hh

