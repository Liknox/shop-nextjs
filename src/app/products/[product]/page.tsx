import ProductContent from "@/components/ProductContent"
import { getProduct } from "../../../../lib/shopify"

export default async function Product({ params }: { params: { product: string } }) {
	const product = await getProduct(params.product)

	return (
		<div className="min-h-screen py-12 sm:pt-20">
			<ProductContent product={product} />
		</div>
	)
}
