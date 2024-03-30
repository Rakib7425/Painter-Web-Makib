import { Schema, model } from "mongoose";

const addressSchema = new Schema(
	{
		address: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Address = model("Address", addressSchema);
