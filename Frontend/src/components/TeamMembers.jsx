import MemberCard from "./MemberCard";

const TeamMembers = () => {
	return (
		<section className='member-section flex md:my-7 gap-5 md:gap-x-36 md:gap-y-20 flex-wrap justify-center items-center mx-auto mb-20'>
			<MemberCard name='ABCD' designation='Founder' contactURL='' />
			<MemberCard name='XYZ' designation='Co-Founder' />
			<MemberCard />
			<MemberCard />
			<MemberCard />
			<MemberCard />
			<MemberCard />
			<MemberCard />
			<MemberCard />
		</section>
	);
};

export default TeamMembers;
