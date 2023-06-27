import { Inter } from "next/font/google"
import Layout from "@/components/Layout"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Shopify Shop",
	description: "Created with Shopify, NextJS, Typescript and GraphQL",
	other: { created_By: "Nazar_Koval aka Liknox" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Layout>{children}</Layout>
			</body>
		</html>
	)
}
