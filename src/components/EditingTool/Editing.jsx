import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import Draggable from "react-draggable";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { setWaiting, setWaitingPer } from "../../redux/slice/authSlice";
import {
	getCurrentImageState,
	getCurrentMobileImageState,
	setActiveId,
	setImageData,
	setIsEditingOpen,
	setPosition,
	setPositionEdit,
	setPrevImage,
	setTempPosition,
} from "../../redux/slice/tempSlice";
import axios from "../Hooks/axios";
import styles from "./Editing.module.scss";
import getCroppedImg from "./cropImage";
import getFilterImg from "./filterImage";
import getMirrorImg from "./mirrorImage";

const Editing = () => {
	const dispatch = useDispatch();
	const { state } = useLocation();
	const {
		imageData,
		originalImageData,
		defaultImageData,
		currentImageState,
		currentMobileImageState,
		position,
		tempPositionState,
		tempPositionSetState,
		prevImage,
	} = useSelector((s) => s.temp);
	const { isMobile } = useSelector((s) => s.auth);
	const [draggable, setDraggable] = useState(false);
	const [minimize, setMinimize] = useState(false);

	// Image Width & Hight
	const [imageWidth, setImageWidth] = useState(100);
	const [imageHeight, setImageHeight] = useState(100);

	// Crop
	const [cropShow, setCropShow] = useState(false);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [rotationShow, setRotationShow] = useState(false);
	const [rotation, setRotation] = useState(0);
	const [aspectShow, setAspectShow] = useState(false);
	const [aspectValue, setAspectValue] = useState(1 / 1);
	const [isNext, setIsNext] = useState(false);

	// Effect
	const [effectShow, setEffectShow] = useState(false);
	const [effectValue, setEffectValue] = useState(styles.EffectNormal);

	const handelFilter = async () => {
		try {
			// const response = await fetch(imageData);
			// if (!response.ok) {
			// 	throw new Error("Failed to fetch image");
			// }

			// Convert the image data into a Blob
			// const blob = await response.blob();
			// console.log(blob);
			const { file, url } = await getFilterImg(imageData, effectValue);
			currentImageState(url);
			currentMobileImageState(url);
			dispatch(setImageData(url));

			setEffectShow(false);
			setEffectValue(styles.EffectNormal);
			console.log("Done");
		} catch (error) {
			console.log(error);
		}
	};

	// Mirror
	const [mirrorShow, setMirrorShow] = useState(false);
	const [mirrorValueX, setMirrorValueX] = useState(1);
	const [mirrorValueY, setMirrorValueY] = useState(1);

	const handelMirror = async () => {
		try {
			const { file, url } = await getMirrorImg(imageData, mirrorValueX, mirrorValueY);
			currentImageState(url);
			currentMobileImageState(url);
			dispatch(setImageData(url));

			setMirrorShow(false);
			setMirrorValueX(1);
			setMirrorValueY(1);
		} catch (error) {
			console.log(error);
		}
	};

	// Adjustment
	const [adjustmentShow, setAdjustmentShow] = useState(false);
	const [adjustmentValue, setAdjustmentValue] = useState({
		contrast: 100,
		brightness: 100,
		saturate: 100,
		huerotate: 0,
		sepia: 0,
		invert: 0,
		grayscale: 0,
		blur: 0,
	});

	const resetImage = () => {
		dispatch(setImageData(originalImageData));
		currentImageState(originalImageData);
		currentMobileImageState(originalImageData);
	};

	const cropImage = async () => {
		try {
			const { file, url } = await getCroppedImg(imageData, croppedAreaPixels, rotation);
			if (isMobile) currentMobileImageState(url);
			else currentImageState(url);
			dispatch(setImageData(url));
			setCropShow(false);
			setZoom(1);
			setRotation(0);
			setAspectValue(1 / 1);
		} catch (error) {
			console.log(error);
		}
	};

	const onImageLoad = (e) => {
		setImageWidth(e.target.width);
		setImageHeight(e.target.height);
	};

	console.log(isMobile);
	const uploadImage = async () => {
		dispatch(setWaiting(true));
		let id;
		if (isNext) id = toast.loading("Please Wait Image Uploading...");

		try {
			const imageFile = [];

			const response1 = await fetch(imageData);
			if (!response1.ok) throw new Error("Failed to fetch the image");
			const blob1 = await response1.blob();
			imageFile.push(new File([blob1], "imageName1.jpg", { type: blob1.type }));

			if (prevImage !== "") {
				const response2 = await fetch(prevImage);
				if (!response2.ok) throw new Error("Failed to fetch the image");
				const blob2 = await response2.blob();
				imageFile.push(new File([blob2], "imageName2.jpg", { type: blob2.type }));
			}

			const formData = new FormData();
			formData.append("path", "personaTemplate");
			formData.append("files", imageFile[0]);
			if (prevImage !== "") formData.append("files", imageFile[1]);

			axios
				.post("/multipleFileUpload", formData, {
					onUploadProgress: (progressEvent) => {
						const progress = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
						dispatch(setWaitingPer(progress));
					},
				})
				.then(({ data }) => {
					if (data.error === false) {
						dispatch(setWaiting(false));
						if (data.Data.length === 1) {
							if (isMobile) currentMobileImageState(data.Data[0].Location);
							else currentImageState(data.Data[0].Location);
						} else {
							if (isMobile) {
								currentImageState(data.Data[1].Location);
								currentMobileImageState(data.Data[0].Location);
							} else {
								currentImageState(data.Data[0].Location);
								currentMobileImageState(data.Data[1].Location);
							}
						}
						toast.update(id, {
							render: "Image Uploaded",
							type: "success",
							isLoading: false,
							autoClose: 2000,
						});
						dispatch(setWaitingPer(0));
					}
				})
				.catch((e) => {
					console.log(e);
				});
		} catch (error) {
			console.log(error);
		}

		// fetch(imageData)
		// 	.then((response) => response.blob())
		// 	.then((blob) => {
		// 		const imageFile = new File([blob], "imageName.jpg", { type: blob.type });

		// 		var formData = new FormData();
		// 		formData.append("image", imageFile);

		// 		axios
		// 			.post("/persona/uploadTemplateImage/", formData, {
		// 				onUploadProgress: (progressEvent) => {
		// 					const progress = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
		// 					dispatch(setWaitingPer(progress))
		// 				},
		// 			})
		// 			.then(({ data }) => {
		// 				if (data.status) {
		// 					dispatch(setWaiting(false));
		// 					currentImageState(data.file);
		// 					// currentMobileImageState(data.file);
		// 					toast.update(id, {
		// 						render: "Image Uploaded",
		// 						type: "success",
		// 						isLoading: false,
		// 						autoClose: 2000,
		// 					});
		// 				}
		// 			})
		// 			.catch((e) => {
		// 				console.log(e);
		// 			});
		// 	});
	};

	const handelDoneEditing = () => {
		let data = tempPositionState;
		if (isMobile)
			data = {
				...data,
				mobile: { ...position },
			};
		else
			data = {
				...data,
				desktop: { ...position },
			};
		tempPositionSetState({ ...data });
		if (!state.viewMode) uploadImage();
		dispatch(setIsEditingOpen(false));
		dispatch(setImageData(""));
		dispatch(setActiveId(""));
		dispatch(setPositionEdit(false));
		dispatch(setTempPosition({ tempPositionState: null, tempPositionSetState: null }));
		dispatch(setPosition({ x: 0, y: 0, s: 1 }));
	};

	const handelNext = () => {
		setIsNext(true);
		dispatch(setPrevImage(imageData));
	};

	const handelPrev = () => {
		setIsNext(false);
		dispatch(setImageData(prevImage));
		currentImageState(prevImage);
		currentMobileImageState(prevImage);
	};

	return (
		<>
			{minimize && (
				<button
					className={`${styles.Maximize} ${minimize ? styles.MaximizeActive : ""}`}
					onClick={() => {
						dispatch(setPositionEdit(false));
						setMinimize(false);
					}}>
					Open Tool
				</button>
			)}

			<div className={`${styles.EditingWrapper} ${minimize ? styles.Minimize : ""}`}>
				<div className={styles.BtnWrapper}>
					{/* <button onClick={handelDoneEditing}>Done Editing</button> */}

					<button onClick={() => setDraggable(!draggable)}>{draggable ? "Dragging" : "Drag Start"}</button>

					<button onClick={() => setMinimize(true)}>Minimize</button>

					<button
						onClick={() => {
							currentImageState(defaultImageData);
							currentMobileImageState(defaultImageData);
							dispatch(setIsEditingOpen(false));
							dispatch(setImageData(""));
							dispatch(getCurrentImageState(null));
							dispatch(getCurrentMobileImageState(null));
							dispatch(setActiveId(""));
							dispatch(setPositionEdit(false));
							dispatch(setPosition({ x: 0, y: 0, s: 1 }));
						}}>
						Cancel Edit
					</button>
				</div>

				<Draggable onStart={() => draggable} cancel=".custom_btn">
					<div
						className={styles.EditingMain}
						style={{ boxShadow: draggable ? "0 0 10px 8px rgba(255, 255, 255, 0.5)" : "" }}>
						{draggable && <div className={styles.OverlayForDrag} onMouseUp={() => setDraggable(false)} />}

						<div className={styles.EditingContainer}>
							{adjustmentShow || effectShow || mirrorShow ? (
								<div className={styles.EffectPreview} style={{ width: imageWidth, height: imageHeight }}>
									<img
										src={imageData}
										alt=""
										className={`${styles.img} ${adjustmentShow ? "" : effectValue}`}
										style={{ transform: `scale(${mirrorValueX},${mirrorValueY})` }}
									/>
								</div>
							) : cropShow ? (
								<Cropper
									image={imageData}
									crop={crop}
									zoom={zoom}
									rotation={rotation}
									aspect={aspectValue}
									onZoomChange={setZoom}
									onRotationChange={setRotation}
									onCropChange={setCrop}
									onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
								/>
							) : (
								<img src={imageData} onLoad={onImageLoad} className={styles.img} />
							)}
						</div>

						<div className={styles.ButtonContainer}>
							{!cropShow && !effectShow && !adjustmentShow && !mirrorShow && (
								<div className={styles.MainBtnWrapper}>
									{isNext && (
										<>
											<button className="custom_btn" onClick={handelPrev}>
												{"<"} Previous
											</button>

											<button className="custom_btn" onClick={() => setCropShow(true)}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="44"
													height="47"
													viewBox="0 0 44 47"
													fill="none">
													<path
														d="M12.1855 4.40625V29.375C12.1855 30.5436 12.6135 31.6644 13.3753 32.4907C14.1371 33.317 15.1702 33.7812 16.2476 33.7812H39.2656"
														stroke="url(#paint0_linear_429_1281)"
														strokeWidth="2.9375"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M31.1426 27.9062V17.625C31.1426 16.4564 30.7146 15.3356 29.9528 14.5093C29.1911 13.683 28.1579 13.2188 27.0806 13.2188H17.6025M31.1426 33.7812V42.5938M12.1865 13.2188H4.0625"
														stroke="url(#paint1_linear_429_1281)"
														strokeWidth="2.9375"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<defs>
														<linearGradient
															id="paint0_linear_429_1281"
															x1="25.7256"
															y1="4.40625"
															x2="25.7256"
															y2="33.7812"
															gradientUnits="userSpaceOnUse">
															<stop stopColor="#0BDDD1" />
															<stop offset="1" stopColor="#05BEB3" />
														</linearGradient>
														<linearGradient
															id="paint1_linear_429_1281"
															x1="17.6025"
															y1="13.2188"
															x2="17.6025"
															y2="42.5938"
															gradientUnits="userSpaceOnUse">
															<stop stopColor="#0BDDD1" />
															<stop offset="1" stopColor="#05BEB3" />
														</linearGradient>
													</defs>
												</svg>
												Crop
											</button>

											<button
												className="custom_btn"
												style={{ borderWidth: ".3rem", fontSize: "1.3rem" }}
												onClick={handelDoneEditing}>
												Done
											</button>
										</>
									)}

									{!isNext && (
										<>
											<button className="custom_btn" onClick={() => setEffectShow(true)}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="47"
													height="46"
													viewBox="0 0 47 46"
													fill="none">
													<path
														d="M36.5496 19.4989V36.5281H10.0597V10.0382H27.0889V6.25391H10.0597C8.01616 6.25391 6.27539 7.95683 6.27539 10.0382V36.5281C6.27539 38.6095 8.01616 40.3124 10.0597 40.3124H36.5496C38.6688 40.3124 40.3339 38.6095 40.3339 36.5281V19.4989H36.5496ZM32.7653 19.4989L34.5439 15.6011L38.4417 13.8225L34.5439 12.0438L32.7653 8.14604L30.9867 12.0438L27.0889 13.8225L30.9867 15.6011L32.7653 19.4989ZM25.6698 20.918L23.3046 15.7146L20.9395 20.918L15.7361 23.2831L20.9395 25.6483L23.3046 30.8517L25.6698 25.6483L30.8732 23.2831L25.6698 20.918Z"
														fill="url(#paint0_linear_429_1266)"
													/>
													<defs>
														<linearGradient
															id="paint0_linear_429_1266"
															x1="23.3046"
															y1="6.25391"
															x2="23.3046"
															y2="40.3124"
															gradientUnits="userSpaceOnUse">
															<stop stopColor="#3FF0D9" />
															<stop offset="1" stopColor="#06AB9E" />
														</linearGradient>
													</defs>
												</svg>
												Filters
											</button>

											<button className="custom_btn" onClick={() => setMirrorShow(true)}>
												Mirror
											</button>

											<button className="custom_btn" onClick={handelNext}>
												Next {">"}
											</button>
										</>
									)}
								</div>
							)}

							{cropShow && !rotationShow && !aspectShow && (
								<div className={styles.CropBtnWrapper}>
									<div className={styles.Left}>
										<button className="custom_btn" onClick={() => setRotationShow(true)}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="21"
												viewBox="0 0 24 21"
												fill="none">
												<path
													d="M20.2477 9.11817L22.2449 7.12093L23.7897 8.66573L19.1554 13.3L14.5211 8.66573L16.0659 7.12093L18.0631 9.11817V6.29364C18.0631 4.48383 16.596 3.01668 14.7861 3.01668H10.4168V0.832031H14.7861C17.8025 0.832031 20.2477 3.27728 20.2477 6.29364V9.11817ZM12.6015 7.38597C13.2048 7.38597 13.6938 7.87502 13.6938 8.47829V19.4015C13.6938 20.0048 13.2048 20.4938 12.6015 20.4938H1.67826C1.07499 20.4938 0.585938 20.0048 0.585938 19.4015V8.47829C0.585938 7.87502 1.07499 7.38597 1.67826 7.38597H12.6015ZM11.5092 9.57061H2.77058V18.3092H11.5092V9.57061Z"
													fill="#0BDDD1"
												/>
											</svg>
											Rotate
										</button>

										<button className="custom_btn" onClick={() => setAspectShow(true)}>
											Aspect Ratio
										</button>
									</div>

									<div className={styles.Right}>
										<button className="custom_btn" onClick={() => cropImage()}>
											Ok
										</button>
										<button className="custom_btn" onClick={() => setCropShow(false)}>
											Cancel
										</button>
										<button className="custom_btn" onClick={resetImage}>
											Reset
										</button>
									</div>
								</div>
							)}

							{rotationShow && (
								<div className={styles.RotateBtnWrapper}>
									<div className={styles.Left}>
										<input
											type="range"
											min={0}
											max={360}
											value={rotation}
											onChange={(e) => setRotation(e.target.value)}
											className="custom_btn"
										/>
										<p>{rotation}</p>
									</div>

									<div className={styles.Right}>
										<button className="custom_btn" onClick={() => setRotationShow(false)}>
											Ok
										</button>
										<button
											className="custom_btn"
											onClick={() => {
												setRotationShow(false);
												setRotation(0);
											}}>
											Reset
										</button>
									</div>
								</div>
							)}

							{aspectShow && (
								<div className={styles.AspectBtnWrapper}>
									<div className={styles.Left}>
										<button className="custom_btn" onClick={() => setAspectValue(1 / 1)}>
											1 : 1
										</button>
										<button className="custom_btn" onClick={() => setAspectValue(1 / 2)}>
											1 : 2
										</button>
										<button className="custom_btn" onClick={() => setAspectValue(2 / 1)}>
											2 : 1
										</button>
										<button className="custom_btn" onClick={() => setAspectValue(4 / 5)}>
											4 : 5
										</button>
										<button className="custom_btn" onClick={() => setAspectValue(5 / 4)}>
											5 : 4
										</button>
										<button className="custom_btn" onClick={() => setAspectValue(16 / 9)}>
											16 : 9
										</button>
									</div>

									<div className={styles.Right}>
										<button className="custom_btn" onClick={() => setAspectShow(false)}>
											Ok
										</button>
										<button
											className="custom_btn"
											onClick={() => {
												setAspectShow(false);
												setAspectValue(1 / 1);
											}}>
											Reset
										</button>
									</div>
								</div>
							)}

							{effectShow && (
								<div className={styles.EffectBtnWrapper}>
									<div className={styles.Left}>
										<AliceCarousel
											mouseTracking
											disableButtonsControls
											disableDotsControls
											responsive={{ 0: { items: 4 } }}>
											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.Normal}`}
												onClick={() => setEffectValue(styles.Normal)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.Effect1977}`}
												onClick={() => setEffectValue(styles.Effect1977)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectAden}`}
												onClick={() => setEffectValue(styles.EffectAden)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectAmaro}`}
												onClick={() => setEffectValue(styles.EffectAmaro)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectBrannan}`}
												onClick={() => setEffectValue(styles.EffectBrannan)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectBrooklyn}`}
												onClick={() => setEffectValue(styles.EffectBrooklyn)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectClarendon}`}
												onClick={() => setEffectValue(styles.EffectClarendon)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectEarlybird}`}
												onClick={() => setEffectValue(styles.EffectEarlybird)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectGingham}`}
												onClick={() => setEffectValue(styles.EffectGingham)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectHudson}`}
												onClick={() => setEffectValue(styles.EffectHudson)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectInkwell}`}
												onClick={() => setEffectValue(styles.EffectInkwell)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectLofi}`}
												onClick={() => setEffectValue(styles.EffectLofi)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectMaven}`}
												onClick={() => setEffectValue(styles.EffectMaven)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectPerpetua}`}
												onClick={() => setEffectValue(styles.EffectPerpetua)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectReyes}`}
												onClick={() => setEffectValue(styles.EffectReyes)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectStinson}`}
												onClick={() => setEffectValue(styles.EffectStinson)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectToaster}`}
												onClick={() => setEffectValue(styles.EffectToaster)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectWalden}`}
												onClick={() => setEffectValue(styles.EffectWalden)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectValencia}`}
												onClick={() => setEffectValue(styles.EffectValencia)}
											/>

											<img
												src={imageData}
												alt=""
												onDragStart={(e) => e.preventDefault()}
												className={`custom_btn ${styles.EffectXpro2}`}
												onClick={() => setEffectValue(styles.EffectXpro2)}
											/>
										</AliceCarousel>
									</div>

									<div className={styles.Right}>
										<button className="custom_btn" onClick={handelFilter}>
											Ok
										</button>
										<button className="custom_btn" onClick={() => setEffectShow(false)}>
											Cancel
										</button>
										<button className="custom_btn" onClick={resetImage}>
											Reset
										</button>
									</div>
								</div>
							)}

							{mirrorShow && (
								<div className={styles.MirrorBtnWrapper}>
									<div className={styles.Left}>
										<button
											className="custom_btn"
											onClick={() => {
												if (mirrorValueX === 1) setMirrorValueX(-1);
												if (mirrorValueX === -1) setMirrorValueX(1);
											}}>
											Mirror X
										</button>
										<button
											className="custom_btn"
											onClick={() => {
												if (mirrorValueY === 1) setMirrorValueY(-1);
												if (mirrorValueY === -1) setMirrorValueY(1);
											}}>
											Mirror Y
										</button>
									</div>

									<div className={styles.Right}>
										<button className="custom_btn" onClick={handelMirror}>
											Ok
										</button>
										<button
											className="custom_btn"
											onClick={() => {
												setMirrorShow(false);
												setMirrorValueX(1);
												setMirrorValueY(1);
											}}>
											Reset
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</Draggable>
			</div>
		</>
	);
};

export default Editing;
