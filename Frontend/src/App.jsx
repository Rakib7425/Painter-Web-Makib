import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Header from "./components/Header.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import OurTeam from "./pages/OurTeam.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Gallery from "./pages/Gallery.jsx";
import BackToUp from "@uiw/react-back-to-top";
import { BiUpArrowCircle } from "react-icons/bi";
import AdminHeader from "./Admin/Components/AdminHeader.jsx";
import AdminDashboard from "./Admin/pages/AdminDashboard.jsx";
import AdminAbout from "./Admin/pages/AdminAbout.jsx";
import AdminServices from "./Admin/pages/AdminServices.jsx";
import AdminGallery from "./Admin/pages/AdminGallery.jsx";
import AdminTeam from "./Admin/pages/AdminTeam.jsx";
import AdminContact from "./Admin/pages/AdminContact.jsx";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "*",
			element: <Header />,
			errorElement: <NotFound />,
		},
		{
			path: "/",
			element: <Header />,
			errorElement: <NotFound />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<Home />
							<Footer />
						</span>
					),
				},
			],
		},
		{
			path: "/about",
			element: <Header />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<About />
							<Footer />
						</span>
					),
				},
			],
		},
		{
			path: "/services",
			element: <Header />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<Services />
							<Footer />
						</span>
					),
				},
			],
		},
		{
			path: "/gallery",
			element: <Header />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<Gallery />
							<Footer />
						</span>
					),
				},
			],
		},
		{
			path: "/our-team",
			element: <Header />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<OurTeam />
							<Footer />
						</span>
					),
				},
			],
		},
		{
			path: "/contact",
			element: <Header />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<ContactUs />
							<Footer />
						</span>
					),
				},
			],
		},
		// Admin routes
		{
			path: "/admin-login",
			element: <Header />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<Login />
							<Footer />
						</span>
					),
				},
			],
		},
		{
			path: "/admin/dashboard",
			element: <AdminHeader />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<AdminDashboard />
							<Footer />
						</span>
					),
				},
			],
		},
		{
			path: "/admin/about",
			element: <AdminHeader />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<AdminAbout />
							<Footer />
						</span>
					),
				},
			],
		},
		{
			path: "/admin/services",
			element: <AdminHeader />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<AdminServices />
							<Footer />
						</span>
					),
				},
			],
		},
		{
			path: "/admin/gallery",
			element: <AdminHeader />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<AdminGallery />
							<Footer />
						</span>
					),
				},
			],
		},
		{
			path: "/admin/team",
			element: <AdminHeader />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<AdminTeam />
							<Footer />
						</span>
					),
				},
			],
		},
		{
			path: "/admin/contact",
			element: <AdminHeader />,
			children: [
				{
					path: "",
					element: (
						<span className='pt-12'>
							<AdminContact />
							<Footer />
						</span>
					),
				},
			],
		},
	]);

	return (
		<div className='dark:bg-gray-950 min-h-screen bg-white duration-700 pb-5'>
			<section className='max-w-[1480px] min-w-full mx-auto h-full pb-4'>
				{/* WARN: Don't Change or edit this */}

				<RouterProvider router={router} />
				<BackToUp style={{ zIndex: "3" }} size={42}>
					{<BiUpArrowCircle size={32} color='rgb(219 39 119)' />}
				</BackToUp>
			</section>
		</div>
	);
};

export default App;
