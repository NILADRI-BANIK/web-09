import { useSelector } from "react-redux";

export const HandelMessage = () => {
	const { userId, user, currentUserId } = useSelector((state) => state.auth);

	if (userId === currentUserId) {
		window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/Chat`, "_self");
	} else {
		axios.get(`/conversations/find/${userId}/${currentUserId}`).then(({ data }) => {
			if (data === null) {
				createConversations();
			} else {
				chatPageRouting();
			}
		});
	}

	const createConversations = () => {
		const raw = JSON.stringify({
			senderId: currentUserId,
			receiverId: userId,
		});

		if (user?.is_private === "Yes") {
			axios
				.post("/chat_setting/createRequest", raw, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(({ data }) => {
					toast.success(`Message Request Send Successfully to ${user?.username}`);
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			axios
				.post("/conversations/", raw, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(({ data }) => {
					chatPageRouting();
				})
				.catch(({ response: { data } }) => {
					console.log(data);
				});
		}
	};

	const chatPageRouting = () => {
		axios
			.get(`/conversations/${currentUserId}`)
			.then(({ data }) => {
				data.forEach((data, index) => {
					data.data.members.filter((id) => {
						if (id === userId) {
							window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/Chat/${index}`, "_self");
						}
					});
				});
			})
			.catch(({ response: { data } }) => {
				console.log(data);
			});
	};
};


