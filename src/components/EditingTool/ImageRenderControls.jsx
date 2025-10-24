import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ImageRenderControls = ({ resetTransform, setTransform }) => {
	const { position } = useSelector((s) => s.temp);

	useEffect(() => {
		setTransform(position.x, position.y, position.s);
	}, [position]);

	// const handelDone = () => {
	// 	let data = tempPositionState;
	// 	data = {
	// 		...data,
	// 		mobile: { ...position },
	// 	};
	// 	tempPositionSetState({ ...data });
	// 	dispatch(setImageData(""));
	// 	dispatch(setActiveId(""));
	// 	dispatch(setPositionEdit(false));
	// 	dispatch(setTempPosition({ tempPositionState: null, tempPositionSetState: null }));
	// 	dispatch(setPosition({ x: 0, y: 0, s: 1 }));
	// };

	// return (
	// 	<div className={styles.ControlsContainer}>
	// 		<div className={styles.Left}>
	// 			<div className={styles.InputWrapper}>
	// 				<label>X-axis : </label>
	// 				<input
	// 					type="range"
	// 					max={(1000 * position.s) / 2}
	// 					min={(-1000 * position.s) / 2}
	// 					value={position.x}
	// 					onChange={(e) => dispatch(setPosition({ x: Number(e.target.value), y: position.y, s: position.s }))}
	// 				/>
	// 			</div>

	// 			<div className={styles.InputWrapper}>
	// 				<label>Y-axis : </label>
	// 				<input
	// 					type="range"
	// 					max={(1000 * position.s) / 2}
	// 					min={(-1000 * position.s) / 2}
	// 					value={position.y}
	// 					onChange={(e) => dispatch(setPosition({ x: position.x, y: Number(e.target.value), s: position.s }))}
	// 				/>
	// 			</div>

	// 			<div className={styles.InputWrapper}>
	// 				<label>Zoom : </label>
	// 				<input
	// 					type="range"
	// 					max={5}
	// 					min={1}
	// 					value={position.s}
	// 					step={0.1}
	// 					onChange={(e) => dispatch(setPosition({ x: position.x, y: position.y, s: Number(e.target.value) }))}
	// 				/>
	// 			</div>
	// 		</div>

	// 		<div className={styles.ButtonWrapper}>
	// 			<button onClick={handelDone}>Done</button>

	// 			<button
	// 				onClick={() => {
	// 					resetTransform();
	// 					dispatch(setPosition({ x: 0, y: 0, s: 1 }));
	// 				}}>
	// 				Reset
	// 			</button>

	// 			{/* <button onClick={() => {}}>Cancel</button> */}
	// 		</div>
	// 	</div>
	// );
};

export default ImageRenderControls;
