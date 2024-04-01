import { Schema, model } from "mongoose";

const socialMediaLinksSchema = new Schema(
	{
		instagramLink: {
			type: String,
			required: true,
			trim: true,
		},
		facebookLink: {
			type: String,
		},
		whatsAppLink: {
			type: String,
		},
		email: {
			type: String,
		},
	},
	{ timestamps: true }
);

export const SocialMediaLinks = model("SocialMediaLinks", socialMediaLinksSchema);
