import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Service } from "../models/service.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Controller function to add a new service
const addService = asyncHandler(async (req, res) => {
	const { title, description, readMoreLink } = req.body;

	if (!req.file.path) {
		throw new ApiError(500, "Image file is required");
	}

	const image_url = await uploadOnCloudinary(req.file.path);

	const newService = await Service.create({
		title,
		description,
		readMoreLink,
		image:
			image_url?.secure_url ||
			"https://www.paintzen.com/wp-content/uploads/2020/01/house-painting-services-2.jpg",
	});

	if (!newService) {
		throw new ApiError(500, "Error adding service");
	}

	return res.status(201).json(new ApiResponse(201, newService, "Service added successfully"));
});

// Controller function to get all services (Public route)
const getServices = asyncHandler(async (_, res) => {
	const services = await Service.find({});

	if (!services) {
		throw new ApiError(500, "Error fetching services");
	}

	return res.status(200).json(new ApiResponse(200, services, "Services fetched successfully"));
});

// Controller function to update a service
const updateService = asyncHandler(async (req, res) => {
	const { _id, title, description, readMoreLink } = req.body;

	let updateFields = { title, description, readMoreLink };

	if (req.file && req.file.path) {
		const photo_url = await uploadOnCloudinary(req.file.path);

		updateFields.image =
			photo_url?.secure_url ||
			"https://www.paintzen.com/wp-content/uploads/2020/01/house-painting-services-2.jpg";
	}

	const updatedService = await Service.findByIdAndUpdate({ _id }, updateFields, { new: true });

	if (!updatedService) {
		throw new ApiError(404, "Service not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, updatedService, "Service updated successfully"));
});

// Controller function to delete a service
const deleteService = asyncHandler(async (req, res) => {
	const deletedService = await Service.findByIdAndDelete({ _id: req.body._id });

	if (!deletedService) {
		throw new ApiError(500, "Service not found! Error deleting service");
	}

	return res.status(200).json(new ApiResponse(200, null, "Service deleted successfully"));
});

export { addService, getServices, updateService, deleteService };
