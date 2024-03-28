import { useEffect, useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import ImageCard from "../components/ImageCard";
import SkeletonCard from "../components/SkeletonCard";
import Spinner from "../components/Spinner";

const Gallery = () => {
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const importImages = async () => {
			setIsLoading(true);
			const importedImages = await Promise.all(
				Array.from({ length: 27 }, (_, index) =>
					import(/* @vite-ignore */ `/images/${index + 1}.jpg`).catch(() => null)
				)
			);
			const filteredImages = importedImages.filter((image) => image !== null);

			setIsLoading(false);
			setImages(filteredImages);
		};

		importImages();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ContentWrapper>
			<div className='min-h-screen md:pt-20 dark:text-white'>
				<div className='bg-white dark:bg-gray-950 py-6 sm:py-8 lg:py-12'>
					<div className='mx-auto max-w-screen-4xl px-4 md:px-8'>
						<div className='mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12'>
							<div className='flex items-center gap-12'>
								<h2 className='text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white'>
									Gallery
								</h2>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-7 xl:gap-8'>
							{images &&
								!isLoading &&
								images.map((image, index) => (
									<div
										key={index}
										className='group relative flex h-48 items-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-950 shadow-lg md:h-80'
									>
										<ImageCard
											img={image.default}
											className=' inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
										/>
									</div>
								))}
						</div>
						{isLoading && (
							<div className='inset-0 md:gap-3 h-full flex flex-wrap w-full object-cover object-center transition duration-200 group-hover:scale-110'>
								<SkeletonCard />
								<SkeletonCard />
								<SkeletonCard />
								<SkeletonCard />
								<SkeletonCard />
								<SkeletonCard />
								<span className='flex justify-center items-center w-full my-4'>
									<Spinner className='text-red-700 w-7 h-7 text-4xl' />
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</ContentWrapper>
	);
};

export default Gallery;
