import { ReactNode } from "react"
import Nav from "./Nav"
import Footer from "./Footer"

function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col justify-between min-h-screen">
			<Nav />
			<main>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
