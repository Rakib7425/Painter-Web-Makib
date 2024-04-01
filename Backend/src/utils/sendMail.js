import nodemailer from "nodemailer";

const sendMail = async (email, html = <hr />, emailBody = `Hey ${email}`, subject) => {
	try {
		// if (!html) {
		// 	throw new Error("HTML content is required!");
		// }

		if (!email) {
			throw new Error("Email is required!");
		}
		if (!emailBody) {
			throw new Error("Email body content is required!");
		}

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

		// Set up email options
		const mailOptions = {
			from: process.env.ADMIN_USER_EMAIL,
			to: email,
			subject: subject,
			html: html,
			text: emailBody,
		};

		// Send email
		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent:", info.response);

		return info.response;
	} catch (error) {
		console.error("Error sending email: ", error);
		throw error;
	}
};

export default sendMail;
