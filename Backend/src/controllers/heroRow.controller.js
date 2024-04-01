import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { HeroRow } from "../models/heroRow.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Controller function to add a hero row
const addHeroRow = asyncHandler(async (req, res) => {
	try {
		const {
			title,
			description,
			imagePosition = "left",
			getStartedLink = "/contact",
		} = req.body;

		if (!req.file || !req.file.path) {
			throw new ApiError(500, "Image file is required");
		}

		const image_url = await uploadOnCloudinary(req.file.path);

		const newHeroRow = await HeroRow.create({
			title,
			description,
			image:
				image_url?.secure_url ||
				"https://www.paintzen.com/wp-content/uploads/2020/01/house-painting-services-2.jpg",
			imagePosition,
			getStartedLink,
		});

		if (!newHeroRow) {
			throw new ApiError(500, "Error adding hero row");
		}

		return res
			.status(201)
			.json(new ApiResponse(201, newHeroRow, "Hero row added successfully"));
		//
	} catch (error) {
		throw new ApiError(500, error.message || "Error adding hero row");
	}
});

// Controller function to get all hero rows
const getHeroRows = asyncHandler(async (_, res) => {
	try {
		const heroRows = await HeroRow.find({});

		return res
			.status(200)
			.json(new ApiResponse(200, heroRows, "Hero rows fetched successfully"));
	} catch (error) {
		throw new ApiError(500, error.message || "Error fetching hero rows");
	}
});

// Controller function to update a hero row
const updateHeroRow = asyncHandler(async (req, res) => {
	try {
		let updateFields = {
			title: req.body.title,
			description: req.body.description,
			imagePosition: req.body.imagePosition || "left",
			getStartedLink: req.body.getStartedLink || "/contact",
		};

		if (req.file && req.file.path) {
			const image_url = await uploadOnCloudinary(req.file.path);
			updateFields.image =
				image_url?.secure_url ||
				"https://www.paintzen.com/wp-content/uploads/2020/01/house-painting-services-2.jpg";
		}

		// Find the hero row by ID and update it with the specified fields
		const updatedHeroRow = await HeroRow.findByIdAndUpdate(req.body._id, updateFields, {
			new: true,
		});

		if (!updatedHeroRow) {
			throw new ApiError(500, "Error updating hero row");
		}

		return res
			.status(200)
			.json(new ApiResponse(200, updatedHeroRow, "Hero row updated successfully"));
	} catch (error) {
		throw new ApiError(500, error.message || "Error updating hero row");
	}
});

// Controller function to delete a hero row
const deleteHeroRow = asyncHandler(async (req, res) => {
	const deletedHeroRow = await HeroRow.findByIdAndDelete(req.body._id);

	if (!deletedHeroRow) {
		throw new ApiError(404, "Hero row not found! Error deleting hero row");
	}

	return res.status(200).json(new ApiResponse(200, {}, "Hero row deleted successfully"));
});

export { addHeroRow, getHeroRows, updateHeroRow, deleteHeroRow };
