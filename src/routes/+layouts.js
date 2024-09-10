export const ssr = false;
export const csr = true;
export const prerender = false;

import { saveLS, removeLS } from '@stratech-team/svelte-component-library';
export async function load(event) {
	// Typically for deploys and connecting to spesific API's without .ENV file
	if (import.meta.env.VITE_CONFIG_URL) {
		let request = {
			getConfigUrl: import.meta.env.VITE_CONFIG_URL,
			gitInfo: {
				commitHash: __GIT_COMMIT_HASH__,
				commitDate: __GIT_COMMIT_DATE__
			}
		};
		const conf = await fetch(import.meta.env.VITE_CONFIG_URL, {
			method: 'POST',
			body: JSON.stringify(request),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-API-KEY': import.meta.env.VITE_API_KEY,
				'X-build-number': __GIT_COMMIT_HASH__
			}
		});
		const data = await conf.json();
		let name =
			data.data.APP_NAME + ' @ ' + window.location.origin + ' /AppConfig';
		removeLS(name);
		saveLS(data.data, name);
		removeLS('AppName');
		saveLS(data.data.APP_NAME, 'AppName');
		return data.data;
	} else {
		// Use details from .ENV file
		let meta = import.meta.env;
		for (const [key, value] of Object.entries(meta)) {
			if (key.startsWith('VITE_')) {
				var replaced_key = key.replace('VITE_', '');
				meta[replaced_key] = meta[key];
				delete meta[key];
			}
		}
		let name = meta.APP_NAME + ' @ ' + window.location.origin + ' /AppConfig';
		saveLS(meta, name);
		removeLS('AppName');
		saveLS(meta.APP_NAME, 'AppName');
		return meta;
	}
}
