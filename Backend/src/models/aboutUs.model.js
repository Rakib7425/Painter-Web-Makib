import { Schema, model } from "mongoose";

const aboutUsSchema = new Schema(
	{
		title: {
			type: String,
			default: "About us",
		},
		description: {
			type: String,
			required: true,
		},
		photo: {
			type: String, // Cloudinary image url
		},
	},
	{ timestamps: true }
);

export const AboutUs = model("AboutUs", aboutUsSchema);
