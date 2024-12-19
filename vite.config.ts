import { reactRouter } from '@react-router/dev/vite'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import AutoImport from 'unplugin-auto-import/vite'
import * as honoViteDevServer from '@hono/vite-dev-server'
import cloudflareAdapter from '@hono/vite-dev-server/cloudflare'

export default defineConfig(({ isSsrBuild }) => ({
	build: {
		...(isSsrBuild
			? {
					emitAssets: false,
					ssrEmitAssets: false,
				}
			: {}),
		rollupOptions: isSsrBuild
			? {
					input: './workers/app.ts',
				}
			: undefined,
	},
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
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
	],
}))

const x = {
	ssr: {
		external: [
			// test
			'node:async_hooks',
			'nodemailer',
		],
	},
}
