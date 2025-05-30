import { ICart, IList, IProduct } from "@/types"

const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query: string, variables: Record<string, any> = {}) {
	const URL = `https://${domain}/api/2023-04/graphql.json`

	const options = {
		method: "POST",
		headers: {
			"X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query, variables }),
	}

	try {
		const response = await fetch(URL, options as RequestInit)

		if (!response.ok) {
			throw new Error(`Network error: ${response.status} ${response.statusText}`)
		}

		const data = await response.json()

		if (data.errors) {
			throw new Error(data.errors[0].message)
		}

		return data
	} catch (err) {
		console.error("Shopify API Error:", err)
		throw new Error("Failed to fetch data from Shopify")
	}
}

export async function getProductsInCollection(): Promise<IList[]> {
	const query = `
    query GetCollectionProducts {
      collectionByHandle(handle: "frontpage") {
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
	return response.data.collectionByHandle.products.edges || []
}

export async function getProduct(handle: string): Promise<IProduct> {
	const query = `
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
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
          edges {
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
          edges {
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

	const variables = { handle }
	const response = await ShopifyData(query, variables)
	return response.data.productByHandle || {}
}

export async function createCheckout(variantId: string, quantity: number) {
	const query = `
    mutation CreateCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
          totalQuantity
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }`

	const variables = {
		lines: [
			{
				merchandiseId: variantId, // FIXED: Use the ID directly without modification
				quantity: parseInt(quantity.toString()),
			},
		],
	}

	const response = await ShopifyData(query, variables)

	if (response.data.cartCreate.userErrors?.length > 0) {
		throw new Error(response.data.cartCreate.userErrors[0].message)
	}

	return {
		id: response.data.cartCreate.cart.id,
		webUrl: response.data.cartCreate.cart.checkoutUrl,
		totalQuantity: response.data.cartCreate.cart.totalQuantity,
	}
}

export async function updateCheckout(cartId: string, lineItems: ICart[]) {
	const query = `
    mutation UpdateCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          lines(first: 25) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }`

	const variables = {
		cartId,
		lines: lineItems.map(item => ({
			merchandiseId: item.id, // FIXED: Use the ID directly without modification
			quantity: parseInt(item.variantQuantity.toString()),
		})),
	}

	const response = await ShopifyData(query, variables)

	if (response.data.cartLinesAdd.userErrors?.length > 0) {
		throw new Error(response.data.cartLinesAdd.userErrors[0].message)
	}

	return {
		id: response.data.cartLinesAdd.cart.id,
		webUrl: response.data.cartLinesAdd.cart.checkoutUrl,
		totalQuantity: response.data.cartLinesAdd.cart.totalQuantity,
	}
}
