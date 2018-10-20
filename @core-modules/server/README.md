## The @server module
#### /boilerplate/@core-modules/server
## Express
Express is used by default in development mode, with the default Cache-Control max-age 0.  
If the ```ß.static_options``` is ```undefined``` at inicialization, it will set max-age to 24h if production env. var is set.  
It is recommended to use ```ß.static_options``` for express static server routes.


[@express.js:6](https://bp-devel.d250.hu:9001/p/boilerplate/@core-modules/server/global/express.js?line=6)

Static assets like css files can be placed in any module or the project root, in a /static folder


[@serve_static.js:3](https://bp-devel.d250.hu:9001/p/boilerplate/@core-modules/server/routes/serve_static.js?line=3)

Data representing assets like json files can be placed in any module or the project root, in a /data folder


[@serve_static.js:6](https://bp-devel.d250.hu:9001/p/boilerplate/@core-modules/server/routes/serve_static.js?line=6)

<pre>
global
 - express.js
 - path.js
 - socketiostream.js
lib
 - config_mongodb.js
 - serve_files.js
 - serve_static.js
routes
 - serve_static.js
 - socketio-stream.js
server
 - server.js
start
 - socketio.js
</pre>

