import { getMyAppLoadContext } from '~/.server/context'
import { Welcome } from '../welcome/welcome'
import type { Route } from './+types/_index'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	]
}

export function loader({}: Route.LoaderArgs) {
	const { env } = getMyAppLoadContext()

	return { message: env.VALUE_FROM_CLOUDFLARE }
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return <Welcome message={loaderData.message} />
}
