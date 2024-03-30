import { Schema, model } from "mongoose";

const happyUserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		message: {
			type: String,
		},
		photo: {
			type: String,
		},
		contact: {
			type: String,
			default: "/contact",
		},
		feedbackStars: {
			type: Number,
		},
	},
	{ timestamps: true }
);

export const HappyUser = model("HappyUser", happyUserSchema);
