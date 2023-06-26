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
	const allProducts = response.data.collectionByHandle.products.edges ? response.data.collectionByHandle.products.edges : []

	return allProducts
}

export async function getAllProducts() {
	const query = `
   {
      products(first: 250) {
         edges {
            node {
               handle
               id
            }
         }
      }
   }`

   const response = await ShopifyData(query)
   const slugs = response.data.products.edges ? response.data.products.edges : []

   return slugs
}

export async function getProduct(handle: any) {
   const query = `
   {
      productByHandle(handle: "${handle}") {
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