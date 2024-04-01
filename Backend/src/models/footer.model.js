import { Schema, model } from "mongoose";

const footerSchema = new Schema(
	{
		logo: {
			type: String,
			required: true,
		},
		address: {
			type: String,
		},
		socialMediaLinks: [
			{
				type: Schema.Types.ObjectId,
				ref: "SocialMediaLinks",
			},
		],
	},
	{ timestamps: true }
);

export const Footer = model("Footer", footerSchema);
