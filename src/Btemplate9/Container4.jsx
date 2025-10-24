import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Btemplate9.module.scss";
import "./Btemplate9.scss";
import leftArrow from "./assets/leftArrow.svg";
import product1 from "./assets/product1.png";
import product2 from "./assets/product2.png";
import product3 from "./assets/product3.png";
import rightArrow from "./assets/rightArrow.svg";
const products = [
	{
		id: 0,
		productName: "Product Name",
		mediaUrl: product1,
		mediaType: "image",
	},
	{
		id: 1,
		productName: "Product Name",
		mediaUrl: product2,
		mediaType: "image",
	},
	{
		id: 2,
		productName: "Product Name",
		mediaUrl: product3,
		mediaType: "image",
	},
	{
		id: 3,
		productName: "Product Name",
		mediaUrl: product1,
		mediaType: "image",
	},
	{
		id: 4,
		productName: "Product Name",
		mediaUrl: product3,
		mediaType: "image",
	},
	{
		id: 5,
		productName: "Product Name",
		mediaUrl: product3,
		mediaType: "image",
	},
	{
		id: 6,
		productName: "Product Name",
		mediaUrl: product3,
		mediaType: "image",
	},
];

const Container4 = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [isAtFirstSlide, setIsAtFirstSlide] = useState(true);
	const [isAtLastSlide, setIsAtLastSlide] = useState(false);
	const swiperRef = useRef(null);

	useEffect(() => {
		function handelResize() {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		}
		window.addEventListener("resize", handelResize);
		return () => window.removeEventListener("resize", handelResize);
	}, [width, height]);
	useEffect(() => {
		const swiper = swiperRef.current;

		if (swiper) {
			swiper.on("slideChange", () => {
				setIsAtFirstSlide(swiper.isBeginning);
				setIsAtLastSlide(swiper.isEnd);
			});
		}
	}, []);
	return (
		<div className={styles.Container4}>
			<>
				<div className={styles.upperSection}>
					<h2>our Products</h2>
					<h4>View All</h4>
				</div>
				<div className={styles.carousel}>
					{width < height ? (
						<>
							<Swiper
								effect={"coverflow"}
								slidesPerView={1.3}
								autoplay={{
									delay: 2500,
									disableOnInteraction: false,
								}}
								coverflowEffect={{
									rotate: 0,
									stretch: 0,
									depth: 100,
									modifier: 1.88,
									slideShadows: false,
								}}
								navigation={{
									prevEl: null,
									nextEl: null,
								}}
								centeredSlides={true}
								spaceBetween={0}
								freeMode={true}
								modules={[Pagination, Autoplay, Navigation, EffectCoverflow]}
								onSwiper={(swiper) => (swiperRef.current = swiper)}
								className="mySwiper">
								{products &&
									products.map((data, index) => (
										<SwiperSlide key={index}>
											<div className={styles.productCard}>
												{data?.mediaType === "video" ? (
													<video src={data?.mediaUrl} className={styles.media} controls></video>
												) : data?.mediaType === "image" ? (
													<img src={data?.mediaUrl} alt="slide_image" className={styles.media} />
												) : (
													""
												)}
											</div>
										</SwiperSlide>
									))}
							</Swiper>
							<div className={styles.navigationButton}>
								<div
									className={`${styles.leftArrow} ${isAtFirstSlide ? styles.inactiveArrow : ""}`}
									onClick={() => swiperRef.current && swiperRef.current.slidePrev()}>
									<img src={leftArrow} alt="" />
								</div>
								<div
									className={`${styles.rightArrow} ${isAtLastSlide ? styles.inactiveArrow : ""}`}
									onClick={() => swiperRef.current && swiperRef.current.slideNext()}>
									<img src={rightArrow} alt="" />
								</div>
							</div>
						</>
					) : (
						<Swiper
							effect={"coverflow"}
							slidesPerView={3}
							autoplay={{
								delay: 2500,
								disableOnInteraction: false,
								reverseDirection: true,
							}}
							coverflowEffect={{
								rotate: 0,
								stretch: 0,
								depth: 80,
								modifier: 2.88,
								slideShadows: false,
							}}
							navigation={true}
							centeredSlides={true}
							spaceBetween={60}
							loop={true}
							freeMode={true}
							modules={[FreeMode, Pagination, Autoplay, Navigation, EffectCoverflow]}
							className="mySwiper">
							{products &&
								products.slice(0, 3).map((data, index) => (
									<SwiperSlide key={index}>
										<div className={styles.productCard}>
											{data?.mediaType === "video" ? (
												<video src={data?.mediaUrl} className={styles.media} controls></video>
											) : data?.mediaType === "image" ? (
												<img src={data?.mediaUrl} alt="slide_image" className={styles.media} />
											) : (
												""
											)}
										</div>
									</SwiperSlide>
								))}
						</Swiper>
					)}
				</div>
			</>
		</div>
	);
};

export default Container4;
