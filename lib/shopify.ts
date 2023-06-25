const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query: string) {
	const URL = `https://${domain}/api/2023-04/graphql.json`

	const options = {
		endpoint: URL,
		method: "POST",
		headers: {
			"X-Shopify-Storefront-Access-Token": storefrontAccessToken,
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query }),
	}

	try {
		const data = await fetch(URL, options as RequestInit).then(res => res.json())
		return data
	} catch (err) {
		throw new Error("Products not fetched")
	}
}

export async function getProductsInCollection() {
	const query = `
   {
      collectionByHandle (handle: "frontpage") {
         title
         products(first: 25) {
            edges {
               node {
                  id
                  title
                  handle
                  priceRange {
                     minVariantPrice {
                        amount
                     }
                  }
                  images(first: 5) {
                     edges {
                        node {
                           url
                           altText
                        }
                     }
                  }
               }
            }
         }
      }
   }
   `

	const response = await ShopifyData(query)
	const allProducts = response.data.collectionByHandle.products.edges ? response.data.collectionByHandle.products.edges : []

	return allProducts
}
