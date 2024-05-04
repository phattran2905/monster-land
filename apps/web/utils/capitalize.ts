export const capitalize = (str?: string) => {
	if (!str) return ''

	const [firstChar, ...rest] = str

	return [firstChar?.toUpperCase(), ...rest].join('')
}
