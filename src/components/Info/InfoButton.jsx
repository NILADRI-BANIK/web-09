import React, { useState } from "react";
import { FaBackspace, FaInfoCircle, FaStar } from "react-icons/fa";
import styles from "./InfoButton.module.scss";

const InfoButton = () => {
	const [showTooltip, setShowTooltip] = useState(true);

	const [rating, setRating] = useState(3);

	const handleButtonClick = () => {
		setShowTooltip(!showTooltip);
	};
	return (
		<div className={styles.InfoButtonContainer}>
			<button className={styles.InfoButton} onClick={handleButtonClick}>
				<FaInfoCircle color="#46F2DB" />
			</button>

			<div className={`${styles.Tooltip} ${showTooltip ? styles.Active : ""}`}>
				<div className={styles.Cross} onClick={() => setShowTooltip(false)}>
					<FaBackspace size={"2.3rem"} color="#fff" />
				</div>
				<p>
					Hi there! Our application is currently in its testing version. Kindly share your review here — your feedback is
					greatly appreciated!
				</p>
				<a href="https://forms.gle/5CHwKRbm6yXAq13o6" target="_blank">
					https://forms.gle/5CHwKRbm6yXAq13o6
				</a>
			</div>
		</div>
	);
};

export default InfoButton;
