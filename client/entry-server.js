import Vue from 'vue'
import Router from 'vue-router' // 引入路由
import express from 'express' //eslint-disable-line
import session from 'express-session'
import bodyParser from 'body-parser'
import serialize from 'serialize-javascript'
import ejs from 'ejs'
import proxy from 'http-proxy-middleware' //eslint-disable-line
import axios from 'axios'
import { createApp } from './App.js'
import stores from './store'

const renderer = require('vue-server-renderer').createRenderer()
    // vue use
Vue.use(Router)
const isDev = process.env.NODE_ENV === 'development'
const exp = express()
const { app, router, store } = createApp()
const getStoreState = stores => {
    return Object.keys(stores).reduce((result, storeName) => {
        result[storeName] = stores[storeName]
        return result
    }, {})
}

// 调试错误原因
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
        // application specific logging, throwing an error, or other logic here
})

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios
            .get('http://localhost:8888/public/server.ejs')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    }).catch(err => console.log(err))
}
exp.use(bodyParser.json())
exp.use(bodyParser.urlencoded({ extended: false }))
exp.use(
    session({
        maxAge: 10 * 60 * 1000,
        name: 'tid',
        resave: false,
        saveUninitialized: false,
        secret: 'vue cnode class'
    })
)
exp.get('/api/randomimg', (req, res, next) => {
    let urls = []
    let promises = []
    for (let i = 0; i < 4; i++) {
        promises.push(
            new Promise((resolve, reject) => {
                axios
                    .get('https://api.ixiaowai.cn/api/api.php?return=json')
                    .then(resp => {
                        if (resp.status === 200) {
                            console.log(typeof resp.data)
                                //let data =  JSON.parse(resp.data)
                            resolve(resp.data['imgurl'])
                        }
                    })
                    .catch(reject)
            })
        )
    }

    Promise.all(promises).then(resp => {
        console.log(resp)
        urls.push(resp)
        res.json({
            success: true,
            data: urls
        })
    })
})
exp.use('/api/user', require('../server/utils/handle-login'))
exp.use('/api', require('../server/utils/proxy'))
exp.use(
    '/public',
    proxy({
        target: 'http://localhost:8888'
    })
)



function render(stores, req, res, next, context) {
    getTemplate()
        .then(template => {

            if (context.url) {
                res.status(302).setHeader('Location', context.url)
                res.end()
            }

            let html = ''

            renderer.renderToString(app)
                .then(content => {
                    html = ejs.render(template, {
                        appString: content,
                        style: '',
                        meta: '',
                        link: '',
                        title: '',
                        materialCss: ''
                    })
                    if (context.NOT_FOUND) {
                        res.status(404).send(html)
                    } else {
                        res.send(html)
                    }
                }).catch(err => {
                    console.error(err);
                })
        })
        .catch(next)
}

exp.get('*', (req, res, next) => {
    const context = {}
    render(stores, req, res, next, context);
    new Promise((resolve, reject) => {
        const { app, router, store } = createApp()

        router.push(context.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            // 对所有匹配的路由组件调用 `asyncData()`
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                // 在所有预取钩子(preFetch hook) resolve 后，
                // 我们的 store 现在已经填充入渲染应用程序所需的状态。
                // 当我们将状态附加到上下文，
                // 并且 `template` 选项用于 renderer 时，
                // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                context.state = store.state

                resolve(app)
            }).catch(reject)
        }, reject)
    })

})

exp.use('/dev', express.static('dev'))
const host = process.env.HOST || 'localhost' // 还可以默认是0.0.0.0 回环地址
const port = process.env.PORT || 3333

exp.listen(port, host, () => {
    console.log(`react ssr is starting listen at ${host}:${port} port`)
})