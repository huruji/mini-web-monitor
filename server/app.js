const Koa = require('koa')
const koaStatic = require ('koa-static')
const app = new Koa()
const path = require('path')

app.use (koaStatic (path.join (__dirname, '/')))

app.listen (8000)
