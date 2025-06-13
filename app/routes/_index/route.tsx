import { getMyRequestContext } from '~/.server/context'
import type { Route } from './+types/route'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	]
}

export function loader({}: Route.LoaderArgs) {
	const { env } = getMyRequestContext()

	return { message: env?.VALUE_FROM_CLOUDFLARE }
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return (
		<div className="font-sans max-w-2xl mx-auto p-8 text-center">
			<h1 className="text-4xl text-blue-600 mb-4">React Router 7 Template</h1>
			<p className="text-lg text-gray-700 mb-8">
				A minimal starter template for building applications with React Router
				7. This template provides a solid foundation for your routing needs.
			</p>
			<a
				href="https://github.com/patdx/react-router-7-template"
				target="_blank"
				rel="noopener noreferrer"
				className="inline-block px-6 py-3 text-white bg-blue-600 rounded-md text-base no-underline transition-colors duration-300 hover:bg-blue-800"
			>
				View on GitHub
			</a>
			<p className="text-sm text-gray-500 mt-4">
				Environment Message: {loaderData.message}
			</p>
		</div>
	)
}
