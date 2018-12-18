# express-demo
Notes and practice creating and testing API routes in Express.

|[![Linda Lai](assets/contributors-linda-lai-70x70.jpg)](https://github.com/linda-lai) |
|-----------|
| Linda Lai |

## Creating an API in Express
Routing refers to how an application’s endpoints (URIs) respond to client requests. Route definition takes the following structure:

```
app.METHOD(PATH, HANDLER)
```

Where:
* `app` is an instance of express.
* `METHOD` is an HTTP request method, in lowercase.
* `PATH` is a path on the server.
* `HANDLER` is the function executed when the route is matched.

You define routing using methods of the Express app object that correspond to HTTP methods; for example, `app.get()` to handle GET requests and `app.post` to handle POST requests. For a full list, see `app.METHOD`. You can also use `app.all()` to handle all HTTP methods and `app.use()` to specify middleware as the callback function.

These routing methods specify a callback function (sometimes called “handler functions”) called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

## Resources
* Routing: https://expressjs.com/en/guide/routing.html#response-methods
*  Express/Node introduction: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction

To create a new API, create a new directory and create a new `package.json` file:
```
$ mkdir api
$ cd api
$ npm init
```

Input API details (or use `npm init --yes` to skip:)
```json
{
  "name": "api",
  "version": "1.0.0",
  "description": "An API to serve Pokemon requests",
  "main": "api.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Linda Lai",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.4"
  }
}
```

To create a new API, install Express and Nodemon as dependencies:
```
$ npm install express --save
$ npm install --save-dev nodemon
```

In `package.json`, add a script to run `api.js` file when `npm start` is called:

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon api.js"
  }
}
```

Create a new file called `api.js` and require in a new instance of Express:

```js
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
```

The `express` and `app` variables require in the Express module and creates a new instance of the Express application, which is a function: `express()`. 

This object, which is traditionally named app, has methods for routing HTTP requests, configuring middleware, rendering HTML views, registering a template engine, and modifying application settings that control how the application behaves (e.g. the environment mode, whether route definitions are case sensitive, etc.)

```js
const express = require('express');
const app = express();
```

The middle part of the code (the three lines starting with app.get) shows a route definition. The app.get() method specifies a callback function that will be invoked whenever there is an HTTP GET request with a path ('/') relative to the site root. The callback function takes a request and a response object as arguments, and simply calls send() on the response to return the string "Hello World!"

```js
app.get('/', function(req, res) {
  res.send('Hello World!');
});
```

The final block starts up the server on port '3000' and prints a log comment to the console. With the server running, you could go to localhost:3000 in your browser to see the example response returned.

```js
app.listen(3000, function() {
    console.log('Listening on port 3000...')
});
```

To run `api.js`:
```
$ npm start
$ node api.js
```

### Route Handlers
The Express application object also provides methods to define route handlers for all the other HTTP verbs, which are mostly used in exactly the same way:

```checkout(), copy(), delete(), get(), head(), lock(), merge(), mkactivity(), mkcol(), move(), m-search(), notify(), options(), patch(), post(), purge(), put(), report(), search(), subscribe(), trace(), unlock(), unsubscribe().```

There is a special routing method, `app.all()`, which will be called in response to any HTTP method. 

### Response Methods

The methods on the response object (res) in the following table can send a response to the client, and terminate the request-response cycle. If none of these methods are called from a route handler, the client request will be left hanging.

Method 	            | Description
--------------------|------------------------------------------
res.download()      | Prompt a file to be downloaded.
res.end() 	        | End the response process.
res.json() 	        | Send a JSON response.
res.jsonp() 	    | Send a JSON response with JSONP support.
res.redirect() 	    | Redirect a request.
res.render() 	    | Render a view template.
res.send() 	        | Send a response of various types.
res.sendFile() 	    | Send a file as an octet stream.
res.sendStatus() 	| Set the response status code and send its string representation as the response body