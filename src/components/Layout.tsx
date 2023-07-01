import Nav from "./Nav"
import Footer from "./Footer"
import { IChildrenProps } from "@/types"

function Layout({ children }: IChildrenProps) {
	return (
		<div className="flex flex-col justify-between min-h-screen">
			<Nav />
			<main>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
