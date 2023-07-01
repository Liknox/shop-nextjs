import { IProduct } from "@/types"

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
   }`

	const response = await ShopifyData(query)
	const allProducts = response.data.collectionByHandle.products.edges
		? response.data.collectionByHandle.products.edges
		: []

	return allProducts
}

export async function getProduct(handle: string): Promise<IProduct | any[]> {
	const query = `
   {
      productByHandle(handle: "${handle}") {
         collections(first: 1) {
            edges {
               node {
                  products(first: 5) {
                     edges {
                        node {
                           priceRange {
                              minVariantPrice {
                                 amount
                              }
                           }
                           handle
                           title
                           id
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
         }
         id
         title
         handle
         description
         images(first: 5) {
            edges{
               node {
                  url
                  altText
               }
            }
         }
         options {
            name
            values
            id
         }
         variants(first: 25) {
            edges{
               node {
                  selectedOptions {
                     name
                     value
                  }
                  image {
                     url
                     altText
                  }
                  title
                  id
                  price {
                     amount
                  }
               }
            }
         }
      }
   }`

	const response = await ShopifyData(query)
	const product = response.data.productByHandle ? response.data.productByHandle : []

	return product
}

export async function createCheckout(id: any, quantity: any) {
	const query = `
   mutation {
      checkoutCreate (input: {
         lineItems: [{variantId: "${id}", quantity: ${quantity}}]
      }) {
         checkout {
            id
            webUrl
         }  
      }
   }`

	const response = await ShopifyData(query)

	const checkout = response.data.checkoutCreate.checkout ? response.data.checkoutCreate.checkout : []
	return checkout
}

export async function updateCheckout(id: any, lineItems: any[]) {
	const lineItemsObject = lineItems.map(item => {
		return `{
         variantId: "${item.id}",
         quantity: ${item.variantQuantity}
      }`
	})

	const query = `
   mutation {
      checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
         checkout {
            id
            webUrl
            lineItems(first: 25) {
               edges {
                  node {
                     id
                     title
                     quantity
                  }
               }
            }
         }  
      }
   }`

	const response = await ShopifyData(query)
	const checkout = response.data.checkoutLineItemsReplace.checkout
		? response.data.checkoutLineItemsReplace.checkout
		: []

	return checkout
}
