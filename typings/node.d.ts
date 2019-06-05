declare module 'http' {
	interface Server {
		listenAsync(): Promise<any>
		closeAsync(): Promise<any>
	}
}