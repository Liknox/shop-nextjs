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
	collections: any
	images: IEdges<INodeImage>
	options: IOptions[]
	variants: IEdges<INode>
}

