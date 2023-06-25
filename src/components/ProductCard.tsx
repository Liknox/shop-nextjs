import Link from "next/link"
import Image from "next/image"

function ProductCard({ product }: any) {
	const { title, handle } = product.node

	const { altText, url } = product.node.images.edges[0].node

	return (
		<div>
			<Link href={`/product/${handle}`}>
				<div className="group">
					<div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
						<div className="relative group-hover:opacity-75 h-72">
							<Image src={url} alt={altText} fill style={{objectFit:"cover"}} />
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default ProductCard
