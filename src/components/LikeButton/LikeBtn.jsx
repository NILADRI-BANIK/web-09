import React, { useState } from "react";
import { useSelector } from "react-redux";
import { redirectToSocialMedia } from "../Hooks/RedirectToSocialMedia";
import axios from "../Hooks/axios";
import HeartUnfilled from "./images/HeartUnfilled.svg";
import HeartFilled from "./images/heartFill.svg";

const LikeBtn = ({ data, Icon, LikeIcon, Text }) => {
	const { userId } = useSelector((state) => state.auth);
	const [isLiked, setIsLiked] = useState(data?.isLiked);
	const [likeCount, setLikeCount] = useState(data?.LikeCount);
	const [disable, setDisable] = useState(false);

	const handelLike = () => {
		if (redirectToSocialMedia()) return window.open(process.env.REACT_APP_SOCIAL_MEDIA_URL, "_self");
		setDisable(true);
		const raw = JSON.stringify({
			userId,
		});

		axios
			.post(`/post/${data._id}/likeANDunlike`, raw, {
				headers: { "Content-Type": "application/json" },
			})
			.then(({ data }) => {
				if (data.message === "Post unliked successfully") setIsLiked(false);
				if (data.message === "Post liked successfully") setIsLiked(true);
				// setIsLiked(data.totalLikes[0].isLike);
				setLikeCount(data.totalLikes[0].LikeCount);
				setDisable(false);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div className={Icon} onClick={handelLike}>
			{isLiked ? <img src={HeartFilled} alt="" className={LikeIcon} /> : <img src={HeartUnfilled} alt="" className={LikeIcon} />}
			<p className={Text}>{likeCount}</p>
		</div>
	);
};

export default LikeBtn;
