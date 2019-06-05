import * as logger from '@src/logger'
import axios, { AxiosInstance } from 'axios'
import * as http from 'http'
import { Container } from 'node-injectable'
import Redis = require('ioredis')

logger.init('error')

export async function createContainer(): Promise<Container> {
	const container = new Container()
	container.add('container', container)
	await container.lookup(__dirname + '/../../src/**/*.ts')
	return container
}

export async function startServer(container: Container) {
	const server = await container.resolve<http.Server>('http.server')
	await server.listenAsync()
}

export async function stopServer(container: Container) {
	const server = await container.resolve<http.Server>('http.server')
	await server.closeAsync()

	const redis = await container.resolve<Redis.Redis>('redis')
	redis.disconnect()
}

export function createClient(): AxiosInstance {
	return axios.create({
		baseURL: 'http://localhost',
		httpAgent: new http.Agent(),
		validateStatus: () => {
			return true // always true
		},
	})
}
