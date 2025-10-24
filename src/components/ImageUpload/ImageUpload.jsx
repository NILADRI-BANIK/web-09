import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import EditIcon from "../../assets/images/EditTextIcon.svg";
import changeIcon from "../../assets/images/changeIcon.svg";
import { setWaiting } from "../../redux/slice/authSlice";
import {
	getCurrentImageState,
	getCurrentMobileImageState,
	setActiveId,
	setDefaultImageData,
	setImageData,
	setIsEditingOpen,
	setOriginalImageData,
	setPositionEdit,
	setTempPosition,
} from "../../redux/slice/tempSlice";
import axios from "../Hooks/axios";
import styles from "./ImageUpload.module.scss";

const ImageUpload = ({
	className,
	image,
	setImage,
	imageMobile,
	setImageMobile,
	condition,
	activeId,
	initialPosition,
	setInitialPosition,
}) => {
	const { imageData, positionEdit, isEditingOpen } = useSelector((s) => s.temp);
	const coverRef = useRef();
	const [coverImageFile, setCoverImageFile] = useState(null);
	const dispatch = useDispatch();
	const { state } = useLocation();

	const uploadImage = (file) => {
		dispatch(setWaiting(true));
		var formData = new FormData();
		formData.append("image", file);

		axios
			.post("/persona/uploadTemplateImage/", formData)
			.then(({ data }) => {
				if (data.status) {
					dispatch(setWaiting(false));
					setImage(data.file);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div className={`${styles.ImageUpload} ${className}`}>
			{!state.viewMode && !isEditingOpen && (
				<img
					src={changeIcon}
					alt=""
					className={styles.Icon}
					onClick={() => {
						if (imageData) toast.warn("Please Complete Your Editing First !!");
						else coverRef.current.click();
					}}
				/>
			)}

			{!positionEdit.status && !isEditingOpen && (
				<img
					src={EditIcon}
					alt=""
					className={styles.Icon}
					onClick={() => {
						if (imageData) toast.warn("Please Complete Your Editing First !!");
						else {
							dispatch(setActiveId(activeId));
							dispatch(
								setTempPosition({ tempPositionState: initialPosition, tempPositionSetState: setInitialPosition })
							);
							dispatch(setImageData(image));
							dispatch(setOriginalImageData(image));
							dispatch(setDefaultImageData(image));
							dispatch(getCurrentImageState(setImage));
							dispatch(getCurrentMobileImageState(setImageMobile));
							if (state.viewMode) dispatch(setPositionEdit(true));
							else dispatch(setIsEditingOpen(true));
						}
					}}
				/>
			)}
			<input
				type="file"
				accept="image/*"
				ref={coverRef}
				style={{ display: "none" }}
				onChange={(e) => {
					const file = e.target.files[0];
					if (condition === "png") {
						if (file.type === "image/png") {
							// setCoverImageFile(file);
							setImage(URL.createObjectURL(file));
							setImageMobile(URL.createObjectURL(file));
						} else return toast.error("Please select 'PNG' image width no background only !!");
					} else {
						// setCoverImageFile(file);
						setImage(URL.createObjectURL(file));
						setImageMobile(URL.createObjectURL(file));
					}
					// uploadImage(file);
					dispatch(setIsEditingOpen(true));
					dispatch(setImageData(URL.createObjectURL(file)));
					dispatch(setOriginalImageData(URL.createObjectURL(file)));
					dispatch(setDefaultImageData(image));
					dispatch(getCurrentImageState(setImage));
					dispatch(getCurrentMobileImageState(setImageMobile));
					dispatch(setActiveId(activeId));
					dispatch(setTempPosition({ tempPositionState: initialPosition, tempPositionSetState: setInitialPosition }));
					e.target.value = null;
				}}
			/>
		</div>
	);
};

export default ImageUpload;
