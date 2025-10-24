import domToImage from "dom-to-image";
import React from "react";
import { QRCode } from "react-qrcode-logo";
import { toast } from "react-toastify";
import styles from "./NavBar.module.scss";
import Logo from "../../assets/images/favicon.ico"

const QR = ({ setQRShow, QRData }) => {

	const handelCopy = () => {
		navigator.clipboard
			.writeText(QRData)
			.then(() => {
				toast.success("URL copied to clipboard");
			})
			.catch((err) => {
				console.error("Failed to copy URL: ", err);
			});
	};

	const handelDownload = () => {
		const div = document.getElementById("QR");

		if (div) {
			domToImage
				.toPng(div)
				.then(function (dataUrl) {
					const a = document.createElement("a");
					a.href = dataUrl;
					a.download = "QR.png";
					a.style.display = "none";
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
				})
				.catch(function (error) {
					// console.error("Error converting textarea to image:", error);
				});
		}
	};

	return (
		<div className={styles.QRWrapper} onClick={() => setQRShow(false)}>
			<div className={styles.QR} onClick={(e) => e.stopPropagation()}>
				<div className={styles.qr} id="QR">
					<QRCode
						bgColor={"#3A0DBB"}
						fgColor={"#DBDEFF"}
						value={QRData}
						size={240}
						logoImage={Logo}
						logoWidth={60}
						logoHeight={60}
					/>
				</div>

				<div className={styles.ButtonContainer}>
					<button onClick={handelDownload}>Download</button>
					<button onClick={handelCopy}>Copy Link</button>
				</div>
			</div>
		</div>
	);
};

export default QR;
