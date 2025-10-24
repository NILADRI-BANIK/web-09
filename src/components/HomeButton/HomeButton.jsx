import React from "react";
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../Hooks/axios";
import InfoButton from "../Info/InfoButton";
import styles from "./HomeButton.module.scss";

const HomeButton = ({ templateUpdatedData }) => {
	const { userId, templateId, templateUserId } = useSelector((state) => state.auth);
	const { positionEdit } = useSelector((s) => s.temp);
	const { state } = useLocation();

	const handelDoneClick = () => {
		localStorage.setItem("temp", JSON.stringify(templateUpdatedData));
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
				toast.success("Position Save Successfully");
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<>
			<button
				className={styles.HomeButton}
				onClick={() => window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/Home`, "_self")}>
				<FaHome color="#46F2DB" />
			</button>
			<InfoButton />

			{state.viewMode && !positionEdit.status && (
				<button className={styles.SubmitMobileView} onClick={handelDoneClick}>
					Done Editing
				</button>
			)}
		</>
	);
};

export default HomeButton;
