import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Gallery } from "../models/gallery.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Controller function to add image to the gallery
const addImage = asyncHandler(async (req, res) => {
	const { imageTitle, pageTitle } = req.body;
	const imagePath = req.file.path;

	if (!imagePath) {
		throw new ApiError(500, "Image file is required!");
	}

	const { secure_url } =
		(await uploadOnCloudinary(imagePath)) ||
		"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";

	const newImage = await Gallery.create({ image: secure_url, imageTitle, pageTitle });
	if (!newImage) {
		throw new ApiError(500, "Error adding image to gallery");
	}

	return res.status(201).json(new ApiResponse(201, newImage, "Image added successfully"));
});

// Controller function to get all images from the gallery
const getImages = asyncHandler(async (req, res) => {
	const images = await Gallery.find({});
	if (!images) {
		throw new ApiError(500, "Error fetching images from gallery");
	}
	return res.status(200).json(new ApiResponse(200, images, "Images fetched successfully"));
});

// Controller function to update image
const updateImage = asyncHandler(async (req, res) => {
	const { _id, imageTitle, pageTitle } = req.body;

	const imagePath = req.file.path;

	if (!imagePath) {
		throw new ApiError(500, "Image file is required!");
	}

	const { secure_url } =
		(await uploadOnCloudinary(imagePath)) ||
		"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";

	const updatedImage = await Gallery.findByIdAndUpdate(
		{ _id },
		{ image: secure_url, imageTitle, pageTitle },
		{ new: true }
	);

	if (!updateImage) {
		throw new ApiError(500, "Error updating image in gallery");
	}
	return res.status(200).json(new ApiResponse(200, updatedImage, "Image updated successfully"));
});

// Controller function to delete an image from the gallery
const deleteImage = asyncHandler(async (req, res) => {
	const deletedImage = await Gallery.findByIdAndDelete({ _id: req.body._id });

	if (!deletedImage) {
		throw new ApiError(500, "Image not found! Error deleting image from gallery");
	}
	return res.status(200).json(new ApiResponse(200, null, "Image deleted successfully"));
});

export { addImage, getImages, updateImage, deleteImage };
