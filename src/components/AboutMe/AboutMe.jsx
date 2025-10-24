import React from "react";
import EditTextIcon from "../../assets/images/EditTextIcon.svg";
import styles from "./AboutMe.module.scss";

const AboutMe = ({
	editable,
	setShowAboutMe,
	email,
	setEmail,
	phone,
	setPhone,
	liveIn,
	setLiveIn,
	schooling,
	setSchooling,
	profession,
	setProfession,
}) => {
	return (
		<div className={styles.AboutMeWrapper} onClick={() => setShowAboutMe(false)}>
			<div className={styles.AboutMe} onClick={(e) => e.stopPropagation()}>
				{!editable && (
					<img
						src={EditTextIcon}
						alt=""
						className={styles.EditTextIcon}
						onClick={() => {
							window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/Security?about=true`, "_self");
						}}
					/>
				)}
				<div className={styles.Row}>
					<h1>About Me</h1>
				</div>
				<div className={styles.Row}>
					<p>Email</p>
					<input type="text" readOnly={true} value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className={styles.Row}>
					<p>Phone Number</p>
					<input type="text" readOnly={true} value={phone} onChange={(e) => setPhone(e.target.value)} />
				</div>
				<div className={styles.Row}>
					<p>Live in</p>
					<input type="text" readOnly={true} value={liveIn} onChange={(e) => setLiveIn(e.target.value)} />
				</div>
				<div className={styles.Row}>
					<p>Schooling</p>
					<input type="text" readOnly={true} value={schooling} onChange={(e) => setSchooling(e.target.value)} />
				</div>
				<div className={styles.Row}>
					<p>Profession</p>
					<input type="text" readOnly={true} value={profession} onChange={(e) => setProfession(e.target.value)} />
				</div>
			</div>
		</div>
	);
};

export default AboutMe;
