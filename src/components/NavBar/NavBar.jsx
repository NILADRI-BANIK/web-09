import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setWaitingPer, updateTemplateData } from "../../redux/slice/authSlice";
import { setPositionEdit } from "../../redux/slice/tempSlice";
import axios from "../Hooks/axios";
import styles from "./NavBar.module.scss";
import QR from "./QR";

const NavBar = ({ editable, setEditable, showNav, setShowNav, templateUpdatedData }) => {
	const { userId, currentUserId, token, templateId, templateUserId, isWaiting, waitingPer } = useSelector((state) => state.auth);
	const { isEditingOpen } = useSelector((s) => s.temp);
	const dispatch = useDispatch();
	const [QRShow, setQRShow] = useState(false);
	const [QRData, setQRData] = useState("");
	const size = window.innerWidth;

	const handelEditButton = () => {
		// setShowNav(false);
		axios
			.get(`/persona/user-template/${userId}`)
			.then(({ data }) => {
				setEditable(false);
				if (data[0].previousTemplateData) dispatch(updateTemplateData(data[0].previousTemplateData));
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handelSaveChanges = () => {
		if (isEditingOpen) return toast.warn("Please Complete Your Editing First !!");
		if (isWaiting) return toast.warn("Please Wait !!");
		var raw = JSON.stringify({
			userId,
			templateId,
			previousTemplateData: {
				...templateUpdatedData,
			},
		});
		console.log(templateUpdatedData);

		axios
			.put(`/persona/user-template/${templateUserId}`, raw, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(({ data }) => {
				// if (data.finalTemplateData) dispatch(updateTemplateData(data?.finalTemplateData));
				// window.location.reload();
				// setEditable(true);
				// setShowNav(false);
				toast.success("Changes Save Successfully");
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handelUpdateBio = (bio) => {
		axios
			.post(`/auth/update-user-bio`, {
				bio,
			})
			.then(({ data }) => {})
			.catch((e) => {
				console.log(e);
			});
	};

	const handelPublish = () => {
		if (isEditingOpen) return toast.warn("Please Complete Your Editing First !!");
		if (isWaiting) return toast.warn("Please Wait !!");

		var raw = JSON.stringify({
			userId,
			templateId,
			finalTemplateData: {
				...templateUpdatedData,
			},
			previousTemplateData: {
				...templateUpdatedData,
			},
		});

		handelUpdateBio(templateUpdatedData.introText);

		axios
			.put(`/persona/user-template/${templateUserId}`, raw, {
				headers: {
					"Content-Type": "application/json",
				},
				onUploadProgress: (progressEvent) => {
					const progress = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
					dispatch(setWaitingPer(progress));
				},
			})
			.then(({ data }) => {
				dispatch(updateTemplateData(data.finalTemplateData));
				setEditable(true);
				setShowNav(false);
				toast.success("Your Changes Publish Successfully");
				dispatch(setWaitingPer(0));
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handelEditBack = () => {
		axios
			.get(`/persona/user-template/${userId}`)
			.then(({ data }) => {
				setEditable(true);
				dispatch(setPositionEdit(false));
				if (data[0].finalTemplateData) dispatch(updateTemplateData(data[0].finalTemplateData));
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handelSharePersona = () => {
		setQRShow(true);
		const baseUrl = window.location.origin;

		// setQRData(`${"http://persona.emagz.live"}/${userId}/${"currentUserId"}/${token}`);
		setQRData(`${baseUrl}/${userId}/${"currentUserId"}/${token}`);
	};

	const openViewPopup = (width, height, viewMode) => {
		const baseUrl = window.location.origin;
		const pathname = window.location.pathname.split("/")[1];
		const left = (window.innerWidth - width) / 2;
		const top = (window.innerHeight - height) / 2;

		let newWindow = window.open(
			`${baseUrl}/${currentUserId}/${pathname}/${token}/${viewMode}`,
			"PersonaMobileView",
			`toolbar=0,titlebar=0,location=0,status=0,menubar=0,resizable=0,left=${left},top=${top},width=${width},height=${height}`
		);

		newWindow.addEventListener("load", () => {
			if (viewMode === "mobile") newWindow.resizeTo(406, 743);
			if (viewMode === "desktop") newWindow.resizeTo(566, 413);

			newWindow.addEventListener("resize", () => {
				if (viewMode === "mobile") newWindow.resizeTo(406, 743);
				if (viewMode === "desktop") newWindow.resizeTo(566, 413);
			});

			const focusPopup = () => {
				if (!newWindow.closed) newWindow.focus();
			};

			document.onmousedown = focusPopup;
			document.onkeyup = focusPopup;
			document.onmousemove = focusPopup;

			newWindow.addEventListener("beforeunload", () => {
				localStorage.removeItem("temp");
			});
		});
	};

	const handelPopupView = (viewMode) => {
		if (isEditingOpen) return toast.warn("Please Complete Your Editing First !!");
		if (isWaiting) return toast.warn("Please Wait !!");
		const raw = JSON.stringify({
			userId,
			templateId,
			previousTemplateData: {
				...templateUpdatedData,
			},
		});

		axios
			.put(`/persona/user-template/${templateUserId}`, raw, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(({ data }) => {
				if (viewMode === "mobile") {
					openViewPopup(390, 670, viewMode);
					toast.success("Opening Mobile View...");
				} else {
					openViewPopup(550, 340, viewMode);
					toast.success("Opening Desktop View...");
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div className={styles.NavBar} style={{ display: showNav ? "flex" : "none" }}>
			{QRShow && <QR QRData={QRData} setQRShow={setQRShow} />}

			<div className={styles.Left}>
				{editable ? (
					<>
						<button className={styles.Icon} onClick={() => setShowNav(false)}>
							<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 25 25" fill="none">
								<path
									d="M18.2655 19.3498C16.5067 20.4654 14.4662 21.0561 12.3835 21.0528C6.99145 21.0528 2.50545 17.1728 1.56445 12.0528C1.99448 9.72352 3.16608 7.5957 4.90445 5.9868L1.77545 2.8608L3.19045 1.4458L22.9895 21.2458L21.5745 22.6598L18.2655 19.3498ZM6.31845 7.4028C4.95946 8.63839 4.01277 10.2616 3.60645 12.0528C3.91875 13.4193 4.54572 14.6939 5.43746 15.7754C6.3292 16.8568 7.46108 17.7152 8.74301 18.2821C10.0249 18.849 11.4215 19.1089 12.8215 19.0409C14.2216 18.973 15.5864 18.5792 16.8075 17.8908L14.7795 15.8628C13.9161 16.4066 12.8937 16.6409 11.8797 16.5272C10.8657 16.4136 9.92049 15.9587 9.19902 15.2372C8.47755 14.5158 8.02268 13.5705 7.90901 12.5566C7.79535 11.5426 8.02964 10.5201 8.57345 9.6568L6.31845 7.4028ZM13.2975 14.3808L10.0555 11.1388C9.87752 11.5917 9.83564 12.0868 9.93496 12.5631C10.0343 13.0395 10.2705 13.4766 10.6146 13.8207C10.9587 14.1648 11.3957 14.401 11.8721 14.5003C12.3485 14.5996 12.8435 14.5577 13.2965 14.3798L13.2975 14.3808ZM21.1905 16.6448L19.7595 15.2148C20.4279 14.2621 20.9038 13.188 21.1605 12.0528C20.8887 10.8625 20.3777 9.73995 19.6586 8.7533C18.9395 7.76664 18.0272 6.93653 16.9773 6.31341C15.9274 5.69028 14.7617 5.28717 13.5512 5.12856C12.3406 4.96996 11.1105 5.05918 9.93545 5.3908L8.35745 3.8128C9.60445 3.3228 10.9635 3.0528 12.3835 3.0528C17.7755 3.0528 22.2615 6.9328 23.2025 12.0528C22.896 13.7185 22.2073 15.2904 21.1905 16.6448ZM12.1065 7.5608C12.743 7.52146 13.3806 7.61787 13.977 7.84362C14.5734 8.06937 15.1151 8.41931 15.566 8.87025C16.0169 9.32119 16.3669 9.86283 16.5926 10.4593C16.8184 11.0557 16.9148 11.6933 16.8755 12.3298L12.1065 7.5608Z"
									fill="white"
								/>
							</svg>
						</button>

						<button
							className={styles.Icon}
							onClick={() => {
								if (window.AppBridge && typeof window.AppBridge.postMessage === "function") {
									let redirected = false;

									// Try to trigger mobile app navigation
									window.AppBridge.postMessage("goToProfileInsightScreen");

									// Start a timer to fallback if not redirected
									setTimeout(() => {
										if (!redirected) {
											window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/PersonalInsights`, "_self");
										}
									}, 500); // Delay before fallback (adjust as needed)

									// Optional: listen for visibility change (e.g., if user left the page)
									const handleVisibilityChange = () => {
										if (document.hidden) {
											redirected = true;
											document.removeEventListener("visibilitychange", handleVisibilityChange);
										}
									};

									document.addEventListener("visibilitychange", handleVisibilityChange);
								} else {
									// Fallback immediately if AppBridge is not available
									window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/PersonalInsights`, "_self");
								}
							}}>
							<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 25 25" fill="none">
								<path
									d="M3.38281 3.05273H21.3828C21.648 3.05273 21.9024 3.15809 22.0899 3.34563C22.2775 3.53316 22.3828 3.78752 22.3828 4.05273V20.0527C22.3828 20.318 22.2775 20.5723 22.0899 20.7598C21.9024 20.9474 21.648 21.0527 21.3828 21.0527H3.38281C3.1176 21.0527 2.86324 20.9474 2.67571 20.7598C2.48817 20.5723 2.38281 20.318 2.38281 20.0527V4.05273C2.38281 3.78752 2.48817 3.53316 2.67571 3.34563C2.86324 3.15809 3.1176 3.05273 3.38281 3.05273ZM4.38281 5.05273V19.0527H20.3828V5.05273H4.38281ZM7.38281 13.0527H9.38281V17.0527H7.38281V13.0527ZM11.3828 7.05273H13.3828V17.0527H11.3828V7.05273ZM15.3828 10.0527H17.3828V17.0527H15.3828V10.0527Z"
									fill="white"
								/>
							</svg>
						</button>

						<button className={styles.Icon} onClick={handelSharePersona}>
							<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 25 25" fill="none">
								<path
									d="M16.3828 17.0527V16.0527H13.3828V13.0527H16.3828V15.0527H18.3828V17.0527H17.3828V19.0527H15.3828V21.0527H13.3828V18.0527H15.3828V17.0527H16.3828ZM21.3828 21.0527H17.3828V19.0527H19.3828V17.0527H21.3828V21.0527ZM3.38281 3.05273H11.3828V11.0527H3.38281V3.05273ZM5.38281 5.05273V9.05273H9.38281V5.05273H5.38281ZM13.3828 3.05273H21.3828V11.0527H13.3828V3.05273ZM15.3828 5.05273V9.05273H19.3828V5.05273H15.3828ZM3.38281 13.0527H11.3828V21.0527H3.38281V13.0527ZM5.38281 15.0527V19.0527H9.38281V15.0527H5.38281ZM18.3828 13.0527H21.3828V15.0527H18.3828V13.0527ZM6.38281 6.05273H8.38281V8.05273H6.38281V6.05273ZM6.38281 16.0527H8.38281V18.0527H6.38281V16.0527ZM16.3828 6.05273H18.3828V8.05273H16.3828V6.05273Z"
									fill="white"
								/>
							</svg>
						</button>
					</>
				) : (
					<>
						<button className={styles.Icon} onClick={handelEditBack}>
							<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 25 25" fill="none">
								<path
									d="M8.21081 11.2297H20.3828V13.2297H8.21081L13.5748 18.5937L12.1608 20.0077L4.38281 12.2297L12.1608 4.45166L13.5748 5.86566L8.21081 11.2297Z"
									fill="white"
								/>
							</svg>
						</button>

						<button className={styles.Icon} onClick={() => setShowNav(false)}>
							<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 25 25" fill="none">
								<path
									d="M18.2655 19.3498C16.5067 20.4654 14.4662 21.0561 12.3835 21.0528C6.99145 21.0528 2.50545 17.1728 1.56445 12.0528C1.99448 9.72352 3.16608 7.5957 4.90445 5.9868L1.77545 2.8608L3.19045 1.4458L22.9895 21.2458L21.5745 22.6598L18.2655 19.3498ZM6.31845 7.4028C4.95946 8.63839 4.01277 10.2616 3.60645 12.0528C3.91875 13.4193 4.54572 14.6939 5.43746 15.7754C6.3292 16.8568 7.46108 17.7152 8.74301 18.2821C10.0249 18.849 11.4215 19.1089 12.8215 19.0409C14.2216 18.973 15.5864 18.5792 16.8075 17.8908L14.7795 15.8628C13.9161 16.4066 12.8937 16.6409 11.8797 16.5272C10.8657 16.4136 9.92049 15.9587 9.19902 15.2372C8.47755 14.5158 8.02268 13.5705 7.90901 12.5566C7.79535 11.5426 8.02964 10.5201 8.57345 9.6568L6.31845 7.4028ZM13.2975 14.3808L10.0555 11.1388C9.87752 11.5917 9.83564 12.0868 9.93496 12.5631C10.0343 13.0395 10.2705 13.4766 10.6146 13.8207C10.9587 14.1648 11.3957 14.401 11.8721 14.5003C12.3485 14.5996 12.8435 14.5577 13.2965 14.3798L13.2975 14.3808ZM21.1905 16.6448L19.7595 15.2148C20.4279 14.2621 20.9038 13.188 21.1605 12.0528C20.8887 10.8625 20.3777 9.73995 19.6586 8.7533C18.9395 7.76664 18.0272 6.93653 16.9773 6.31341C15.9274 5.69028 14.7617 5.28717 13.5512 5.12856C12.3406 4.96996 11.1105 5.05918 9.93545 5.3908L8.35745 3.8128C9.60445 3.3228 10.9635 3.0528 12.3835 3.0528C17.7755 3.0528 22.2615 6.9328 23.2025 12.0528C22.896 13.7185 22.2073 15.2904 21.1905 16.6448ZM12.1065 7.5608C12.743 7.52146 13.3806 7.61787 13.977 7.84362C14.5734 8.06937 15.1151 8.41931 15.566 8.87025C16.0169 9.32119 16.3669 9.86283 16.5926 10.4593C16.8184 11.0557 16.9148 11.6933 16.8755 12.3298L12.1065 7.5608Z"
									fill="white"
								/>
							</svg>
						</button>
					</>
				)}
			</div>

			<div className={styles.Right}>
				{editable ? (
					<>
						<button onClick={() => window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/ChoseTemplate`, "_self")}>
							Change Persona
						</button>
						<button onClick={handelEditButton}>Edit Persona</button>
					</>
				) : (
					<>
						{size > 900 && <button onClick={() => handelPopupView("mobile")}>Mobile View</button>}
						{size < 900 && <button onClick={() => handelPopupView("desktop")}>Desktop View</button>}

						<button onClick={handelSaveChanges}>Save Changes</button>

						<button className={styles.Publish} onClick={handelPublish}>
							Publish
						</button>
					</>
				)}
			</div>

			<div className={styles.ProgressBar}>
				<div className={styles.Bar} style={{ width: `${waitingPer}%` }}></div>
			</div>
		</div>
	);
};

export default NavBar;
