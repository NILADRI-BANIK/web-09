import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { setPosition } from "../../redux/slice/tempSlice";
import ImageRenderControls from "./ImageRenderControls";

const ImageRender = ({ children, initialPosition, editable, currentId }) => {
	const {
		positionEdit: { activeId, status },
	} = useSelector((s) => s.temp);
	const dispatch = useDispatch();

	const isMobile = window.innerWidth < 931 && window.innerHeight > 599;
	const [defaultPosition, setDefaultPosition] = useState(null);
	const [baseFrontSize, setBaseFrontSize] = useState(
		window.getComputedStyle(document.documentElement).getPropertyValue("--base-font-size")
	);
	const [fontValue, setFontValue] = useState(1);

	useEffect(() => {
		if (initialPosition === "") return;
		setDefaultPosition(isMobile ? initialPosition?.mobile : initialPosition?.desktop);
	}, [initialPosition]);

	useEffect(() => {
		function handelResize() {
			const customVariableValue = window.getComputedStyle(document.documentElement).getPropertyValue("--base-font-size");
			setBaseFrontSize(customVariableValue);
		}
		window.addEventListener("resize", handelResize);
		return () => window.removeEventListener("resize", handelResize);
	}, []);

	useEffect(() => {
		if (baseFrontSize === "100%") setFontValue(1);
		if (baseFrontSize === "90%") setFontValue(0.9);
		if (baseFrontSize === "80%") setFontValue(0.8);
		if (baseFrontSize === "70%") setFontValue(0.7);
		if (baseFrontSize === "65%") setFontValue(0.65);
		if (baseFrontSize === "60%") setFontValue(0.6);
		if (baseFrontSize === "55%") setFontValue(0.55);
		if (baseFrontSize === "50%") setFontValue(0.5);
		if (baseFrontSize === "45%") setFontValue(0.45);
	}, [baseFrontSize]);

	return (
		<TransformWrapper
			key={defaultPosition || baseFrontSize}
			disabled={editable || !status || activeId !== currentId}
			initialPositionX={defaultPosition?.x}
			initialPositionY={defaultPosition?.y}
			initialScale={defaultPosition?.s}
			onWheelStop={({ state }) => dispatch(setPosition({ x: state.positionX, y: state.positionY, s: state.scale }))}
			onPinchingStop={({ state }) => dispatch(setPosition({ x: state.positionX, y: state.positionY, s: state.scale }))}
			onPanningStop={({ state }) => dispatch(setPosition({ x: state.positionX, y: state.positionY, s: state.scale }))}>
			{(utils) => (
				<React.Fragment>
					{status && activeId === currentId && <ImageRenderControls {...utils} />}
					<TransformComponent>{children}</TransformComponent>
				</React.Fragment>
			)}
		</TransformWrapper>
	);
};

export default ImageRender;
