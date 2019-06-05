import * as logger from '@src/logger'
import Redis = require('ioredis')

/**
 * @injectable(redis)
 */
export function createRedis(): Redis.Redis {
	const redisClient = new Redis({
		host: process.env.REDIS_HOST,
		showFriendlyErrorStack: true,
	})

	redisClient.on('error', (err: Error) => {
		logger.error(err, `[redis] ${err.message}`)
	})

	return redisClient
}
