# node-router
A pure Node replacement for Express


# Example
```node

const server = require('http2').createSecureServer({...});

const { Router, secure, cookies, sessions, publish } = require('http2-node-router');
const router = Router();

// Some included middleware
router.use(secure());
router.use(cookies());
router.use(sessions());
router.use(publish('public'));  // Make a directory public

// Middleware just like Express
router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
}, // Can even chain functions
(req, res, next) => {
    ...
    next(); // Must call next
});


// Shortcut for doing HTTP/2 Push of a local file
router.use((request, response, next) => {
    response.pushFile("/styles/main.css");
    response.pushFile("/scripts/main.js");
    
    // Can also push some arbitrary data 
    response.push(`/some-json-data`,
      {'Content-Type': 'application/json'},
            async () => {
              return JSON.stringify(await getDataFromDB())
            }
    );
    
    next();
});

// Using multiple routers
router.use('/showcase', require('./routes/showcase'));
router.use('/blog', require('./routes/blog'));


// Default page
router.get('/', (request, response) => {
    response.sendFile(`${__dirname}/public/index.html`);
});

// Catch all GET
router.get('', (request, response) => {
    response.sendFile(`${__dirname}/public/404.html`);
});



server.on("request", router);
server.listen(443);

```
