import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { socket } from "../../socket";
import axios from "../Hooks/axios";
import Logo from "./Logo.png";
import styles from "./Rating.module.scss";

const Rating = ({ setShowRating, setRatingData }) => {
	const { userId, currentUserId, currentUser } = useSelector((state) => state.auth);
	const [hoverIndex, setHoverIndex] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);

	const handelRating = (rating) => {
		let sd = {
			notification_from: currentUserId,
			notification_to: userId,
			notification: {},
			title: "Persona Rating",
			message: `${currentUser?.displayName || currentUser?.username} rated your persona`,
		};

		setActiveIndex(rating);
		var raw = JSON.stringify({
			rating: rating,
		});

		axios
			.post(`/auth/rating?userId=${userId}`, raw, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(({ data }) => {
				console.log(data);
				setRatingData(data.averageRating);
				toast.success("Rating Successful");
				setShowRating(false);
				socket.emit("notification", sd);
			})
			.catch((e) => console.log(e));
	};

	return (
		<div className={styles.RatingWrapper} onClick={() => setShowRating(false)}>
			<div className={styles.RatingContainer} onClick={(e) => e.stopPropagation()}>
				<button className={styles.CrossBtn} onClick={() => setShowRating(false)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
						<path
							d="M12.6675 11.6252L17.8658 6.42676L19.3511 7.912L14.1528 13.1104L19.3511 18.3087L17.8658 19.7939L12.6675 14.5956L7.46913 19.7939L5.98389 18.3087L11.1823 13.1104L5.98389 7.912L7.46913 6.42676L12.6675 11.6252Z"
							fill="#E3E3E3"
						/>
					</svg>
				</button>

				<div className={styles.LogoWrapper}>
					<img src={Logo} alt="" />
				</div>

				<h3>Rate Us</h3>

				<div className={styles.StarContainer}>
					<FaStar
						color={hoverIndex >= 1 || activeIndex >= 1 ? "#FFA959" : "#AFABAB"}
						onMouseEnter={() => setHoverIndex(1)}
						onMouseLeave={() => setHoverIndex(0)}
						onClick={() => handelRating(1)}
					/>
					<FaStar
						color={hoverIndex >= 2 || activeIndex >= 2 ? "#FFA959" : "#AFABAB"}
						onMouseEnter={() => setHoverIndex(2)}
						onMouseLeave={() => setHoverIndex(0)}
						onClick={() => handelRating(2)}
					/>
					<FaStar
						color={hoverIndex >= 3 || activeIndex >= 3 ? "#FFA959" : "#AFABAB"}
						onMouseEnter={() => setHoverIndex(3)}
						onMouseLeave={() => setHoverIndex(0)}
						onClick={() => handelRating(3)}
					/>
					<FaStar
						color={hoverIndex >= 4 || activeIndex >= 4 ? "#FFA959" : "#AFABAB"}
						onMouseEnter={() => setHoverIndex(4)}
						onMouseLeave={() => setHoverIndex(0)}
						onClick={() => handelRating(4)}
					/>
					<FaStar
						color={hoverIndex >= 5 || activeIndex >= 5 ? "#FFA959" : "#AFABAB"}
						onMouseEnter={() => setHoverIndex(5)}
						onMouseLeave={() => setHoverIndex(0)}
						onClick={() => handelRating(5)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Rating;
