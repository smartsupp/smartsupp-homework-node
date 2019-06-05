import * as logger from '@src/logger'
import { Context } from 'koa'
import * as Router from 'koa-router'
import Redis = require('ioredis')

/**
 * @injectable(http.routers.main)
 * @param redis @inject(redis)
 */
export function createRouter(redis: Redis.Redis) {
	const router = new Router()

	router.get('/status', async (ctx: Context) => {
		const result = {
			redis: null,
		}

		try {
			await check(() => {
				return redis.ping()
			})
			result.redis = {status: 200}
		} catch (err) {
			logger.warn(`[status] redis failure: ${err.message}`)
			result.redis = {status: 503}
		}

		ctx.body = result
	})

	return router
}


function check(callback, timeout = 5000) {
	return new Promise((resolve, reject) => {
		callback().then(resolve).catch(reject)
		setTimeout(() => {
			reject(new Error('Connection timeout'))
		}, timeout)
	})
}
