import { ReactNode } from "react"
import { Inter } from "next/font/google"
import Layout from "@/components/Layout"
import ShopProvider from "@/context/shopContext"
import { Metadata } from "next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Modern eCommerce Shop",
	description:
		"Modern eCommerce Development focusing on Shopify, Next.js, Tailwind, GraphQL. Additional topic include Storefront API, Server Site Generation and more...",
	openGraph: {
		title: "Modern eCommerce Shop",
		description:
			"Modern eCommerce Development focusing on Shopify, Next.js, Tailwind, GraphQL. Additional topic include Storefront API, Server Site Generation and more...",
	},
	keywords: [
		"shop",
		"eCommerce",
		"Shopify",
		"Next.js",
		"Next.js 13",
		"Tailwind",
		"GraphQl",
		"Storefront API",
		"Liknox",
		"Nazar Koval",
	],
	creator: "Nazar Koval aka Liknox",
	other: {
		created_By: "Nazar_Koval aka Liknox",
		"og:title": "Modern eCommerce Shop",
		"og:type": "website",
		"og:url": "https://shop-nextjs-sigma.vercel.app/",
		"og:image": "https://shop-nextjs-sigma.vercel.app/share.png",
		"og:description":
			"Modern eCommerce Development focusing on Shopify, Next.js, Tailwind, GraphQL. Additional topic include Storefront API, Server Site Generation and more...",
		"og:locale": "en_US",
		"og:locale:alternate": "uk_UA",
		"og:site_name": "Modern eCommerce Shop",
	},
}

type RootLayoutProps = { children: ReactNode }

export default function RootLayout({ children }: RootLayoutProps) {
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
