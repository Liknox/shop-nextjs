import { ReactNode, SetStateAction } from "react"

export interface IImage {
	node: { url: string; altText: string }
}

export interface IChildrenProps {
	children: ReactNode
}

export interface SelectedOptionsType {
	name: string
	value: string
}

export interface IIteration {
	[key: string]: string
}

export interface IProduct {
	description: string
	handle: string
	id: string
	title: string
	collections: ICollections
	images: IEdges<IImage>
	options: IOptions[]
	variants: IEdges<INode>
}

interface ICollections {
	edges: {
		node: {
			products: {
				edges: IList[]
			}
		}
	}[]
}

export interface IListProduct extends Pick<IProduct, "handle" | "id" | "images" | "title"> {
	priceRange: {
		minVariantPrice: {
			amount: number
		}
	}
}

export interface IProductList {
	products: {
		node: IListProduct
	}[]
}
export interface IList {
	node: IListProduct
}

export interface ICartProps extends ICartWOptions {
	options: { [key: string]: string }
}

// HACK: Context file

export interface ICart extends ICartWOptions {
	options: IIteration
}

export interface IContext {
	cart: ICart[]
	cartOpen: boolean
	checkoutUrl: string
	setCartOpen: (value: SetStateAction<boolean>) => void
	addToCart: (newItem: ICart) => void
	removeCartItem: (itemToRemove: string) => void
}
