const Koa = require('koa')
const router = require('koa-router')()
const SourceMap = require('source-map')
const app = new Koa()
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

router.get('/log.gif', async (ctx, next) => {
    const source = ctx.query.source
    const line = +ctx.query.l
    const column = +ctx.query.c
    const msg = ctx.query.msg
    const err = ctx.query.err

    const map = fs.readFileSync(path.resolve(__dirname, 'sourcemaps', `dist/${source.split('/').pop()}.map`), 'utf8').toString()
    const consumer = await new SourceMap.SourceMapConsumer(JSON.parse(map));
    const result = consumer.originalPositionFor({
        line,
        column,
    })
    console.log(chalk.red('原始上报的脚本异常信息：'), '\n')
    console.log(chalk.red(`行号：${line}`), '\n')
    console.log(chalk.red(`列号：${column}`), '\n')
    console.log(chalk.red(`文件：${source}`), '\n')
    console.log(chalk.red(`信息：${msg}`), '\n')
    console.log(chalk.red(`error对象：${err}`), '\n')

    console.log(chalk.green(`解析后源码对应的信息：`), '\n')
    console.log(chalk.green(`行号：${result.line}`), '\n')
    console.log(chalk.green(`列号：${result.column}`), '\n')
    console.log(chalk.green(`文件：${result.source}`), '\n')
    console.log(chalk.green(`name：${result.name}`), '\n')

    consumer.destroy();
    ctx.body = ''
})

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen('8002', () => {
    console.log('monitro server is listening port 8002')
})