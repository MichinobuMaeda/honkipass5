import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';

export default defineConfig({
	plugins: [
		paraglide({ project: './project.inlang', outdir: './src/lib/paraglide' }),
		sveltekit(),
		SvelteKitPWA({
			strategies: 'injectManifest',
			srcDir: './src',
			filename: 'service-worker.js',
			registerType: 'autoUpdate',

			pwaAssets: {
				disabled: false,
				config: true
			},

			manifest: {
				name: 'honkipass5',
				short_name: '本気でパスワード v5',
				description: 'honkipass5',
				theme_color: '#63A002',
				background_color: '#63A002',
				lang: 'ja'
			},

			workbox: {
				globPatterns: ['client/**/*.{js,html,css,svg,png,ico}']
			},

			injectManifest: {
				globPatterns: ['**/*.{js,html,css,svg,png,ico}']
			},

			devOptions: {
				enabled: false,
				navigateFallback: 'index.html',
				suppressWarnings: true,
				type: 'module'
			},

			kit: {
				includeVersionFile: true
			}
		})
	]
});
