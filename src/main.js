'use strict'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import './components'

import App from './App.vue'
import i18n from './i18n'
import './plugins'
import router from './routes'
import store from './store'
import './registerServiceWorker.js'

Vue.config.productionTip = false
Vue.use(Vuetify)

export default new Vue({
	el: '#app',
	i18n,
	render: h => h(App),
	router,
	store,
	vuetify: new Vuetify({
		icons: {
			iconfont: 'mdiSvg',
		},
		lang: { t: (key, ...params) => i18n.t(key, params) }
	})
})

// This is only for debugging; will be removed shortly
window.importChunk = async function(name, chunk) {
	window.pluginBeingLoaded = {
		name: name,
		dwcWebpackChunk: chunk,
		dwcFiles: [`${chunk}.js`]
	};
	window.pluginBaseURL = 'http://127.0.0.1:8080/';

	// eslint-disable-next-line no-undef
	__webpack_require__.e(chunk).then(__webpack_require__.bind(null, `./src/plugins/${chunk}/index.js`));
}

import { loadDwcResources } from './plugins'
window.importPlugin = () => loadDwcResources(
	{
		name: 'DWC Height Map',
		dwcWebpackChunk: 'HeightMap',
		dwcFiles: ['HeightMap.js']
	},
	{
		requestBase: 'http://127.0.0.1:8080/'
	}
);
