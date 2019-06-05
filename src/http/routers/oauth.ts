import * as koaBody from 'koa-body'
import * as Router from 'koa-router'

/**
 * @injectable(http.routers.oauth)
 */
export function createRouter() {
	const router = new Router()
	router.use(koaBody())

	router.get('/oauth/authorize', async () => {
		// TODO: implement
	})

	router.get('/oauth/token', async () => {
		// TODO: implement
	})

	return router
}
