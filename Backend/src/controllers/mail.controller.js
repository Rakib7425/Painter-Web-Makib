import nodemailer from "nodemailer";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const sendMail = asyncHandler(async (req, res) => {
	console.log("sending mail...");

	try {
		const html = req.body.html;
		const email = req.body.candidateEmail;
		const emailBody = req.body.emailBody;

		// console.log(emailBody);

		if (!html) {
			throw new ApiError(400, "html Content is required!");
		}
		if (!email) {
			throw new ApiError(400, "Email is required!");
		}
		if (!emailBody) {
			throw new ApiError(400, "Email body Content is required!");
		}

		// Generate the PDF file
		// const newPDF = await makePDF(html);

		// Create a Nodemailer transporter
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.ADMIN_USER_EMAIL,
				pass: process.env.ADMIN_EMAIL_CUSTOM_APP_PASSWORD,
			},
		});

		// Set up PDF attachment
		const pdfAttachment = {
			filename: "htmlDoc.pdf",
			// content: newPDF,
		};

		// Send email with attachment
		const mailOptions = {
			from: process.env.ADMIN_USER_EMAIL,
			to: email,
			subject: "Job appointment letter",
			text: emailBody,
			attachments: [pdfAttachment],
		};

		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent:", info.response);

		return res.status(200).json(new ApiResponse(200, info.response, "Mail sent successfully!"));
	} catch (error) {
		console.error("Error sending email: ", error);
		throw new ApiError(
			500,
			error?.message || "Something went wrong while sending mail to candidate!!"
		);
	}
});
