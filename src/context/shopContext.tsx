"use client"
import { createContext, useState, useEffect } from "react"
import { createCheckout, updateCheckout } from "../../lib/shopify"

const CartContext = createContext<any>(null)

/* eslint-disable react-hooks/rules-of-hooks */
function shopContext({ children }: any) {
	const [cart, setCart] = useState<any>([])
	const [cartOpen, setCartOpen] = useState<boolean>(false)
	const [checkoutId, setCheckoutId] = useState<any>("")
	const [checkoutUrl, setCheckoutUrl] = useState<any>("")

   console.log(cart)
   

	async function addToCart(newItem: any) {
		if (cart.length === 0) {
			setCart([newItem])

			const checkout = await createCheckout(newItem.id, newItem.variantQuantity)

			setCheckoutId(checkout.id)
			setCheckoutUrl(checkout.webUrl)

			localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]))
		} else {
			let newCart = [...cart]
			cart.map((item: any) => {
				if (item.id === newItem.id) {
					item.variantQuantity++
					newCart = [...cart]
				} else {
					newCart = [...cart, newItem]
				}
			})

			setCart(newCart)
			const newCheckout = await updateCheckout(checkoutId, newCart)
			localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))
		}
	}

	return (
		<CartContext.Provider value={{ cart, cartOpen, setCartOpen, addToCart, checkoutUrl }}>
			{children}
		</CartContext.Provider>
	)
}

const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext }
export default shopContext
