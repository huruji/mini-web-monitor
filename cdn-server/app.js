const Koa = require ('koa');
const koaStatic = require ('koa-static');
const app = new Koa ();
const path = require('path');
const cors = require ('@koa/cors');

app.use(cors())

app.use (koaStatic (path.join (__dirname, '/')));

app.listen (8001);
