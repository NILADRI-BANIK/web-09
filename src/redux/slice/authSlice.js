import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../components/Hooks/axios";

const initialState = {
	userId: "",
	user: null,
	currentUserId: "",
	currentUser: null,
	token: "",
	templateUserId: "",
	templateId: "",
	templateData: null,
	isLoading: true,
	isWaiting: false,
	waitingPer: 0,
	width: 0,
	height: 0,
	isMobile: false,
};

export const fetchTemplateData = createAsyncThunk("fetchTemplateData", async (id) => {
	const response = await axios.get(`/persona/user-template/${id}`);
	return response.data;
});

export const fetchUserData = createAsyncThunk("fetchUserData", async (id) => {
	const response = await axios.get(`/auth/get-user-details/${id}`);
	return response.data;
});

export const fetchCurrentData = createAsyncThunk("fetchCurrentData", async (id) => {
	const response = await axios.get(`/auth/get-user-details/${id}`);
	return response.data;
});

export const fetchDefaultTemplate = createAsyncThunk("fetchDefaultTemplate", async (id) => {
	const response = await axios.get(`/persona/template/${id}`);
	return response.data;
});

export const fetchPrevUserTemplate = createAsyncThunk("fetchPrevUserTemplate", async (id) => {
	const response = await axios.get(`/persona/user-template/${id}`);
	return response.data;
});

const authSlice = createSlice({
	name: "authSlice",
	initialState,
	reducers: {
		saveTokenData: (state, { payload }) => {
			state.token = payload;
		},

		updateTemplateData: (state, { payload }) => {
			state.templateData = payload;
		},

		setWaiting: (state, { payload }) => {
			state.isWaiting = payload;
		},

		setWaitingPer: (state, { payload }) => {
			state.waitingPer = payload;
		},

		setIsMobile: (state, { payload }) => {
			state.isMobile = window.innerWidth < 900 && window.innerHeight > 550;
			state.width = payload.width;
			state.height = payload.height;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTemplateData.pending, (state, { payload }) => {
			state.isLoading = true;
		});
		builder.addCase(fetchTemplateData.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.templateUserId = payload[0]?._id;
			state.templateId = payload[0].templateId;
			state.templateData = payload[0].finalTemplateData;
		});
		builder.addCase(fetchCurrentData.fulfilled, (state, { payload }) => {
			state.currentUser = payload;
			state.currentUserId = state.currentUser?._id;
		});
		builder.addCase(fetchUserData.pending, (state, { payload }) => {
			state.isLoading = true;
		});
		builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.user = payload;
			state.userId = state.user._id;
		});
		builder.addCase(fetchDefaultTemplate.pending, (state, { payload }) => {
			state.isLoading = true;
		});
		builder.addCase(fetchDefaultTemplate.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.templateId = payload._id;
			state.templateData = payload.details;
		});
		builder.addCase(fetchPrevUserTemplate.pending, (state, { payload }) => {
			state.isLoading = true;
		});
		builder.addCase(fetchPrevUserTemplate.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.templateUserId = payload[0]?._id;
			state.templateId = payload[0].templateId;
			state.templateData = payload[0].previousTemplateData;
		});
	},
});

export const { saveTokenData, updateTemplateData, setWaiting, setWaitingPer, setIsMobile } = authSlice.actions;
export default authSlice.reducer;
