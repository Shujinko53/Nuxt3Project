// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: [
		'@nuxt/image',
		'nuxt-icons',
		['@nuxtjs/google-fonts', {
			families: {
				// Roboto: true,
				// Inter: '200..700',
				Lato: {
					wght: [300, 400, 700],
					ital: [300]
				},
				// Raleway: {
				// 	wght: [100, 400],
				// 	ital: [100]
				// },
				// 'Crimson Pro': {
				// 	wght: '200..900',
				// 	ital: '200..700',
				// }
			},
		}],
		'@pinia/nuxt'
	],
	css: ['~/assets/scss/bundle.scss'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					additionalData: '@use "~/assets/scss/shared/_variables.scss" as *;',
				}
			}
		}
	},
	pinia: {
		storesDirs: ['./store/**'],
	  },
})	