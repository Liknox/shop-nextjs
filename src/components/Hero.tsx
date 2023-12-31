"use client"

function Hero() {
	const scrollToCertainPoint = (): void => {
		window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
	}

	console.log(
		`%c
888       d8b  888                                  
888       Y8P  888                                  
888            888                                  
888       888  888  888  88888b.    .d88b.   888  888 
888       888  888 .88P  888 "88b  d88""88b  'Y8bd8P' 
888       888  888888K   888  888  888  888    X88K   
888       888  888 "88b  888  888  Y88..88P  .d8""8b. 
88888888  888  888  888  888  888   "Y88P"   888  888`,
		"font-family:monospace; color: orange;"
	)

	return (
		<div
			className="mx-auto max-w-7xl px-4 text-center flex items-center justify-items-center -mt-14"
			style={{ height: "100vh", width: "97vw" }}
		>
			<div className="m-auto">
				<h1 className="font-extrabold text-gray-900">
					<p
						className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-4xl sm:text-6xl md:text-7xl"
						style={{ textShadow: "0px 0px 200px rgba(199,108,209)" }}
					>
						Modern E-Commerce
					</p>
				</h1>
				<h2 className="mt-3 max-w-md mx-auto text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-x-3xl">
					Build the E-Commerce Revolution.
				</h2>
				<div className="mt-5 max-w-md mx-auto flex justify-center items-center md:mt-8">
					<button onClick={scrollToCertainPoint}>
						<div className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium py-3 border-transparent rounded-md text-white bg-gray-900 hover:bg-gray-800">
							Products
						</div>
					</button>
					<a href="https://github.com/Liknox/shop-nextjs" target="_blank" rel="noreferrer">
						<div className="inline-flex items-center font-semibold text-gray-900 hover:text-gray-800">
							GitHub Repo
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default Hero
