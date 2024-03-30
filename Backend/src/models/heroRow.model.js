import { Schema, model } from "mongoose";

const heroRowSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
		},
		image: {
			type: String, // Cloudinary Image URL
		},
		imagePosition: {
			type: String,
			default: "left",
		},
		getStartedLink: {
			type: String,
			default: "/contact",
		},
	},
	{ timestamps: true }
);

export const HeroRow = model("HeroRow", heroRowSchema);
