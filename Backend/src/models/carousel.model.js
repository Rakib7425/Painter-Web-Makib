import { Schema, model } from "mongoose";

const carouselSchema = new Schema(
	{
		image: {
			type: String, // Cloudinary Image Url
		},
		imageTitle: {
			type: String,
		},
		exploreMoreLink: {
			type: String,
			default: "/services",
		},
	},
	{ timestamps: true }
);

export const Carousel = model("Carousel", carouselSchema);
