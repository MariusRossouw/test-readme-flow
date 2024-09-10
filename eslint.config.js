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
