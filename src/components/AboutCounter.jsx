import { useCountUp } from "react-countup";
import CounterItem from "./CounterItem";

const AboutCounter = () => {
	// Set date 2022-11-11
	let experience = Math.round((new Date() - 1671975567271) / 1000 / 60 / 60 / 7 / 52 - 1);

	// console.log(experience);

	useCountUp({ ref: "experienceCounter", end: experience, duration: 3 });
	useCountUp({ ref: "facebookFollowers", end: 4999, duration: 3 });
	useCountUp({ ref: "feedbackCounter", end: 99, duration: 3 });
	useCountUp({ ref: "projectsCounter", end: 290, duration: 3 });

	return (
		<div className='mt-10 mb-20 sm:mt-20 bg-blue-600 text-white dark:bg-gray-900 shadow-sm px-3 md:px-10 rounded-2xl duration-700'>
			<div className='font-general-medium container mx-auto py-20 block sm:flex sm:justify-between items-center'>
				<CounterItem
					title='Months of experience'
					counter={<span id='experienceCounter' />}
					measurement='+'
				/>

				<CounterItem
					title='Followers on Facebook'
					counter={<span id='facebookFollowers' />}
					measurement='+'
				/>

				<CounterItem
					title='Positive feedback'
					counter={<span id='feedbackCounter' />}
					measurement='%'
				/>

				<CounterItem
					title='Projects completed'
					counter={<span id='projectsCounter' />}
					measurement='+'
				/>
			</div>
		</div>
	);
};

export default AboutCounter;
