import React, { useEffect, useRef, useState } from "react";
import comment from "../../assets/business/image/comment.svg";
import heart from "../../assets/business/image/heartLike.svg";
import share from "../../assets/business/image/share.svg";
import styles from "../Btemplate9.module.scss";

function MobileGallery({ posts }) {
	const [activePostIndex, setActivePostIndex] = useState(0);
	const allItemsRef = useRef(null);
	const autoplayIntervalRef = useRef(null);

	const handleNext = () => {
		const nextIndex = (activePostIndex + 1) % posts.length;
		setActivePostIndex(nextIndex);
	};

	const handlePrev = () => {
		const prevIndex = (activePostIndex - 1 + posts.length) % posts.length;
		setActivePostIndex(prevIndex);
	};

	const activePost = posts[activePostIndex];

	useEffect(() => {
		startAutoplay();
		return stopAutoplay;
	}, [activePostIndex]);

	const startAutoplay = () => {
		autoplayIntervalRef.current = setInterval(() => {
			handleNext();
		}, 3000);
	};

	const stopAutoplay = () => {
		clearInterval(autoplayIntervalRef.current);
	};

	const handleMouseEnter = () => {
		stopAutoplay();
	};

	const handleMouseLeave = () => {
		startAutoplay();
	};

	useEffect(() => {
		scrollToActiveItem();
	}, [activePostIndex]);

	const scrollToActiveItem = () => {
		const containerWidth = allItemsRef.current.offsetWidth;
		const scrollOffset = 52;

		if (activePostIndex === 0) {
			allItemsRef.current.scrollLeft = 0;
		} else {
			allItemsRef.current.scrollLeft = (activePostIndex * scrollOffset * containerWidth) / 100;
		}
	};

	return (
		<>
			<div className={styles.MobileGallery}>
				<div className={styles.activeItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<div className={styles.backImage}>
						<img src={activePost.mediaUrl} alt="" />
					</div>
					<div className={styles.profile}>
						<div className={styles.profileImage}>
							<img src={activePost.profilePic} alt="" />
						</div>
						<div className={styles.detail}>
							<h3>{activePost.name}</h3>
							<h4>{activePost.userName}</h4>
						</div>
					</div>
					<div className={styles.details}>
						<div className={styles.desc}>{activePost.postDesc}</div>
						<div className={styles.actions}>
							<div className={styles.like}>
								<img src={heart} alt="" />
								<p>20</p>
							</div>
							<div className={styles.comment}>
								<img src={comment} alt="" />
								<p>03</p>
							</div>
							<div className={styles.share}>
								<img src={share} alt="" />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.allItems} ref={allItemsRef}>
					{posts &&
						posts.map((post, index) => (
							<div className={styles.smallCard} key={index}>
								<img src={post.mediaUrl} alt="" onClick={() => setActivePostIndex(index)} />
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export default MobileGallery;
