import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { redirectToSocialMedia } from "../Hooks/RedirectToSocialMedia";
import axios from "../Hooks/axios";

// from website i need this for navigation     window.AppBridge.postMessage("backToAppChat:2");
const MessageButton = ({ className }) => {
	const { userId, user, currentUserId } = useSelector((state) => state.auth);
	const handelMessage = () => {
		if (redirectToSocialMedia()) return window.open(process.env.REACT_APP_SOCIAL_MEDIA_URL, "_self");
		if (userId === currentUserId) {
			if (window.AppBridge && typeof window.AppBridge.postMessage === "function") {
				let redirected = false;

				window.AppBridge.postMessage(`backToAppChatUser:${currentUserId}`);

				// Set a timeout for fallback
				setTimeout(() => {
					if (!redirected) {
						window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/Chat`, "_self");
					}
				}, 500); // Adjust delay if needed

				// Detect if the page becomes hidden (app likely handled redirect)
				const handleVisibilityChange = () => {
					if (document.hidden) {
						redirected = true;
						document.removeEventListener("visibilitychange", handleVisibilityChange);
					}
				};

				document.addEventListener("visibilitychange", handleVisibilityChange);
			} else {
				// Fallback immediately if AppBridge is not available
				window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/Chat`, "_self");
			}
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
						if (e.response.data.message === "Request already exists") {
							toast.info(`Request already send ! Please Wait for ${user?.username} to respond`);
						}
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
								if (window.AppBridge && typeof window.AppBridge.postMessage === "function") {
									let redirected = false;

									window.AppBridge.postMessage(`backToAppChatUser:${currentUserId}`);

									// Set a timeout to fallback if not redirected
									setTimeout(() => {
										if (!redirected) {
											window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/Chat/${index}`, "_self");
										}
									}, 500); // Adjust delay as needed

									// Monitor if the page was hidden (indicating app switch)
									const handleVisibilityChange = () => {
										if (document.hidden) {
											redirected = true;
											document.removeEventListener("visibilitychange", handleVisibilityChange);
										}
									};

									document.addEventListener("visibilitychange", handleVisibilityChange);
								} else {
									// Fallback immediately if AppBridge not available
									window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/Chat/${index}`, "_self");
								}
							}

						});
					});
				})
				.catch(({ response: { data } }) => {
					console.log(data);
				});
		};
	};

	return (
		<button onClick={() => handelMessage()} className={className}>
			Message
		</button>
	);
};

export default MessageButton;
