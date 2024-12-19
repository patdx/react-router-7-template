import { createRequestHandler } from 'react-router'
import {
	MyAppLoadContext,
	type MyCloudflareEnvironment,
} from '~/.server/context'

const requestHandler = createRequestHandler(
	// @ts-expect-error - virtual module provided by React Router at build time
	() => import('virtual:react-router/server-build'),
	import.meta.env.MODE,
)

export default {
	fetch(request, env, executionCtx) {
		const myAppLoadContext: MyAppLoadContext = {
			request,
			env,
			executionCtx,
		}

		return MyAppLoadContext.run(myAppLoadContext, () =>
			requestHandler(request, myAppLoadContext),
		)
	},
} satisfies ExportedHandler<MyCloudflareEnvironment>
