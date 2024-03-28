import AboutCounter from "../components/AboutCounter";
import ContentWrapper from "../components/ContentWrapper";
import TeamMembers from "../components/TeamMembers";

const About = () => {
	return (
		<ContentWrapper>
			<div className='min-h-screen md:pt-10 dark:text-white'>
				<div
					id='about'
					className='relative bg-white dark:text-white dark:bg-gray-950 duration-700 overflow-hidden mt-16'
				>
					<div className='max-w-7xl mx-auto'>
						<div className='relative z-10 pb-8  sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
							<svg
								className='hidden lg:block absolute right-14 inset-y-0 h-full w-64  text-white dark:text-gray-950 transform translate-x-1/2 -z-10 duration-700'
								fill='currentColor'
								viewBox='0 0 100 100'
								preserveAspectRatio='none'
								aria-hidden='true'
							>
								<polygon points='50,0 150,0 50,100 0,100'></polygon>
							</svg>

							<div className='pt-1'></div>

							<main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
								<div className='sm:text-center lg:text-left'>
									<h2 className='my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl dark:text-white'>
										About &nbsp;us
									</h2>

									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										Accusantium unde voluptas voluptatibus optio laboriosam
										sequi possimus eos perferendis reiciendis facilis atque
										fugit fuga quidem animi, eaque suscipit amet? Fugit, quas
										laboriosam. Necessitatibus aperiam officia quasi culpa
										perspiciatis cum possimus suscipit qui eum pariatur?
										Repellat quod quidem illo cum, sequi dignissimos.
									</p>
								</div>
							</main>
						</div>
					</div>
					<div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
						<img
							className='h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full'
							src='https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg'
							alt=''
						/>
					</div>
				</div>
				<>
					<AboutCounter />
				</>
				<>
					{/* Team Member Section */}
					<TeamMembers />
				</>
			</div>
		</ContentWrapper>
	);
};

export default About;
