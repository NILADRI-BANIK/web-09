import React from "react";
import bbc from "../assets/business/image/bbc.png";
import cnbc from "../assets/business/image/cnbc.png";
import newyorkTimes from "../assets/business/image/newyorkTimes.png";
import time from "../assets/business/image/time.png";
import dialer from "../assets/business/svg/dialer.svg";
import location from "../assets/business/svg/location.svg";
import message from "../assets/business/svg/message.svg";
import store from "../assets/business/svg/store.svg";
import whatsapp from "../assets/business/svg/whatsapp.svg";
import rating from "../assets/images/rating.png";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import styles from "./Btemplate9.module.scss";
import R from "./assets/R.svg";
import logoAssset from "./assets/logoAsset.svg";

const Container1 = ({ editable, landingImage, setLandingImage, ratingData, setShowRating }) => {
	return (
		<div className={styles.Container1}>
			{!editable && <ImageUpload className={styles.landingChangeIcon} setImage={setLandingImage} image={landingImage} />}
			<div className={styles.logo}>
				<img src={logoAssset} alt="" />
			</div>
			<div className={styles.heroImage}>
				<img src={landingImage} alt="" />
			</div>

			<div className={styles.Bottom}>
				<div className={styles.buttonAdds}>
					<div className={styles.adds}>
						<marquee direction="left" behavior="scroll" scrollamount="10" className={styles.logos}>
							<img src={cnbc} alt="logo1" className={styles.cnbc} />
							<img src={bbc} alt="logo2" className={styles.bbc} />
							<img src={newyorkTimes} alt="logo3" className={styles.newyorkTimes} />
							<img src={time} alt="logo4" className={styles.time} />
						</marquee>
					</div>
					<div className={styles.buttons}>
						<button>Subscribed</button>
						<button>Message</button>
					</div>
				</div>
			</div>

			<div className={styles.contents}>
				<div className={styles.RatingContainer} onClick={() => setShowRating(true)}>
					<img src={rating} alt="" />
					<p>{ratingData}</p>
				</div>
				<div className={styles.reachus}>
					<div className={styles.R}>
						<img src={R} alt="" />
					</div>
					<p>Reach us</p>
				</div>
				<div className={styles.actions}>
					<div className={styles.buttons}>
						<div className={styles.subscribers}>
							<p>{"13.6K"}</p>
							<h3>Subscribers</h3>
						</div>
						<div className={styles.posts}>
							<p>{"256"}</p>
							<h3>Post</h3>
						</div>
					</div>
					<div className={styles.socials}>
						<div className={styles.whatsapp}>
							<img src={whatsapp} alt="" />
						</div>
						<div className={styles.phone}>
							<img src={dialer} alt="" />
						</div>
						<div className={styles.mail}>
							<img src={message} alt="" />
						</div>
						<div className={styles.location}>
							<img src={location} alt="" />
						</div>
						<div className={styles.store}>
							<img src={store} alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Container1;
