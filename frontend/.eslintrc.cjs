module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["plugin:react/recommended", "airbnb"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "plugin:react/jsx-runtime"],
	rules: {
		semi: ["off"],
		quotes: ["error", "double"],
		"no-tabs": ["error", { allowIndentationTabs: true }],
		indent: ["error", "tab"],
		"react/jsx-indent": ["error", "tab"],
		"no-unused-vars": ["warn"],
		"comma-dangle": ["off"],
	},
}
