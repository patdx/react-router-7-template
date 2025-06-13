import {
	createRequestHandler,
	type unstable_InitialContext,
} from 'react-router'
import {
	MyInitialContext,
	myRequestContext,
	type MyRequestContext,
} from '~/.server/context'
// import * as serverBuild from 'virtual:react-router/server-build'

const requestHandler = createRequestHandler(
	() => import('virtual:react-router/server-build'),
	import.meta.env.MODE,
)
export default {
	fetch(request, env, executionCtx) {
		const initialContext: unstable_InitialContext = new Map()

		initialContext.set(myRequestContext, {
			request,
			env,
			executionCtx,
		} satisfies MyRequestContext)

		return MyInitialContext.run(initialContext, () =>
			requestHandler(request, initialContext),
		)
	},
} satisfies ExportedHandler<Cloudflare.Env>
