import * as os from 'os'
import * as http from 'http'
import * as injectable from 'node-injectable'
import * as logger from './logger'

let container: injectable.Container


export async function start() {
	// create container for services
	container = new injectable.Container()
	container.add('container', container)

	// init logger
	const loggerLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info'
	logger.init(loggerLevel)

	// build DI container
	await container.lookup(__dirname + '/**/*.ts')

	// run http
	const server = await container.resolve<http.Server>('http.server')
	await server.listenAsync()
	logger.info(`process ${os.hostname()} listening`)
}


export async function stop() {
	logger.info(`process ${os.hostname()} started shutting down`)

	const server = await container.resolve<http.Server>('http.server')

	await Promise.all([
		server.closeAsync(),
	])

	logger.info(`process ${os.hostname()} finished shutting down`)
	terminate()
}


export function terminate(code: number = 0): void {
	setTimeout(() => {
		process.exit(code)
	}, 1000).unref()
}
