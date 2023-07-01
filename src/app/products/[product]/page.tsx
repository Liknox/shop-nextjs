import ProductContent from "@/components/ProductContent"
import { getProduct } from "../../../../lib/shopify"

interface IProductProps {
	params: { product: string }
}

export default async function Product({ params }: IProductProps) {
	const product: any | any[] = await getProduct(params.product)
	return (
		<div className="min-h-screen py-12 sm:pt-20">
			<ProductContent product={product} />
		</div>
	)
}
