import ProductList from "../components/ProductList"
import { getProductsInCollection } from "../../lib/shopify"
import Hero from "@/components/Hero"
import { IList } from "@/types"

export default async function Home() {
	const products: IList[] = await getProductsInCollection()
	return (
		<div>
			<Hero />
			<ProductList products={products} />
		</div>
	)
}
