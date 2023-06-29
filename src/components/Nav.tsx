"use client"

import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "@/context/shopContext"
import MiniCart from "./MiniCart"

function Nav() {
	const { cart, cartOpen, setCartOpen } = useContext(CartContext)

	let cartQuantity = 0
	cart.map((item: any) => {
		return (cartQuantity += item?.variantQuantity)
	})

	return (
		<header className="border-b sticky top-0 z-20 bg-white">
			<div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
				<Link href="/" passHref>
					<div>
						<span className="text-lg pt-1 font-bold">Shopify + Next.js</span>
					</div>
				</Link>
				<a onClick={() => setCartOpen(!cartOpen)} className="text-md font-bold cursor-pointer">
					Cart ({cartQuantity})
				</a>
				<MiniCart cart={cart} />
			</div>
		</header>
	)
}

export default Nav
