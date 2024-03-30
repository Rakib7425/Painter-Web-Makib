import { Schema, model } from "mongoose";

const contactUsAdminSchema = new Schema(
	{
		address: {
			type: String,
		},
		firstPhoneNo: {
			type: String,
		},
		secondPhoneNo: {
			type: String,
		},
		mapLink: {
			type: String,
		},
		email: {
			type: String,
		},
	},
	{ timestamps: true }
);

export const ContactUsAdmin = model("ContactUsAdmin", contactUsAdminSchema);
