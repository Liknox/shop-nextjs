import { Inter } from "next/font/google"
import Layout from "@/components/Layout"
import ShopProvider from "@/context/shopContext"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Modern eCommerce Shop",
	description:
		"Modern eCommerce Development focusing on Shopify, Next.js, Tailwind, GraphQL. Additional topic include Storefront API, Server Site Generation and more...",
	openGraph: {
		title: "Modern eCommerce Shop",
		description:
			"Modern eCommerce Development focusing on Shopify, Next.js, Tailwind, GraphQL. Additional topic include Storefront API, Server Site Generation and more...",
	},
	other: {
		created_By: "Nazar_Koval aka Liknox",
		"og:title": "Modern eCommerce Shop",
		"og:type": "website",
		"og:url": "https://shop-nextjs-sigma.vercel.app/",
		"og:image": "https://shop-nextjs-sigma.vercel.app/share.png",
		"og:description": "Modern eCommerce Development focusing on Shopify, Next.js, Tailwind, GraphQL. Additional topic include Storefront API, Server Site Generation and more...",
		"og:locale": "en_US",
		"og:locale:alternate": "uk_UA",
		"og:site_name": "Modern eCommerce Shop",
	},
}

export default function RootLayout({ children }: any) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ShopProvider>
					<Layout>{children}</Layout>
				</ShopProvider>
			</body>
		</html>
	)
}
