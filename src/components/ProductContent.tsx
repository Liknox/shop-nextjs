"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"
import ProductForm from "./ProductForm"

import "swiper/swiper.min.css"
import "swiper/css/navigation"
import "swiper/css/pagination"
function ProductContent({ product }: any) {
	const imageInfo = product.images.edges[0].node
	const images: any[] = []

	product.images.edges.map((image: any, i: any) => {
		images.push(
			<SwiperSlide key={`slide-${i}`}>
				<Image src={image.node.url} alt={image.node.altText} fill style={{ objectFit: "cover" }}></Image>
			</SwiperSlide>
		)
	})

	return (
		<div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
			<div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
				{/* <Image fill src={imageInfo.url} alt={imageInfo.altText} style={{ objectFit: "cover" }} /> */}
				{/* <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="h-96 rounded-2xl" loop>
					</Swiper> */}
				<div className="relative h-96 w-full">
					<Swiper
						// @ts-ignore
						style={{ "--swiper-navigation-color": "#000", "--swiper-pagination-color": "#000" }}
						className="h-96 rounded-2xl "
						modules={[Navigation, Pagination]}
						spaceBetween={0}
						loop
						navigation
						pagination={{ clickable: true }}
						slidesPerView={1}
						effect={"coverflow"}
						grabCursor={false}
						coverflowEffect={{
							rotate: 0,
							stretch: 0,
							depth: 100,
							modifier: 2.5,
						}}
					>
						{images}
					</Swiper>
				</div>
			</div>
			<ProductForm product={product} />
		</div>
	)
}

export default ProductContent
