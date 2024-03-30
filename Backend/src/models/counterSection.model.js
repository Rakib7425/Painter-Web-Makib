import { Schema, model } from "mongoose";

const counterSectionSchema = new Schema(
	{
		experienceInMonth: {
			type: Number,
			required: true,
			trim: true,
		},
		followersOnFacebook: {
			type: Number,
			index: true,
		},
		percentageOfPositiveFeedback: {
			type: Number,
		},
		totalProjectsCompleted: {
			type: Number,
		},
	},
	{ timestamps: true }
);

export const CounterSection = model("CounterSection", counterSectionSchema);
