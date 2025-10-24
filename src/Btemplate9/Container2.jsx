import React from "react";
import EditTextIcon from "../assets/images/EditTextIcon.svg";
import { ContentEditableDiv, CreateSanitizeCallback } from "../components/ContentEditable/ContentEditable";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import styles from "./Btemplate9.module.scss";

const Container2 = ({ editable, aboutusImg1, aboutusImg2, setAboutusImg1, setAboutusImg2, aboutusText, setAboutusText }) => {
	const onContentBlur = CreateSanitizeCallback(setAboutusText);
	return (
		<div className={styles.Container2}>
			{!editable && <ImageUpload className={styles.aboutus1Change} setImage={setAboutusImg1} image={aboutusImg1} />}
			{!editable && <ImageUpload className={styles.aboutus2Change} setImage={setAboutusImg2} image={aboutusImg2} />}
			<div className={styles.details}>
				<div className={styles.content}>
					{!editable && <img src={EditTextIcon} alt="" className={styles.EditTextIcon} />}
					<h2>About company</h2>
					<ContentEditableDiv
						className={styles.aboutusText}
						text={aboutusText}
						onChange={onContentBlur}
						contentEditable={!editable}
					/>
					<button>We're Hiring</button>
				</div>
			</div>
			<div className={styles.img1}>
				<img src={aboutusImg1} alt="" />
			</div>
			<div className={styles.img2}>
				<img src={aboutusImg2} alt="" />
			</div>
		</div>
	);
};

export default Container2;
