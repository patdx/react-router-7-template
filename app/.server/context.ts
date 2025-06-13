import { AsyncLocalStorage } from 'node:async_hooks'
import {
	unstable_createContext,
	type unstable_InitialContext,
} from 'react-router'

export const MyInitialContext = new AsyncLocalStorage<unstable_InitialContext>()

export interface MyRequestContext {
	request: Request
	env: Cloudflare.Env
	executionCtx: ExecutionContext
}

export const myRequestContext = unstable_createContext<MyRequestContext>()

export function getMyRequestContext(): Partial<MyRequestContext> {
	const ctx = MyInitialContext.getStore()

	const requestContext = ctx?.get(myRequestContext) as
		| MyRequestContext
		| undefined

	return requestContext ?? {}
}
