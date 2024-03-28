import ContentWrapper from "../components/ContentWrapper";
import TeamMembers from "../components/TeamMembers";

const OurTeam = () => {
	return (
		<ContentWrapper>
			<div className='min-h-screen md:pt-20 dark:text-white'>
				{/* Team Member Section */}
				<TeamMembers />
			</div>
		</ContentWrapper>
	);
};

export default OurTeam;
