import { Schema, model } from "mongoose";

const teamUserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			index: true, // Add index for potential query optimization
		},
		phone: {
			type: String,
			required: true,
		},
		photo: {
			type: String, // Cloudinary image URL
		},
		designation: {
			type: String,
		},
	},
	{ timestamps: true }
);

export const TeamUser = model("TeamUser", teamUserSchema);
