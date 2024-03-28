import fs from "fs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (adminId) => {
	try {
		const admin = await Admin.findById(adminId);
		const accessToken = admin.generateAccessToken();
		const refreshToken = admin.generateRefreshToken();

		admin.refreshToken = refreshToken;
		await admin.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(500, "Something went wrong while generating refresh and access token");
	}
};

const registerAdmin = asyncHandler(async (req, res) => {
	const { fullName, email, username, password } = req.body;
	//console.log("email: ", email);

	if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
		throw new ApiError(400, "All fields are required");
	}
	const avatarLocalPath = req.file?.path;

	const existedAdmin = await Admin.findOne({
		$or: [{ username }, { email }],
	});

	if (existedAdmin) {
		fs.unlinkSync(avatarLocalPath);
		throw new ApiError(409, "Admin with email or username already exists");
	}

	if (!avatarLocalPath) {
		throw new ApiError(400, "Avatar file is required");
	}

	const avatar =
		(await uploadOnCloudinary(avatarLocalPath)) ||
		"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";

	// if (!avatar) {
	// 	throw new ApiError(400, "Avatar file is required");
	// }

	const admin = await Admin.create({
		fullName,
		avatar:
			avatar.secure_url ||
			"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
		email,
		password,
		username: username.toLowerCase(),
	});

	const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

	if (!createdAdmin) {
		throw new ApiError(500, "Something went wrong while registering the admin");
	}

	return res
		.status(201)
		.json(new ApiResponse(200, createdAdmin, "Admin registered Successfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
	// req body -> data
	// username or email
	//find the admin
	//password check
	//access and refresh token
	//send cookie

	const { email, username, password } = req.body;
	// console.log(email);

	if (!username && !email) {
		throw new ApiError(400, "username or email is required");
	}

	const admin = await Admin.findOne({
		$or: [{ username }, { email }],
	});

	if (!admin) {
		throw new ApiError(404, "Admin does not exist");
	}

	const isPasswordValid = await admin.isPasswordCorrect(password);

	if (!isPasswordValid) {
		throw new ApiError(401, "Invalid admin credentials");
	}

	const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin._id);

	const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(
			new ApiResponse(
				200,
				{
					admin: loggedInAdmin,
					accessToken,
					refreshToken,
				},
				"Admin logged In Successfully"
			)
		);
});

const logoutAdmin = asyncHandler(async (req, res) => {
	await Admin.findByIdAndUpdate(
		req.admin._id,
		{
			$unset: {
				refreshToken: 1, // this removes the field from document
			},
		},
		{
			new: true,
		}
	);

	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json(new ApiResponse(200, {}, "Admin logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
	const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

	if (!incomingRefreshToken) {
		throw new ApiError(401, "unauthorized request");
	}

	try {
		const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

		const admin = await Admin.findById(decodedToken?._id);

		if (!admin) {
			throw new ApiError(401, "Invalid refresh token");
		}

		if (incomingRefreshToken !== admin?.refreshToken) {
			throw new ApiError(401, "Refresh token is expired or used");
		}

		const options = {
			httpOnly: true,
			secure: true,
		};

		const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(admin._id);

		return res
			.status(200)
			.cookie("accessToken", accessToken, options)
			.cookie("refreshToken", newRefreshToken, options)
			.json(
				new ApiResponse(
					200,
					{ accessToken, refreshToken: newRefreshToken },
					"Access token refreshed"
				)
			);
	} catch (error) {
		throw new ApiError(401, error?.message || "Invalid refresh token");
	}
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	const admin = await Admin.findById(req.admin?._id);
	const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword);

	if (!isPasswordCorrect) {
		throw new ApiError(400, "Invalid old password");
	}

	admin.password = newPassword;
	await admin.save({ validateBeforeSave: false });

	return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentAdmin = asyncHandler(async (req, res) => {
	return res.status(200).json(new ApiResponse(200, req.admin, "Admin fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
	const { fullName, email } = req.body;

	if (!fullName || !email) {
		throw new ApiError(400, "All fields are required");
	}

	const admin = await Admin.findByIdAndUpdate(
		req.admin?._id,
		{
			$set: {
				fullName,
				email: email,
			},
		},
		{ new: true }
	).select("-password");

	return res
		.status(200)
		.json(new ApiResponse(200, admin, "Account details updated successfully"));
});

const updateAdminAvatar = asyncHandler(async (req, res) => {
	const avatarLocalPath = req.file?.path;

	if (!avatarLocalPath) {
		throw new ApiError(400, "Avatar file is missing");
	}

	//TODO: delete old image - assignment

	const avatar = await uploadOnCloudinary(avatarLocalPath);

	if (!avatar.url) {
		throw new ApiError(400, "Error while uploading on avatar");
	}

	const admin = await Admin.findByIdAndUpdate(
		req.admin?._id,
		{
			$set: {
				avatar: avatar.url,
			},
		},
		{ new: true }
	).select("-password");

	return res.status(200).json(new ApiResponse(200, admin, "Avatar image updated successfully"));
});

const updateAdminCoverImage = asyncHandler(async (req, res) => {
	const coverImageLocalPath = req.file?.path;

	if (!coverImageLocalPath) {
		throw new ApiError(400, "Cover image file is missing");
	}

	//TODO: delete old image - assignment

	const coverImage = await uploadOnCloudinary(coverImageLocalPath);

	if (!coverImage.url) {
		throw new ApiError(400, "Error while uploading on avatar");
	}

	const admin = await Admin.findByIdAndUpdate(
		req.admin?._id,
		{
			$set: {
				coverImage: coverImage.url,
			},
		},
		{ new: true }
	).select("-password");

	return res.status(200).json(new ApiResponse(200, admin, "Cover image updated successfully"));
});

const getWatchHistory = asyncHandler(async (req, res) => {
	const admin = await Admin.aggregate([
		{
			$match: {
				_id: new mongoose.Types.ObjectId(req.admin._id),
			},
		},
		{
			$lookup: {
				from: "videos",
				localField: "watchHistory",
				foreignField: "_id",
				as: "watchHistory",
				pipeline: [
					{
						$lookup: {
							from: "admins",
							localField: "owner",
							foreignField: "_id",
							as: "owner",
							pipeline: [
								{
									$project: {
										fullName: 1,
										username: 1,
										avatar: 1,
									},
								},
							],
						},
					},
					{
						$addFields: {
							owner: {
								$first: "$owner",
							},
						},
					},
				],
			},
		},
	]);

	return res
		.status(200)
		.json(new ApiResponse(200, admin[0].watchHistory, "Watch history fetched successfully"));
});
const getAllAdmins = asyncHandler(async (req, res) => {
	const dbRes = await Admin.find({});
	res.status(200).send(dbRes);
});

export {
	registerAdmin,
	loginAdmin,
	logoutAdmin,
	refreshAccessToken,
	changeCurrentPassword,
	getCurrentAdmin,
	updateAccountDetails,
	updateAdminAvatar,
	updateAdminCoverImage,
	getWatchHistory,
	getAllAdmins,
};
