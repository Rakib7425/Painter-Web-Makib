import { Schema, model } from "mongoose";

const contactUsUserSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: Number,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const ContactUsUser = model("ContactUsUser", contactUsUserSchema);
