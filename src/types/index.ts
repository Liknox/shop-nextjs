export interface IAllOptions {
	[key: string]: string
}

export interface IProduct {
	description: string
	handle: string
	id: string
	title: string
	collections: any
	images: IEdges<INodeImage>
	options: IOptions[]
	variants: IEdges<INode>
}

export interface IAllVariantOptions extends Pick<IProduct, "id" | "title" | "handle"> {
	image: string
	options: IAllOptions
	variantPrice: number
	variantQuantity: number
	variantTitle: string
}
