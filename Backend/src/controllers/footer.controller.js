import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Footer } from "../models/footer.model.js";
import { SocialMediaLinks } from "../models/socialMediaLinks.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Controller function to add footer data
const addFooterData = asyncHandler(async (req, res) => {
	try {
		// Extract data from the request body
		const { address } = req.body;

		if (!req.file || !req.file.path) {
			throw new ApiError(500, "Logo image file is required");
		}

		const photo_url = await uploadOnCloudinary(req.file.path);
		const socialLinks = await SocialMediaLinks.findOne().populate();

		const newFooter = await Footer.create({
			logo:
				photo_url?.secure_url ||
				"https://www.paintzen.com/wp-content/uploads/2020/01/house-painting-services-2.jpg",
			address,
			socialMediaLinks: socialLinks,
		});

		if (!newFooter) {
			throw new ApiError(500, "Error adding footer data");
		}

		return res
			.status(201)
			.json(new ApiResponse(201, newFooter, "Footer data added successfully"));
		//
	} catch (error) {
		throw new ApiError(500, error.message || "Error adding footer data");
	}
});

// Controller function to update the footer logo
const updateFooterLogo = asyncHandler(async (req, res) => {
	try {
		if (!req.file || !req.file.path) {
			throw new ApiError(500, "Image file is required");
		}

		const logo_url = await uploadOnCloudinary(req.file.path);

		const updatedFooter = await Footer.findOneAndUpdate(
			{},
			{
				logo:
					logo_url?.secure_url ||
					"https://www.paintzen.com/wp-content/uploads/2020/01/house-painting-services-2.jpg",
			},
			{ new: true }
		);

		return res
			.status(200)
			.json(new ApiResponse(200, updatedFooter, "Footer logo updated successfully"));
		//
	} catch (error) {
		throw new ApiError(500, error.message || "Error updating footer logo");
	}
});

// Controller function to get the footer data
const getFooterData = asyncHandler(async (_, res) => {
	try {
		const footerData = await Footer.findOne({}).populate("socialMediaLinks");

		if (!footerData) {
			throw new ApiError(404, "Footer data not found");
		}

		return res
			.status(200)
			.json(new ApiResponse(200, footerData, "Footer data fetched successfully"));
	} catch (error) {
		throw new ApiError(500, error.message || "Error fetching footer data");
	}
});

// Controller function to update the footer data
const updateFooterData = asyncHandler(async (req, res) => {
	try {
		const { address } = req.body;

		let updateFields = {};

		if (req.file && req.file.path) {
			const photoUrl = await uploadOnCloudinary(req.file.path);
			updateFields.logo =
				photoUrl?.secure_url ||
				"https://www.paintzen.com/wp-content/uploads/2020/01/house-painting-services-2.jpg";
		}

		if (address) {
			updateFields.address = address;
		}

		const socialLinks = await SocialMediaLinks.findOne().populate();

		const updatedFooter = await Footer.findOneAndUpdate(
			{},
			{ ...updateFields, socialMediaLinks: socialLinks },
			{ new: true }
		);

		return res
			.status(200)
			.json(new ApiResponse(200, updatedFooter, "Footer data updated successfully"));
	} catch (error) {
		throw new ApiError(500, error.message || "Error updating footer data");
	}
});

export { addFooterData, updateFooterLogo, getFooterData, updateFooterData };
