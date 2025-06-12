import { createRequestHandler } from 'react-router'
import { MyAppLoadContext } from '~/.server/context'

const requestHandler = createRequestHandler(
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
} satisfies ExportedHandler<Cloudflare.Env>
