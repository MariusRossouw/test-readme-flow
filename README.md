# FE-Setup

## Setup oh-my-zsh

1. Install oh-my-zsh

   ```json
   sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   ```

2. Change theme

- Open `~/.zshrc`
- Set `ZSH_THEME=agnoster`

3. Download font from [here](https://github.com/powerline/fonts/blob/master/Meslo%20Slashed/Meslo%20LG%20M%20Regular%20for%20Powerline.ttf)

## Setup nvm

1. Install homebrew

   ```json
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Add following to shell profile (e.g., ~/.bashrc, ~/.zshrc, or ~/.bash_profile)

   ```bash
   export PATH=/opt/homebrew/bin:$PATH
   ```

3. Install nvm

   ```bash
   brew install nvm
   ```

4. Create .nvm folder

   ```bash
   mkdir ~/.nvm
   ```

5. Add following to shell profile (e.g., ~/.bashrc, ~/.zshrc, or ~/.bash_profile)

   ```json
   export NVM_DIR=~/.nvm
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
   [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
   ```

6. Install node version(s)

   ```bash
   nvm install 20
   ```

7. Make the "latest" node version the default

   ```bash
   nvm alias default node
   ```

## Steps to make a Svelte app from scratch

### Create Sveltkit app

1. Create repo in github and clone empty repo
2. Open empty repo in VS Code and open it in the terminal
3. Make sure you are using the latest version of nodejs

   ```bash
   nvm use 20
   ```

4. Create a new svelte app

   ```bash
   npm create svelte@latest
   ```

- Where should we create your project?
  - (hit Enter to use current directory)
- Directory not empty. Continue?
  - (Yes)
- Which Svelte app template?
  - (Skeleton project)
- Add type checking with TypeScript?
  - (Yes, using JavaScript with JSDoc comments)
- Select additional options (use arrow keys/space bar)
  - (Add ESLint for code linting) [Analyzes your code to find problems and fix them automatically. It allows enforcing custom rules]
  - (Add Prettier for code formatting) [Helps format the code]
  - (Try the Svelte 5 preview (unstable!))
  - Your project is ready!

5. Install dependencies

   ```bash
   npm install
   ```

6. Run the app

   ```bash
   npm run dev
   ```

### Configure Prettier, ESlint, Huskey and lint-stage

1. Install Husky (It's the library that will allow running pre-commit actions)

   ```bash
   npm install --save-dev husky
   ```

2. Initialize Husky ()

   ```bash
   npx husky init
   ```

3. Install lint-staged (It's the library that will define the actions to be executed for files that are staged in git.)

   ```bash
   npm install --save-dev lint-staged
   ```

4. Add the following to `package.json`

   ```json
   "lint-staged": {
   	"*.svelte": [
   		"eslint"
   	],
   	"*": [
   		"prettier --write --ignore-unknown --allow-empty"
   	]
   },
   ```

5. Replace the content of `.husky/_/pre-commit` with the following

   ```json
   npx lint-staged
   ```

6. Add the following to `.prettierrc` in the root directory

   ```json
   {
   	"useTabs": true,
   	"tabWidth": 1,
   	"editor.formatOnSave": true,
   	"proseWrap": "never",
   	"requireConfig": false,
   	"singleQuote": true,
   	"semi": true,
   	"bracketSpacing": true,
   	"bracketSameLine": true,
   	"trailingComma": "none",
   	"printWidth": 80,
   	"plugins": ["prettier-plugin-svelte"],
   	"overrides": [
   		{
   			"files": "*.svelte",
   			"options": { "parser": "svelte" }
   		},
   		{
   			"files": "*.json",
   			"options": {
   				"parser": "jsonc",
   				"trailingComma": "none"
   			}
   		},
   		{
   			"files": ".prettierrc",
   			"options": { "parser": "json" }
   		},
   		{
   			"files": ".md",
   			"options": { "parser": "markdown" }
   		}
   	]
   }
   ```

7. Add the following to the vs-code settings

   ```json
   {
   	"prettier.configPath": "",
   	"[js]": {
   		"editor.defaultFormatter": "esbenp.prettier-vscode",
   		"editor.tabSize": 2,
   		"editor.formatOnSave": true
   	},
   	"[json]": {
   		"editor.defaultFormatter": "esbenp.prettier-vscode",
   		"editor.tabSize": 2,
   		"editor.formatOnSave": true
   	},
   	"[svelte]": {
   		"editor.defaultFormatter": "svelte.svelte-vscode",
   		"editor.formatOnSave": true,
   		"editor.codeActionsOnSave": {
   			"source.fixAll": "explicit",
   			"source.organizeImports": "explicit",
   			"source.sortMembers": "explicit"
   		}
   	},
   	// The number of spaces a tab is equal to. This setting is overridden
   	// based on the file contents when `editor.detectIndentation` is true.
   	"editor.tabSize": 2,

   	// Insert spaces when pressing Tab. This setting is overriden
   	// based on the file contents when `editor.detectIndentation` is true.
   	"editor.insertSpaces": true,

   	// When opening a file, `editor.tabSize` and `editor.insertSpaces`
   	// will be detected based on the file contents. Set to false to keep
   	// the values you've explicitly set, above.
   	"editor.detectIndentation": true,
   	"[jsonc]": {
   		"editor.defaultFormatter": "esbenp.prettier-vscode",
   		"editor.tabSize": 2,
   		"editor.formatOnSave": true
   	},
   	"[markdown]": {
   		"editor.defaultFormatter": "esbenp.prettier-vscode",
   		"editor.tabSize": 2,
   		"editor.formatOnSave": true
   	}
   }
   ```

8. Replace content of eslint.config.js with the following

   ```javascript
   import globals from 'globals';
   import svelteParser from 'svelte-eslint-parser';
   export default [
   	// global ignores
   	{
   		// Only lint files in the src folder
   		ignores: ['**', '!src/**', 'src/routes/+layout.js']
   	},
   	{
   		rules: {
   			// Disallow unused variables
   			'no-unused-vars': 'warn',
   			// Disallow the use of undeclared variables unless mentioned in global comments
   			'no-undef': 'error',
   			// Disallow the commiting of console.log but allow console.warn and console.error
   			'no-console': [
   				'error',
   				{
   					allow: ['warn', 'error']
   				}
   			]
   		}
   	},
   	{
   		files: ['**/*.svelte', '*.svelte'],
   		languageOptions: {
   			parser: svelteParser,
   			globals: {
   				...globals.browser
   			}
   		}
   	}
   ];
   ```

### Configure Svelte as a Stratech confic driven SPA

1. `npm install @sveltejs/adapter-static`
2. `npm install @julr/vite-plugin-validate-env`
3. `npm install crypto-js`
4. Create `.env`

   ```bash
   VITE_ENCRYPT_LS="false"
   VITE_ENABLE_REQ_RES_LOGS="false"

   # Can come from npm run arguments and will override these
   VITE_API_KEY="Your personal FE API-Key"
   VITE_FE="local"

   # Should be in the app-config db table
   VITE_APP_NAME= "awe-ma-se-kinders-app"
   VITE_BASEURL= "https://awe-api-dev.stratfin.app"
   VITE_EXP_HEADERS= "x-awe-nonprod-dev-api-expires"
   VITE_SALT= "a uuid to decrypt local storage"
   ```

5. Update the `vite.config.js` to the following

   ```javascript
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
   ```

6. Update the `svelte.config` with the following

   ```javascript
   import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
   import adapter from '@sveltejs/adapter-static';

   export default {
   	kit: {
   		adapter: adapter({
   			fallback: 'index.html'
   		})
   	},
   	preprocess: [vitePreprocess({})]
   };
   ```

7. Create a +layout.js file in the routes folder and add the following

   ```javascript
   export const ssr = false;
   export const csr = true;
   export const prerender = false;
   ```

8. Configure `+layout.js` for reading enviromental variables by adding the following

   ```javascript
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
   ```

9. Create `.github/workflows/deploy-s3.yml` folders and file and add the following

   ```yml
   name: Build & upload to S3
   	run-name: Deploy to ${{ inputs.environment }} by @${{ github.actor }}

   	on:
   	workflow_dispatch:
   		inputs:
   		environment:
   			type: environment
   			default: nonprod-dev
   			required: true
   			description: Select the S3 location

   	jobs:
   	deploy:
   		runs-on: ubuntu-latest
   		environment: ${{ inputs.environment }}

   		strategy:
   		matrix:
   			node-version: [20.x]

   		steps:
   		- name: Check out repository code
   			uses: actions/checkout@v3

   		- name: Log environment
   			env:
   				INPUT_ENV: ${{ inputs.environment }}
   			run: echo "$INPUT_ENV"

   		- name: Configure AWS credentials
   			uses: aws-actions/configure-aws-credentials@v2
   			with:
   				aws-region: ${{ vars.AWS_REGION }}
   				aws-access-key-id: ${{ vars.AWS_ACCESS_KEY_ID }}
   				aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

   		- name: Authenticate to Private Repo
   			env:
   				CI_ACCESS_TOKEN: ${{ secrets.CI_ACCESS_TOKEN }}
   			run: |
   				npm install -g npm-cli-login
   				npm-cli-login -u "stratech-deploy" -p "${CI_ACCESS_TOKEN}" -e "system_admin@stratech.co.za" -r "https://npm.pkg.github.com"

   		- name: Install modules
   			run: npm install --omit=dev --quiet && npm install -g vite

   		- name: Build app
   			run: vite build
   			env:
   				VITE_API_KEY: ${{ vars.API_KEY }}
   				VITE_CONFIG_URL: ${{ vars.CONFIG_URL }}

   		- name: Upload app to S3
   			run: aws s3 sync ./build/ s3://${{ vars.AWS_S3_BUCKET }} --delete

   		- name: Clear Cloudflare cache
   			run: |
   				curl -X POST "https://api.cloudflare.com/client/v4/zones/${{ vars.CF_ZONE }}/purge_cache" \
   					-H "X-Auth-Email: ${{ vars.CF_EMAIL }}" \
   					-H "X-Auth-Key: ${{ secrets.CF_AUTH_KEY }}" \
   					-H "Content-Type: application/json" --data '{"purge_everything":true}'
   ```

### Now add The component library

1. Link to the git [repo](https://github.com/stratech-team/svelte-component-library)
2. Add the following to the `.npmrc` file
   ```json
   @stratech-team:registry=https://npm.pkg.github.com
   ```
3. Install the library from npm (please make sure you are signed in before attempting to install this package)
   ```bash
   npm install @stratech-team/svelte-component-library@x.x.x
   ```
4. Use any components ad follow
   ```javascript
   import {
   	COMPONENT1,
   	COMPONENT2
   } from '@stratech-team/svelte-component-library';
   ```
