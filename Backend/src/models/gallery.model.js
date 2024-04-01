import { Schema, model } from "mongoose";

const gallerySchema = new Schema(
	{
		image: {
			type: String, // cloudinary image url
			required: true,
		},
		imageTitle: {
			type: String,
			default: "A Image",
		},
		pageTitle: {
			type: String,
			default: "Gallery",
		},
	},
	{ timestamps: true }
);

export const Gallery = model("Gallery", gallerySchema);
