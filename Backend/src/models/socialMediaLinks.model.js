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
			type: Number,
		},
		email: {
			type: Number,
		},
	},
	{ timestamps: true }
);

export const SocialMediaLinks = model("SocialMediaLinks", socialMediaLinksSchema);
