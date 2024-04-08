/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: [
		'@repo/eslint-config/next.js',
		'plugin:perfectionist/recommended-natural',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true,
	},
}
