import { Schema, model } from "mongoose";

const serviceSchema = new Schema(
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
			type: String,
		},
		readMoreLink: {
			type: String,
			default: "/contact",
		},
	},
	{ timestamps: true }
);

export const Service = model("Service", serviceSchema);
