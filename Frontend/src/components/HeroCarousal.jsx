import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { useEffect, useState } from "react";

const HeroCarousal = () => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		const importImages = async () => {
			const importedImagesPromises = Array.from({ length: 10 }, (_, index) =>
				import(`../assets/carousalImg${index}.jpg`).catch(() => null)
			);

			const importedImages = await Promise.all(importedImagesPromises);
			const filteredImages = importedImages.filter((image) => image !== null);
			setImages(filteredImages);
		};

		importImages();
	}, []);
	return (
		<div className='mb-16'>
			<Carousel
				autoPlay={true}
				infiniteLoop={true}
				interval={4000}
				showThumbs={false}
				stopOnHover={false}
			>
				{images &&
					images.map((img, index) => (
						<div key={index} className='max-h-[600px]'>
							<img src={img.default} className='object-cover md:max-h-[650px]' />
							<p className='legend'>Legend 1</p>
						</div>
					))}
			</Carousel>
		</div>
	);
};

export default HeroCarousal;
