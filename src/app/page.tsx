import ProductList from "../components/ProductList"
import { getProductsInCollection } from "../../lib/shopify"
import Hero from "@/components/Hero"

export default async function Home() {
	const products = await getProductsInCollection()
	return (
		<div className="">
			<Hero />
			<ProductList products={products} />
		</div>
	)
}
