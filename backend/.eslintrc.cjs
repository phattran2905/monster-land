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
		quotes: ["error", "double"],
		"no-tabs": ["error", { allowIndentationTabs: true }],
		indent: ["error", "tab"],
		"no-unused-vars": ["warn"],
	},
}
