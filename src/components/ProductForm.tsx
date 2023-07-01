import { useContext, useState } from "react"
import ProductOptions from "./ProductOptions"
import { CartContext } from "@/context/shopContext"
import { formatter } from "@/utils/helpers"

import { IIteration, IProduct, SelectedOptionsType } from "@/types"

interface IProductProps {
	product: IProduct
}

function ProductForm({ product }: IProductProps) {
	const { addToCart } = useContext(CartContext)

	const allVariantOptions = product.variants.edges.map(variant => {
		const allOptions: IIteration = {}

		const selectedOptions: SelectedOptionsType[] = variant.node.selectedOptions

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

	const defaultValues: IIteration = {}
	const options = product.options
	options.map(item => {
		defaultValues[item.name] = item.values[0]
	})

	const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
	const [selectedOptions, setSelectedOptions] = useState(defaultValues)

	if (product.options[0].name === "Size") product.options.reverse()

	function setOptions(name: string, value: string) {
		setSelectedOptions(prevState => {
			return { ...prevState, [name]: value }
		})

		const selection: IIteration = {
			...selectedOptions,
			[name]: value,
		}

		allVariantOptions.map(item => {
			if (JSON.stringify(item.options) === JSON.stringify(selection)) {
				setSelectedVariant(item)
			}
		})
	}

	return (
		<div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
			<h2 className="text-2xl font-bold">{product.title}</h2>
			<span className="pb-3">{formatter.format(product.variants.edges[0].node.price.amount)}</span>
			{product.options.map(({ name, values }) => (
				<ProductOptions
					key={`key-${name}`}
					name={name}
					values={values}
					selectedOptions={selectedOptions}
					setOptions={setOptions}
				/>
			))}
			<button
				onClick={() => {
					addToCart(selectedVariant)
				}}
				className="bg-black rounded-lg text-white px-2 py-3 mt-6 hover:bg-gray-800"
			>
				Add To Cart
			</button>
		</div>
	)
}

export default ProductForm
