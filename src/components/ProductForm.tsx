"use client"

import { formatter } from "@/utils/helpers"
import { useContext, useState } from "react"

function ProductForm({ product }: any) {
	const allVariantOptions = (product.variants.edges as any[])?.map(variant => {
		const allOptions: any = {}

		const selectedOptions: any[] = variant.node.selectedOptions

		selectedOptions.map(item => {
			allOptions[item.name] = item.value
		})

		const point = variant.node

		return {
			id: point.id,
			title: product.title,
			handle: product.handle,
			image: point.image?.url,
			options: allOptions,
			variantTitle: point.title,
			variantPrice: point.price.amount,
			variantQuantity: 1,
		}
	})

	const defaultValues: any = {}
	const options: any[] = product.options
	options.map(item => {
		defaultValues[item.name] = item.values[0]
	})

	const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
	const [selectedOptions, setSelectedOptions] = useState(defaultValues)

	return (
		<div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
			<h2 className="text-2xl font-bold">{product.title}</h2>
			<span className="pb-6">{formatter.format(product.variants.edges[0].node.price.amount)}</span>
			{(product.options as any[]).map(({ name, values }) => 123)}
		</div>
	)
}

export default ProductForm
