import React from "react";
import comment from "../../assets/business/image/comment.svg";
import heart from "../../assets/business/image/heartLike.svg";
import share from "../../assets/business/image/share.svg";
import styles from "../Btemplate9.module.scss";
import "../Btemplate9.scss";

function GalleryCard({ product }) {
	return (
		<div className={styles.galleryCard}>
			<div className={styles.backImage}>
				<img src={product.mediaUrl} alt="" />
			</div>
			<div className={styles.profile} id="profile">
				<div className={styles.profilePic}>
					<img src={product.profilePic} alt="" />
				</div>
				<div className={styles.detail}>
					<h3>{product.name}</h3>
					<h4>{product.userName}</h4>
				</div>
			</div>
			<div className={styles.details} id="details">
				<div className={styles.desc}>{product.postDesc}</div>
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
	);
}

export default GalleryCard;
