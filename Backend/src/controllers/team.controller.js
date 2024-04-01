import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { TeamMember } from "../models/teamMember.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addMember = asyncHandler(async (req, res) => {
	const { name, email, phone, designation } = req.body;

	if (!req.file.path) {
		throw new ApiError(500, "Image file is required");
	}

	const photo_url = await uploadOnCloudinary(req.file.path);

	// Create a new team member instance
	const newMember = await TeamMember.create({
		name,
		email,
		phone,
		photo:
			photo_url?.secure_url ||
			"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
		designation,
	});

	if (!newMember) {
		throw new ApiError(500, "Error adding team member");
	}

	return res.status(201).json(new ApiResponse(201, newMember, "Team member added successfully"));
});

const getMembers = asyncHandler(async (req, res) => {
	const members = await TeamMember.find({});

	if (!members) {
		throw new ApiError(500, "Error fetching team members");
	}
	return res.status(200).json(new ApiResponse(200, members, "Team members fetched successfully"));
});

const updateMember = asyncHandler(async (req, res) => {
	const { _id, name, email, phone, designation } = req.body;

	let updateFields = { name, email, phone, designation };

	if (req.file && req.file.path) {
		const photo_url = await uploadOnCloudinary(req.file.path);
		updateFields.photo =
			photo_url?.secure_url ||
			"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";
	}

	const updatedMember = await TeamMember.findByIdAndUpdate({ _id }, updateFields, { new: true });

	if (!updatedMember) {
		throw new ApiError(404, "Member not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, updatedMember, "Team member updated successfully"));
});

const deleteMember = asyncHandler(async (req, res) => {
	const deletedMember = await TeamMember.findByIdAndDelete({ _id: req.body._id });

	if (!deletedMember) {
		throw new ApiError(500, "User Not found! Error deleting team member");
	}

	return res.status(200).json(new ApiResponse(200, null, "Team member deleted successfully"));
});

export { addMember, getMembers, updateMember, deleteMember };
