declare module 'node-injectable' {

	export class Container {
		add<T>(name: string, service: T): void

		remove<T>(name: string): void

		resolve<T>(name: string): Promise<T>

		inject<T>(definition: Array<any> | Function, ctx: any): Promise<T>

		lookup(src: string): Promise<any>
	}

}