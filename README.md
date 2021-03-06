# node-router
- A zero-dependency replacement for Express.
- Works with HTTP/2 out-of-the-box


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


// Handle GET
router.get('/inquiry/:id?', (request, response) => {
    let name = request.query.get('name');  // query is a URLSearchParams object
    let id = request.params?.['id'];       // params is a regular object
    
    if (id) response.write(`Got id: ${id}\n`);
    
    response.end(`We got your data, ${name}!`);
});


// Handle POST
router.post('/action', async (request, response) => {
    let data = await request.body;  // Get POST data easy
    response.end("We got your data!");
});


// Default page
router.get('/', (request, response) => {
    // Shortcut to send static file
    response.sendFile(`${__dirname}/public/index.html`);
});


// Catch all GET
router.get('', (request, response) => {
    response.sendFile(`${__dirname}/public/404.html`);
});



server.on("request", router);
server.listen(443);

```
