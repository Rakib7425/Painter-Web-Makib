import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Carousel } from "../models/carousel.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Controller function to add a carousel image
const addCarouselImage = asyncHandler(async (req, res) => {
	const { imageTitle, exploreMoreLink } = req.body;

	if (!req.file || !req.file.path) {
		throw new ApiError(500, "Image file is required");
	}

	const photo_url = await uploadOnCloudinary(req.file.path);

	const newCarouselImage = await Carousel.create({
		image:
			photo_url?.secure_url ||
			"https://www.paintzen.com/wp-content/uploads/2020/01/house-painting-services-2.jpg",
		imageTitle: imageTitle || "",
		exploreMoreLink: exploreMoreLink || "/services",
	});

	if (!newCarouselImage) {
		throw new ApiError(500, "Error adding carousel image");
	}

	return res
		.status(201)
		.json(new ApiResponse(201, newCarouselImage, "Carousel image added successfully"));
});

// Controller function to get all carousel images
const getCarouselImages = asyncHandler(async (_, res) => {
	const carouselImages = await Carousel.find({});

	if (!carouselImages) {
		throw new ApiError(500, error.message || "Error fetching carousel images");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, carouselImages, "Carousel images fetched successfully"));
});

// Controller function to update a carousel image
const updateCarouselImage = asyncHandler(async (req, res) => {
	const { _id, imageTitle, exploreMoreLink } = req.body;

	if (!req.file || !req.file.path) {
		throw new ApiError(500, "Image file is required");
	}
	const photo_url = await uploadOnCloudinary(req.file.path);

	const updatedCarouselImage = await Carousel.findByIdAndUpdate(
		{ _id },
		{
			image:
				photo_url?.secure_url ||
				"https://www.paintzen.com/wp-content/uploads/2020/01/house-painting-services-2.jpg",
			imageTitle: imageTitle,
			exploreMoreLink: exploreMoreLink || "/services",
		},
		{ new: true }
	);

	if (!updatedCarouselImage) {
		throw new ApiError(500, error.message || "Error updating carousel image");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, updatedCarouselImage, "Carousel image updated successfully"));
});

// Controller function to delete a carousel image
const deleteCarouselImage = asyncHandler(async (req, res) => {
	const deletedCarouselImage = await Carousel.findByIdAndDelete(req.body._id);

	if (!deletedCarouselImage) {
		throw new ApiError(404, "Carousel image not found");
	}

	return res.status(200).json(new ApiResponse(200, {}, "Carousel image deleted successfully"));
});

export { addCarouselImage, getCarouselImages, updateCarouselImage, deleteCarouselImage };
