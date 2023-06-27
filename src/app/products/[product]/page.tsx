import { getProduct } from "../../../../lib/shopify"

export default async function Product({ params }: { params: { product: string } }) {
	const product = await getProduct(params.product)
	return <div>{product.title}</div>
}