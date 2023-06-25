function Product({ params }: { params: { product: string } }) {
	return <div>Id {params.product}</div>
}

export default Product