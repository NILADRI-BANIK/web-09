import React from "react";
import styles from "./Btemplate9.module.scss";
import deskFrame from "./assets/chooseusAsset.png";
import mobFrame from "./assets/chooseusAssetMob.png";
import { ContentEditableDiv, CreateSanitizeCallback } from "../components/ContentEditable/ContentEditable";
import EditTextIcon from "../assets/images/EditTextIcon.svg";
import ImageUpload from "../components/ImageUpload/ImageUpload";

function Container3({ editable, chooseusImage, setChooseusImage, chooseusText, setChooseusText }) {
	const onContentBlur = CreateSanitizeCallback(setChooseusImage);
	return (
		<div className={styles.Container3}>
			{!editable && <ImageUpload className={styles.chooseusChangeIcon} setImage={setChooseusImage} image={chooseusImage} />}
			<div className={styles.deskFrame}>
				<img src={deskFrame} alt="" />
			</div>
			<div className={styles.mobFrame}>
				<img src={mobFrame} alt="" />
			</div>
			<div className={styles.chooseusImage}>
				<img src={chooseusImage} alt="" />
			</div>
			<div className={styles.details}>
				{!editable && <img src={EditTextIcon} alt="" className={styles.EditTextIcon} />}
				<h2>Why Choose us</h2>
				<ContentEditableDiv
					className={styles.chooseusText}
					text={chooseusText}
					onChange={onContentBlur}
					contentEditable={!editable}
				/>
			</div>
		</div>
	);
}

export default Container3;
