import { getProductsInCollection } from "../../lib/shopify"

export default async function Home() {
   const products = await getProductsInCollection()
	return <div className="text-lg"></div>
}
