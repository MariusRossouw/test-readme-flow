import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import { Schema, ValidateEnv } from '@julr/vite-plugin-validate-env';
import * as child from 'child_process';

const commitHash = child
	.execSync('git rev-parse --short=7 --verify HEAD')
	.toString();
const commitDate = child
	.execSync('git log -1 --format=%cI')
	.toString()
	.trimEnd();

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		plugins: [
			sveltekit(),
			ValidateEnv({
				VITE_CONFIG_URL: (key, value) => {
					if (process.env.VITE_FE && process.env.VITE_FE === 'local') {
						console.log('A developer FE !');
						if (
							value != null &&
							value != undefined &&
							value.includes('https://') === false
						) {
							throw new Error('VITE_CONFIG_URL is not a valid URL');
						}
					} else {
						console.log('Not a developer FE !');
						if (value === null || value === undefined) {
							throw new Error('VITE_CONFIG_URL is required');
						}
						if (value.includes('https://') === false) {
							throw new Error('VITE_CONFIG_URL is not a valid URL');
						}
					}
					return value;
				},
				VITE_API_KEY: Schema.string({ message: 'VITE_API_KEY is required !' })
			})
		],
		define: {
			__APP_NAME__: JSON.stringify(process.env.npm_package_name),
			__GIT_COMMIT_HASH__: JSON.stringify(commitHash),
			__GIT_COMMIT_DATE__: JSON.stringify(commitDate)
		}
	});
};
