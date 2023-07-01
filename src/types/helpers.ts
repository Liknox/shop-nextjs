interface IPrice {
	amount: number
}

interface IEdges<T> {
	edges: T[]
}

interface INodeImage {
	url: string
	altText: string
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
		image: INodeImage
		price: IPrice
		selectedOptions: INodeOptions[]
	}
}