module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: "airbnb-base",
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		semi: ["off"],
		"no-console": ["error"],
		quotes: ["error", "double"],
		"no-tabs": ["error", { allowIndentationTabs: true }],
		indent: ["error", "tab"],
		"no-unused-vars": ["warn"],
		"import/extensions": ["off"],
		"comma-dangle": ["off"],
		"import/no-extraneous-dependencies": ["off"],
	},
}
