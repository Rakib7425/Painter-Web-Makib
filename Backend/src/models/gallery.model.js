import { Schema, model } from "mongoose";

const gallerySchema = new Schema(
	{
		image: {
			type: String,
			required: true,
		},
		imageTitle: {
			type: String,
		},
		pageTitle: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

export const Gallery = model("Gallery", gallerySchema);
