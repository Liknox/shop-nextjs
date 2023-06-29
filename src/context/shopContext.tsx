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

	useEffect(() => {
		if (localStorage.checkout_id) {
			const cartObject = JSON.parse(localStorage.checkout_id)

			if (cartObject[0].id) {
				setCart([cartObject[0]])
			} else if (cartObject[0].length > 0) {
				setCart(...[cartObject[0]])
			}

			setCheckoutId(cartObject[1].id)
			setCheckoutUrl(cartObject[1].webUrl)
		}
	}, [])

	async function addToCart(newItem: any) {
		setCartOpen(true)

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

	async function removeCartItem(itemToRemove: any) {
		if (cart.length === 1) {
			setCartOpen(false)
		}

		const updatedCart = cart.filter((item: any) => item.id !== itemToRemove)

		setCart(updatedCart)

		const newCheckout = await updateCheckout(checkoutId, updatedCart)

		localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]))
	}

	return (
		<CartContext.Provider value={{ cart, cartOpen, setCartOpen, addToCart, checkoutUrl, removeCartItem }}>
			{children}
		</CartContext.Provider>
	)
}

const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext }
export default shopContext
