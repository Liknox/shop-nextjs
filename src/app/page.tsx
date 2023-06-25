import ProductList from "../components/ProductList"
import { getProductsInCollection } from "../../lib/shopify"

export default async function Home() {
	const products = await getProductsInCollection()
	return (
		<div className="text-lg">
			<ProductList products={products} />
		</div>
	)
}
