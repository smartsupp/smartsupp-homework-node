import bunyan = require('bunyan')
import { LogLevelString } from 'bunyan'

let defaultLogger: bunyan = null

export function init(level: LogLevelString): bunyan {
	const logger = bunyan.createLogger({
		name: 'homework',
		streams: [],
		serializers: bunyan.stdSerializers,
	})

	logger.addStream({
		type: 'stream',
		level: level,
		stream: process.stdout,
	})

	if (!defaultLogger) {
		defaultLogger = logger
	}

	return logger
}

export function log(level: 'debug' | 'info' | 'warn' | 'error', ...args) {
	defaultLogger[level].apply(defaultLogger, args)
}

export function trace(...args) {
	defaultLogger.trace.apply(defaultLogger, args)
}

export function debug(...args) {
	defaultLogger.debug.apply(defaultLogger, args)
}

export function info(...args) {
	defaultLogger.info.apply(defaultLogger, args)
}

export function warn(...args) {
	defaultLogger.warn.apply(defaultLogger, args)
}

export function error(...args) {
	defaultLogger.error.apply(defaultLogger, args)
}

export function child(options: any, simple?: boolean) {
	return defaultLogger.child(options, simple)
}
