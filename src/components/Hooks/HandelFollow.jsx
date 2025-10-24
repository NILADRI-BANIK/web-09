import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//! use this in other component and pass in this function when you call this
//const [followData, setFollowData] = useState("Follow");

export const HandelFollow = ({ setFollowData }) => {
	const { userId, currentUserId, currentUser } = useSelector((state) => state.auth);
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
				console.log(data);
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
};
