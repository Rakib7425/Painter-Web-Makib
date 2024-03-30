// import GoogleMapReact from "google-map-react";

const GoogleMap = () => {
	return (
		<div className='overflow-hidden'>
			<iframe
				className='md:min-h-[492px] min-w-full'
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.4023681026492!2d91.16328375526348!3d26.28105302840244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375986fa43691a03%3A0xa866bfc17e52d425!2sSenga%2C%20Niz%20Bahari%2C%20Assam%20781305!5e0!3m2!1sen!2sin!4v1711785735104!5m2!1sen!2sin'
				style={{ border: 0 }}
				allowFullScreen
				loading='lazy'
				referrerPolicy='no-referrer-when-downgrade'
			></iframe>
		</div>
	);
};

export default GoogleMap;
