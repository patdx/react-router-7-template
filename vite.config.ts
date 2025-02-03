import * as honoViteDevServer from '@hono/vite-dev-server'
import cloudflareAdapter from '@hono/vite-dev-server/cloudflare'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ isSsrBuild }) => ({
	build: {
		rollupOptions: isSsrBuild
			? {
					input: './workers/app.ts',
				}
			: undefined,
	},
	ssr: {
		target: 'webworker',
		noExternal: true,
		external: [
			// test
			'node:async_hooks',
			'nodemailer',
		],
		resolve: {
			conditions: ['workerd', 'browser'],
		},
		optimizeDeps: {
			include: [
				'react',
				'react/jsx-runtime',
				'react/jsx-dev-runtime',
				'react-dom',
				'react-dom/server',
				'react-router',
			],
		},
	},
	plugins: [
		AutoImport({
			imports: ['react'],
		}),
		honoViteDevServer.default({
			entry: './workers/app.ts',
			adapter: cloudflareAdapter,
			exclude: [...honoViteDevServer.defaultOptions.exclude, /^\/(app)\/.+/],
			injectClientScript: false,
		}),
		reactRouter(),
		tsconfigPaths(),
		tailwindcss(),
	],
}))
