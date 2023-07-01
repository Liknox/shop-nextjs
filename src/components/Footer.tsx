interface INavigation {
	[key: string]: string
}

const navigation: INavigation[] = [
	{ name: "About", href: "#" },
	{ name: "Jobs", href: "#" },
	{ name: "Shop", href: "#" },
	{ name: "Terms and Conditions", href: "#" },
]

function Footer() {
	return (
		<footer className="bg-white">
			<div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
				<nav className="flex flex-wrap justify-center">
					{navigation.map((item, i) => (
						<div key={i} className="px-6 py-2">
							<a href={item.href} className="text-gray-500 hover:text-gray-900">
								{item.name}
							</a>
						</div>
					))}
				</nav>
				<p className="mt-8 text-center text-gray-500">
					&copy; {new Date().getFullYear()} Shopify Next.js 13. All rights reserved.{" "}
					<span className="text-gray-500">
						<a href="https://github.com/Liknox/shop-nextjs" target="_blank" rel="noreferrer">
							Repo.
						</a>
					</span>
				</p>
			</div>
		</footer>
	)
}

export default Footer
