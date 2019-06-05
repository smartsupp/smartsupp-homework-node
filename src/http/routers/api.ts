import * as koaBody from 'koa-body'
import * as Router from 'koa-router'

/**
 * @injectable(http.routers.api)
 */
export function createRouter() {
	const router = new Router()
	router.use(koaBody())

	router.get('/api/test', async () => {
		// only allowed if access token is valid
	})

	return router
}
