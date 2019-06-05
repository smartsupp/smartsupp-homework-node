import { ValidationOptions } from '@hapi/joi'
import * as Koa from 'koa'
import Joi = require('@hapi/joi')

export function validate(data: IValidationData, options: ValidationOptions = {}) {
	if (!options.hasOwnProperty('stripUnknown')) {
		options.stripUnknown = true
	}

	return async function validateContext(ctx: Koa.Context, next) {
		try {
			if (data.headers) {
				Object.assign(ctx.request.headers, await Joi.validate(ctx.request.headers, data.headers, options))
			}
			if (data.body) {
				ctx.request.body = await Joi.validate(ctx.request.body, data.body, options)
			}
			if (data.query) {
				const query = await Joi.validate(ctx.request.query, data.query, options)
				Object.defineProperty(ctx.request, 'query', {
					get() {
						return query
					},
				})
			}
			if (data.params) {
				ctx.params = await Joi.validate(ctx.params, data.params, options)
			}
		} catch (e) {
			ctx.throw(400, e)
		}
		await next()
	}

}

export interface IValidationData {
	headers?: any
	body?: any
	query?: any
	params?: any
}
