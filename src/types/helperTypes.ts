interface IPrice {
	amount: number
}

interface IEdges<T> {
	edges: T[]
}

interface IOptions {
	name: string
	id: string
	values: string[]
}
interface INodeOptions {
	name: string
	value: string
}

interface INode {
	node: {
		id: string
		title: string
		image: {
			url: string
			altText: string
		}
		price: IPrice
		selectedOptions: INodeOptions[]
	}
}

interface ICartWOptions {
	id: string
	title: string
	handle: string
	image: string
	variantTitle: string
	variantPrice: number
	variantQuantity: number
}
