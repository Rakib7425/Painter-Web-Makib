import { CgArrowRight } from "react-icons/cg";
import heroRowImg1 from "../assets/heroRowImg1.jpg";
import heroRowImg2 from "../assets/heroRowImg2.jpg";
import heroRowImg3 from "../assets/heroRowImg3.jpg";
import { BackgroundGradient } from "./BackgroundGradient";

const HeroRow = () => {
	return (
		<>
			<hr />
			<section className='bg-white dark:bg-gray-950 pt-8 w-full'>
				<h2 className='text-black dark:text-white text-xl md:text-3xl md:mb-3 font-bold'>
					Suitable For
				</h2>
				<div className='gap-8 items-center mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 sm:px-3 px-1 md:py-2 '>
					<BackgroundGradient className='rounded-[22px] sm:p-10 md:p-5 bg-white dark:bg-zinc-900'>
						<img
							className='w-full rounded-[22px]'
							src={heroRowImg1}
							alt='dashboard image'
						/>
					</BackgroundGradient>
					<div className='mt-4 md:mt-0'>
						<h2 className='mb-4 text-4xl uppercase tracking-tight font-extrabold text-gray-900 dark:text-white'>
							Interior Wall Painting
						</h2>
						<p className='mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400'>
							Need elegant textures or elaborate stencil designs? We have it all. Get
							the latest designs based on your unique taste and style. Revamp your
							interior decor with the experts!
						</p>
						<a
							href='#root'
							className='inline-flex items-center text-white bg-pink-600 duration-200 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 mb-5'
						>
							Get started
							<CgArrowRight size={25} />
						</a>
					</div>
				</div>
			</section>
			<section className='bg-white dark:bg-gray-950 p-3'>
				<div className='gap-8 items-center mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 sm:px-3 px-1 md:py-2'>
					<div className='mt-4 md:mt-0'>
						<h2 className='mb-4 text-4xl uppercase tracking-tight font-extrabold text-gray-900 dark:text-white'>
							Exterior Wall Painting
						</h2>
						<p className='mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400'>
							Your home exterior makes an impression on your guests even before you
							get a chance to open your doors and welcome them inside your sanctuary.
							Hence, you must pay special attention to your home exterior painting and
							select hues, finishes and textures which will make your home stand out
							in your neighbourhood for all the right reasons!
						</p>
						<a
							href='#root'
							className='inline-flex items-center text-white bg-pink-600 duration-200  hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 mb-5'
						>
							Get started
							<CgArrowRight size={25} />
						</a>
					</div>
					<BackgroundGradient className='rounded-[22px] md:p-5 sm:p-10 bg-white dark:bg-zinc-900'>
						<img
							className='w-full rounded-[22px]'
							src={heroRowImg2}
							alt='dashboard image'
						/>
					</BackgroundGradient>
				</div>
			</section>
			<section className='bg-white dark:bg-gray-950 p-3'>
				<div className='gap-8 items-center mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 sm:px-3 px-1 md:py-2'>
					<BackgroundGradient className='rounded-[22px] md:p-5 sm:p-10 bg-white dark:bg-zinc-900'>
						<img
							className='w-full rounded-[22px]'
							src={heroRowImg3}
							alt='dashboard image'
						/>
					</BackgroundGradient>
					<div className='mt-4 md:mt-0'>
						<h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
							A FINISHED LOOK
						</h2>
						<p className='mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400'>
							Enhance the look of your home exterior and make it look stylish and
							well-maintained.
						</p>
						<a
							href='#root'
							className='inline-flex items-center text-white bg-pink-600 duration-200  hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 mb-5'
						>
							Get started
							<CgArrowRight size={25} />
						</a>
					</div>
				</div>
			</section>
		</>
	);
};

export default HeroRow;
