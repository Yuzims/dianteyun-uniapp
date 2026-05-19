import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import { initAuth } from '@/services/auth'
import { ensureAuth } from '@/utils/auth-guard'

export function createApp() {
	const app = createSSRApp(App);
	initAuth()
	app.mixin({
		onLoad() {
			ensureAuth()
		},
		onShow() {
			ensureAuth()
		}
	})
	return {
		app,
	};
}
