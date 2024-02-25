const Footer = () => {
	const year = new Date().getFullYear()
	return (
		<footer className="bg-Indigo-Blue text-center text-white p-2">
			Copyright &copy; {year} Phat Tran
		</footer>
	)
}
export default Footer
