import * as logger from '@src/logger'
import * as http from 'http'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import error from './middlewares/error'
import log from './middlewares/log'

/**
 * @injectable(http.router)
 * @param main @inject(http.routers.main)
 * @param api @inject(http.routers.api)
 * @param oauth @inject(http.routers.oauth)
 * @param clients @inject(http.routers.clients)
 */
export function createRouter(main: Router, api: Router, oauth: Router, clients: Router) {
	const app = new Koa()

	app.use(log())
	app.use(error())

	app.use(main.routes())
	app.use(api.routes())
	app.use(oauth.routes())
	app.use(clients.routes())

	app.on('error', (err: Error, ctx: Koa.Context) => {
		logger.error(err, `${ctx.method} ${ctx.url}: ${err.message}`)
	})

	return app
}

/**
 * @injectable(http.server)
 * @param koa @inject(http.router)
 */
export function createServer(koa: Koa) {
	const server = http.createServer(koa.callback())
	server.keepAliveTimeout = 120e3

	server.listenAsync = () => {
		return new Promise((resolve, reject) => {
			server.listen(80)
			server.once('listening', resolve)
			server.once('error', reject)
		})
	}

	server.closeAsync = () => {
		return new Promise((resolve, reject) => {
			server.unref()
			server.close((err) => {
				err ? reject(err) : resolve()
			})
		})
	}

	return server
}
