import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { TeamMember } from "../models/teamMember.model.js";

const addMember = asyncHandler(async (req, res) => {
	const { name, email, phone, photo, designation } = req.body;

	// Create a new team member instance
	const newMember = await TeamMember.create({ name, email, phone, photo, designation });

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
	const { _id, name, email, phone, photo, designation } = req.body;

	const updatedMember = await TeamMember.findByIdAndUpdate(
		{ _id },
		{ name, email, phone, photo, designation },
		{ new: true }
	);

	if (!updatedMember) {
		throw new ApiError(500, "Error updating team member");
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
