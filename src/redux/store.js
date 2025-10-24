import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import tempSlice from "./slice/tempSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		temp: tempSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;

export const defaultPostData = [
	{
		_id: "64ff663c696979dc749a0d20",
		userId: {
			_id: "64d33c54b6a7b2fb0be633dc",
			username: "Rohan",
			ProfilePic: "https://res.cloudinary.com/dzarrma99/image/upload/v1694286433/ualwwjxvibxxtohmmxbv.jpg",
			GetstatedName: "Rohan_cc67a597",
			displayName: "Rohan Mondal",
		},
		mediaType: "image",
		mediaUrl: ["https://res.cloudinary.com/dzarrma99/image/upload/v1692785938/ceoj1ibybmkzqib09eco.jpg"],
		LikeCount: 1,
		caption: "",
		Comments: [],
	},
	{
		_id: "64ff663c696979dc749a0d20",
		userId: {
			_id: "64d33c54b6a7b2fb0be633dc",
			username: "Rohan",
			ProfilePic: "https://res.cloudinary.com/dzarrma99/image/upload/v1694286433/ualwwjxvibxxtohmmxbv.jpg",
			GetstatedName: "Rohan_cc67a597",
			displayName: "Rohan Mondal",
		},
		mediaType: "image",
		mediaUrl: ["https://res.cloudinary.com/dzarrma99/image/upload/v1693217687/uiszr8kt9ldn1meqc2i3.jpg"],
		LikeCount: 1,
		caption: "",
		Comments: [],
	},
	{
		_id: "64ff663c696979dc749a0d20",
		userId: {
			_id: "64d33c54b6a7b2fb0be633dc",
			username: "Rohan",
			ProfilePic: "https://res.cloudinary.com/dzarrma99/image/upload/v1694286433/ualwwjxvibxxtohmmxbv.jpg",
			GetstatedName: "Rohan_cc67a597",
			displayName: "Rohan Mondal",
		},
		mediaType: "image",
		mediaUrl: ["https://res.cloudinary.com/dzarrma99/image/upload/v1692786716/nk0iogprdjqsoqiasuwt.png"],
		LikeCount: 1,
		caption: "",
		Comments: [],
	},
	{
		_id: "64ff663c696979dc749a0d20",
		userId: {
			_id: "64d33c54b6a7b2fb0be633dc",
			username: "Rohan",
			ProfilePic: "https://res.cloudinary.com/dzarrma99/image/upload/v1694286433/ualwwjxvibxxtohmmxbv.jpg",
			GetstatedName: "Rohan_cc67a597",
			displayName: "Rohan Mondal",
		},
		mediaType: "image",
		mediaUrl: ["https://res.cloudinary.com/dzarrma99/image/upload/v1692943902/fp2j15ltom0bmvvjuzuk.jpg"],
		LikeCount: 1,
		caption: "",
		Comments: [],
	},
	{
		_id: "64ff663c696979dc749a0d20",
		userId: {
			_id: "64d33c54b6a7b2fb0be633dc",
			username: "Rohan",
			ProfilePic: "https://res.cloudinary.com/dzarrma99/image/upload/v1694286433/ualwwjxvibxxtohmmxbv.jpg",
			GetstatedName: "Rohan_cc67a597",
			displayName: "Rohan Mondal",
		},
		mediaType: "image",
		mediaUrl: ["https://res.cloudinary.com/dzarrma99/image/upload/v1692785259/ycuo2a5adp8evlq9lba5.jpg"],
		LikeCount: 1,
		caption: "",
		Comments: [],
	},
];

export const defaultProductData = [
	{
		_id: "64ff663c696979dc749a0d20",
		userId: {
			_id: "64d33c54b6a7b2fb0be633dc",
			username: "Rohan",
			ProfilePic: "https://res.cloudinary.com/dzarrma99/image/upload/v1694286433/ualwwjxvibxxtohmmxbv.jpg",
			GetstatedName: "Rohan_cc67a597",
			displayName: "Rohan Mondal",
		},
		mediaType: "image",
		mediaUrl: "https://res.cloudinary.com/dzarrma99/image/upload/v1701949011/w9bfpwco9xjhurzohnju.png",
		LikeCount: 1,
		caption: "",
		Comments: [],
		productName: "VR Headset-V16",
	},
	{
		_id: "64ff663c696979dc749a0d20",
		userId: {
			_id: "64d33c54b6a7b2fb0be633dc",
			username: "Rohan",
			ProfilePic: "https://res.cloudinary.com/dzarrma99/image/upload/v1694286433/ualwwjxvibxxtohmmxbv.jpg",
			GetstatedName: "Rohan_cc67a597",
			displayName: "Rohan Mondal",
		},
		mediaType: "image",
		mediaUrl: "https://res.cloudinary.com/dzarrma99/image/upload/v1701949040/ntnvxsvlvdom8nvffwsv.png",
		LikeCount: 1,
		caption: "",
		Comments: [],
		productName: "VR Headset-V16",
	},
	{
		_id: "64ff663c696979dc749a0d20",
		userId: {
			_id: "64d33c54b6a7b2fb0be633dc",
			username: "Rohan",
			ProfilePic: "https://res.cloudinary.com/dzarrma99/image/upload/v1694286433/ualwwjxvibxxtohmmxbv.jpg",
			GetstatedName: "Rohan_cc67a597",
			displayName: "Rohan Mondal",
		},
		mediaType: "image",
		mediaUrl: "https://res.cloudinary.com/dzarrma99/image/upload/v1701949059/ybp0zrhzyvs6oyne9zag.png",
		LikeCount: 1,
		caption: "",
		Comments: [],
		productName: "VR Headset-V16",
	},
	// {
	// 	_id: "64ff663c696979dc749a0d20",
	// 	userId: {
	// 		_id: "64d33c54b6a7b2fb0be633dc",
	// 		username: "Rohan",
	// 		ProfilePic: "https://res.cloudinary.com/dzarrma99/image/upload/v1694286433/ualwwjxvibxxtohmmxbv.jpg",
	// 		GetstatedName: "Rohan_cc67a597",
	// 		displayName: "Rohan Mondal",
	// 	},
	// 	mediaType: "image",
	// 	mediaUrl: "https://res.cloudinary.com/dzarrma99/image/upload/v1701949059/ybp0zrhzyvs6oyne9zag.png",
	// 	LikeCount: 1,
	// 	caption: "",
	// 	Comments: [],
	// 	productName: "VR Headset-V16",
	// },
];