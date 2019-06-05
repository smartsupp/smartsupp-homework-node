import * as Koa from 'koa'
import * as logger from '@src/logger'

export default () => {

	return (ctx: Koa.Context, next) => {
		logger.debug(`${ctx.method} ${ctx.url}`)
		return next()
	}

}
