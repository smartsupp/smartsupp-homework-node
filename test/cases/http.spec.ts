import { Container } from 'node-injectable'
import { createClient, createContainer, startServer, stopServer } from '../support/helpers'
import { AxiosInstance } from 'axios'

describe('http', () => {
	let container: Container
	let client: AxiosInstance

	beforeAll(async () => {
		container = await createContainer()
		client = createClient()
	})

	test('should start server', async () => {
		await startServer(container)
	})

	test('should get success response', async () => {
		const res = await client.get('/status')
		expect(res.status).toBe(200)
	})

	afterAll(async () => {
		await stopServer(container)
	})
})
