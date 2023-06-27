import Image from "next/image"
import ProductForm from "./ProductForm"

function ProductContent({ product }: any) {
   const imageInfo = product.images.edges[0].node
   
	return (
		<div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
			<div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
				<div className="relative h-96 w-full">
					<Image
						fill
						src={imageInfo.url}
						alt={imageInfo.altText}
						style={{ objectFit: "cover" }}
					/>
				</div>
			</div>
			<ProductForm product={product} />
		</div>
	)
}

export default ProductContent
