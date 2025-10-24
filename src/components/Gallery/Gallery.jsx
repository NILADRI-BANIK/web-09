import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../Hooks/axios";
import styles from "./Gallery.module.scss";
import { defaultPostData } from "../../redux/store";

const Gallery = () => {
	document.documentElement.style.setProperty("--base-font-size", "100%");
	const { userId } = useSelector((state) => state.auth);
	const [postData, setPostData] = useState([]);
	const [width, setWidth] = useState(window.innerWidth);
	const navigate = useNavigate();
	const [activeBtn, setActiveBtn] = useState("post");

	useEffect(() => {
		if (userId === "") return setPostData(defaultPostData);
		axios
			.get(`/post/${userId}`)
			.then(({ data }) => {
				setPostData(data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [userId]);

	useEffect(() => {
		function handelResize() {
			setWidth(window.innerWidth);
		}
		window.addEventListener("resize", handelResize);
		return () => window.removeEventListener("resize", handelResize);
	}, [width]);

	if (width < 1728) document.documentElement.style.setProperty("--base-font-size", "90%");
	if (width < 1500) document.documentElement.style.setProperty("--base-font-size", "80%");
	if (width < 1350) document.documentElement.style.setProperty("--base-font-size", "70%");
	if (width < 1250) document.documentElement.style.setProperty("--base-font-size", "70%");
	if (width < 1150) document.documentElement.style.setProperty("--base-font-size", "65%");
	if (width < 1024) document.documentElement.style.setProperty("--base-font-size", "60%");
	if (width < 900) document.documentElement.style.setProperty("--base-font-size", "55%");
	if (width < 800) document.documentElement.style.setProperty("--base-font-size", "50%");

	let imageCount = 0;
	let videoCount = 0;

	postData.forEach((data) => {
		if (data.mediaType === "image") imageCount = imageCount + 1;
		if (data.mediaType === "video") videoCount = videoCount + 1;
	});

	return (
		<div className={styles.Gallery}>
			<div className={styles.Top}>
				<div className={styles.Left}>
					<h1>My Gallery</h1>

					<div className={styles.ButtonWrapper}>
						<button onClick={() => setActiveBtn("post")} className={activeBtn === "post" ? styles.activeBtn : ""}>
							Post
						</button>
						<button onClick={() => setActiveBtn("video")} className={activeBtn === "video" ? styles.activeBtn : ""}>
							Videos
						</button>
						<button onClick={() => setActiveBtn("tags")} className={activeBtn === "tags" ? styles.activeBtn : ""}>
							Tags
						</button>
						{/* <button onClick={() => setActiveBtn("v-magz")} className={activeBtn === "v-magz" ? styles.activeBtn : ""}>
							V-Magz
						</button> */}
					</div>
				</div>

				<div className={styles.Right} onClick={() => navigate(-1)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
						<path
							d="M20.0747 26.9334C20.4262 26.5818 20.6237 26.105 20.6237 25.6078C20.6237 25.1106 20.4262 24.6338 20.0747 24.2822L10.7934 15.0009L20.0747 5.7197C20.4162 5.36607 20.6052 4.89244 20.6009 4.40082C20.5967 3.9092 20.3995 3.43893 20.0518 3.09129C19.7042 2.74364 19.2339 2.54646 18.7423 2.54218C18.2507 2.53791 17.7771 2.7269 17.4234 3.06845L6.81655 13.6753C6.46504 14.0269 6.26758 14.5038 6.26758 15.0009C6.26758 15.4981 6.46504 15.975 6.81655 16.3266L17.4234 26.9334C17.775 27.285 18.2519 27.4824 18.7491 27.4824C19.2462 27.4824 19.7231 27.285 20.0747 26.9334Z"
							fill="white"
						/>
					</svg>
				</div>
			</div>

			<div className={styles.Container}>
				{activeBtn === "post" ? (
					imageCount === 0 ? (
						<h1>No Images</h1>
					) : (
						postData.map((data, index) => {
							if (data.mediaType === "image")
								return (
									<div key={index} className={styles.postWrapper}>
										<img src={data.mediaUrl} alt="" className={styles.Media} />
									</div>
								);
						})
					)
				) : activeBtn === "video" ? (
					videoCount === 0 ? (
						<h1>No Videos</h1>
					) : (
						postData.map((data, index) => {
							if (data.mediaType === "video")
								return (
									<div key={index} className={styles.postWrapper}>
										<video src={data.mediaUrl} className={styles.Media} controls></video>
									</div>
								);
						})
					)
				) : activeBtn === "tags" ? (
					<h1>Tags Coming Soon...</h1>
				) : activeBtn === "v-magz" ? (
					<h1>V-Magz Coming Soon...</h1>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default Gallery;
