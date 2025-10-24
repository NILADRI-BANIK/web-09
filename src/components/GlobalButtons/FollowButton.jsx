import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../App";
import { fetchCurrentData } from "../../redux/slice/authSlice";
import { redirectToSocialMedia } from "../Hooks/RedirectToSocialMedia";
import axios from "../Hooks/axios";

const FollowButton = ({ className, type }) => {
	const { userId, user, currentUserId, currentUser, width, height } = useSelector((state) => state.auth);
	const [followData, setFollowData] = useState("Follow");
	const dispatch = useDispatch();

	useEffect(() => {
		if (currentUser === null) return;
		const result = currentUser?.followingData?.filter((id) => {
			if (id === userId) return true;
		});
		if (result?.length === 1) setFollowData("Following");
		else setFollowData("Follow");
	}, [currentUser]);

	const handelFollow = () => {
		if (redirectToSocialMedia()) {
			if (window.AppBridge && typeof window.AppBridge.postMessage === "function") {
				let redirected = false;

				window.AppBridge.postMessage("goToFollowingList");

				// Start fallback timer
				setTimeout(() => {
					if (!redirected) {
						window.open(process.env.REACT_APP_SOCIAL_MEDIA_URL, "_self");
					}
				}, 500); // Adjust delay if needed

				// Detect if app navigated away (e.g., via visibility change)
				const handleVisibilityChange = () => {
					if (document.hidden) {
						redirected = true;
						document.removeEventListener("visibilitychange", handleVisibilityChange);
					}
				};

				document.addEventListener("visibilitychange", handleVisibilityChange);
			} else {
				// Fallback if AppBridge is not available
				window.open(process.env.REACT_APP_SOCIAL_MEDIA_URL, "_self");
			}

			return;
		}

		let sd = {
			notification_from: currentUserId,
			notification_to: userId,
			notification: {},
			title: "Follow",
			message: `${currentUser.displayName || currentUser.username} started following you`,
		};

		const raw = JSON.stringify({
			following: userId,
		});
		axios
			.post(`/auth/follow`, raw, {
				headers: { "Content-Type": "application/json" },
			})
			.then(({ data }) => {
				if (data.message === "follow") {
					setFollowData("Following");
					socket.emit("notification", sd);
				}
				if (data.message === "unfollow") setFollowData("Follow");
				dispatch(fetchCurrentData(currentUserId));
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<>
			{type === "type1" ? (
				<button onClick={handelFollow}>
					{followData === "Follow" ? (
						<>
							<span style={{ color: "red" }}>Fol</span>low
						</>
					) : (
						<>
							<span style={{ color: "red" }}>Follo</span>wing
						</>
					)}
				</button>
			) : (
				<button onClick={handelFollow} className={className}>
					{followData}
				</button>
			)}
		</>
	);
};

export default FollowButton;
