import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import getAboutMeData from "../utils/getAboutMeData";

const AboutMe = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState([]);
	console.log(data);
	useEffect(() => {
		const getData = async () => {
			const data = await getAboutMeData(setLoading);
			setData(data.data);
		};
		getData();
	}, []);

	return loading ? (
		<Spinner className=' ' />
	) : (
		<div className='w-full'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log(e.currentTarget.value);
				}}
				action=''
				method='post'
				id='aboutMyself'
				className='w-full'
			>
				<div className='mb-6'>hello dear</div>
			</form>
		</div>
	);
};

export default AboutMe;
