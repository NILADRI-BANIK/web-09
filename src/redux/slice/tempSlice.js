import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isEditingOpen: false,
	imageData: "",
	originalImageData: "",
	defaultImageData: "",
	currentImageState: null,
	currentMobileImageState: null,
	prevImage:"",
	position: {
		x: 0,
		y: 0,
		s: 1,
	},
	positionEdit: {
		activeId: "",
		status: false,
	},
	tempPositionState: null,
	tempPositionSetState: null,
};

const tempSlice = createSlice({
	name: "tempSlice",
	initialState,
	reducers: {
		setIsEditingOpen: (state, { payload }) => {
			state.isEditingOpen = payload;
		},
		setImageData: (state, { payload }) => {
			state.imageData = payload;
		},
		setOriginalImageData: (state, { payload }) => {
			state.originalImageData = payload;
		},
		setDefaultImageData: (state, { payload }) => {
			state.defaultImageData = payload;
		},
		getCurrentImageState: (state, { payload }) => {
			state.currentImageState = payload;
		},
		getCurrentMobileImageState: (state, { payload }) => {
			state.currentMobileImageState = payload;
		},
		setPosition: (state, { payload }) => {
			state.position.x = payload.x;
			state.position.y = payload.y;
			state.position.s = payload.s;
		},
		setPositionEdit: (state, { payload }) => {
			state.positionEdit.status = payload;
		},
		setActiveId: (state, { payload }) => {
			state.positionEdit.activeId = payload;
		},
		setTempPosition: (state, { payload }) => {
			state.tempPositionState = payload.tempPositionState;
			state.tempPositionSetState = payload.tempPositionSetState;
		},
		setPrevImage: (state, { payload }) => {
			state.prevImage =payload 
		},
	},
});

export const {
	setIsEditingOpen,
	setImageData,
	setOriginalImageData,
	setDefaultImageData,
	getCurrentImageState,
	getCurrentMobileImageState,
	setPosition,
	setPositionEdit,
	setActiveId,
	setTempPosition,
	setPrevImage,
} = tempSlice.actions;

export default tempSlice.reducer;
