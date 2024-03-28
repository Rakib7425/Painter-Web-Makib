import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { reuseInputClassnames } from "../constant/adminConstants";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../store/slices/userSlice";
import ContentWrapper from "../components/ContentWrapper";

const ContactUs = () => {
	const [userData, setUserData] = useState([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((store) => store.user.userDetails);

	useEffect(() => {
		if (userData?.token || user?.token) {
			navigate("/");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm();

	// eslint-disable-next-line no-unused-vars
	const password = watch("password");

	const onSubmit = async (localData) => {
		try {
			// console.log(previewSource);

			const headersList = {
				Accept: "*/*",
			};

			const formData = new FormData();
			formData.append("fullName", localData.fullName);
			formData.append("email", localData.email);
			formData.append("password", localData.password);
			formData.append("role", localData.role);

			const bodyContent = formData;

			const reqOptions = {
				url: "registerUserApi",
				method: "POST",
				headers: headersList,
				data: bodyContent,
			};

			const { data } = await axios.request(reqOptions);
			console.log(data);

			if (!data.token) {
				return toast.error(data.message || "User Adding Failed");
			}

			dispatch(setUser(data));
			setUserData(data);
			// console.log(data);
			return toast.success(`${data?.message || "Successfully Registered!"}`);
		} catch (error) {
			console.log(error);
			toast.error(
				error.response.data.error + " Slow Internet !" ||
					"Error occurred during Registering."
			);
		}
	};

	return (
		<ContentWrapper>
			<h2 className='text-2xl md:pt-20 font-bold text-gray-800 lg:text-3xl dark:text-white text-start'>
				Contact us
			</h2>
			<div className='w-full flex flex-col justify-center items-center md:flex-row md:items-start'>
				<div className='left h-full'>
					<section className='py-6 mt-5 rounded-l-md dark:bg-gray-900 h-full text-gray-900 dark:text-white px-8 '>
						<div className='py-6 md:py-0 md:px-6'>
							<h1 className='text-4xl font-bold'>Get in touch</h1>
							<p className='pt-2 pb-4'>Fill in the form to start a conversation</p>
							<div className='space-y-4'>
								<p className='flex items-center'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='w-5 h-5 mr-2 sm:mr-6'
									>
										<path
											fillRule='evenodd'
											d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
											clipRule='evenodd'
										></path>
									</svg>
									<span>Fake address, 9999 City</span>
								</p>
								<p className='flex items-center'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='w-5 h-5 mr-2 sm:mr-6'
									>
										<path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z'></path>
									</svg>
									<span>123456789</span>
								</p>
								<p className='flex items-center'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='w-5 h-5 mr-2 sm:mr-6'
									>
										<path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'></path>
										<path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'></path>
									</svg>
									<span>contact@business.com</span>
								</p>
							</div>
						</div>
					</section>
				</div>
				<div className='flex justify-center items-center'>
					<div className='w-full max-w-7xl p-6 mt-5 space-y-8 sm:p-8 bg-white rounded-r-lg rounded-b-lg shadow dark:shadow shadow-slate-600 dark:bg-gray-800'>
						<div>
							<h2 className='text-xl text-gray-900 dark:text-white '>
								<span className='font-semibold'>Plan your event with ease!</span>
							</h2>
							<h2 className='text-xl text-gray-900 dark:text-white pt-3'>
								Contact us using the form below to your dream house experience.
							</h2>
						</div>
						<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
							<div>
								<label
									htmlFor='fullName'
									className='flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white'
								>
									Full Name
									<span className='text-red-600 ml-1 font-medium'>*</span>
								</label>
								<input
									type='text'
									id='fullName'
									{...register("fullName", { required: true })}
									className={`${reuseInputClassnames}`}
									placeholder='Enter your full name'
								/>
								{errors.fullName && (
									<span className='text-red-500 ease-in duration-300 block pt-1 text-start'>
										Full Name is required
									</span>
								)}
							</div>
							<div>
								<label
									htmlFor='email'
									className='flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white'
								>
									Email <span className='text-red-600 ml-1 font-medium'>*</span>
								</label>
								<input
									type='email'
									id='email'
									{...register("email", { required: true })}
									className={`${reuseInputClassnames}`}
									placeholder='email@company.com'
								/>
								{errors.email && (
									<span className='text-red-500 ease-in duration-300 block pt-1 text-start'>
										Email is required
									</span>
								)}
							</div>

							<div>
								<label
									htmlFor='phone'
									className='flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white'
								>
									Phone No.
									<span className='text-red-600 ml-1 font-medium'>*</span>
								</label>
								<input
									type='tel'
									id='phone'
									{...register("phone", { required: true, minLength: 10 })}
									className={`${reuseInputClassnames}`}
									placeholder='Enter your phone no.'
									autoComplete='off'
								/>
								{errors.phone && errors.phone.type === "required" && (
									<span className='text-red-500 ease-in duration-300 block pt-1 text-start'>
										Phone no is required.
									</span>
								)}
								{errors.phone && errors.phone.type === "minLength" && (
									<span className='text-red-500 ease-in duration-300 block pt-1 text-start'>
										Phone must have at least 10 characters
									</span>
								)}
							</div>

							<div>
								<label
									htmlFor='message'
									className='flex items-start mb-2 text-md ml-1 font-medium text-gray-900 dark:text-white'
								>
									Phone No.
									<span className='text-red-600 ml-1 font-medium'>*</span>
								</label>
								<textarea
									type='text'
									id='message'
									{...register("message", { required: true, minLength: 10 })}
									className={`${reuseInputClassnames}`}
									placeholder='Type your message.'
									autoComplete='off'
									rows={8}
								/>
								{errors.message && errors.message.type === "required" && (
									<span className='text-red-500 ease-in duration-300 block pt-1 text-start'>
										Message is required.
									</span>
								)}
								{errors.message && errors.message.type === "minLength" && (
									<span className='text-red-500 ease-in duration-300 block pt-1 text-start'>
										Message must have at least 10 characters
									</span>
								)}
							</div>

							<button
								disabled={isSubmitting}
								type='submit'
								className='min-w-full min px-5 py-3 text-base font-medium text-center text-white bg-pink-600 hover:bg-pink-800 dark:hover:bg-pink-900 duration-200 ease-out dark:bg-pink-700 rounded-lg  focus:ring-4 focus:ring-blue-300 sm:w-auto   dark:focus:ring-blue-800 flex justify-center items-center disabled:cursor-wait'
							>
								<span className='mr-2 '>Send Query</span>
								{isSubmitting && (
									<span className='pt-1 '>
										<Spinner className='w-5 h-5 ' />
									</span>
								)}
							</button>
						</form>
					</div>
				</div>
			</div>
		</ContentWrapper>
	);
};

export default ContactUs;
