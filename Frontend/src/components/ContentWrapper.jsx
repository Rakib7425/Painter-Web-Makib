/* eslint-disable react/prop-types */

const ContentWrapper = ({ children }) => {
	return (
		<div
			className='contentWrapper'
			style={{
				width: "100%",
				maxWidth: "1280px",
				margin: "0 auto",
				padding: "10px 20px",
			}}
		>
			{children}
		</div>
	);
};

export default ContentWrapper;
