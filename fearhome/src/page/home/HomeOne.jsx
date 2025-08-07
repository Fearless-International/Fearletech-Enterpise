import About from "../../components/home-one/about";
import AutoSlider from "../../components/home-one/auto-slider";
import Hero from "../../components/home-one/hero";
import Projects from "../../components/home-one/projects";
import Services from "../../components/home-one/services";
import Teams from "../../components/home-one/teams";
import Testimonial from "../../components/home-one/testimonial";
import WhyChooseUs from "../../components/home-one/why-choose-us";

// Teams images
import Team1Img from "../../assets/images/team/team1.png";
import Team2Img from "../../assets/images/team/team2.png";
import Team3Img from "../../assets/images/team/team3.png";
import Team4Img from "../../assets/images/team/team4.png";

const servicesData = [
	{
		id: crypto.randomUUID(),
		title: "Web Design & Development",
		description:
			"We design responsive, user-friendly websites that engage audiences and deliver results. Let us bring your vision to life. Let us help you stand out in the digital world.",
		icon: "icon-design-tools",
		link: "/web-services",
	},
	{
		id: crypto.randomUUID(),
		title: "Creative Branding",
		description:
			"Build a brand that stands out with our creative branding services. We craft unique identities that inspire and connect with your audience.",
		icon: "icon-branding",
	},
	{
		id: crypto.randomUUID(),
		title: "UI/UX Interfaces",
		description:
			"Designing seamless, user-focused interfaces that enhance engagement and elevate experiences, ensuring every interaction feels intuitive and rewarding.",
		icon: "icon-web",
	},
	{
		id: crypto.randomUUID(),
		title: "Mobile App Development",
		description:
			"Create powerful, user-friendly mobile apps with seamless functionality. We deliver cross-platform solutions tailored to your needs, ensuring exceptional user experiences.",
		icon: "icon-design-thinking",
	},
	{
		id: crypto.randomUUID(),
		title: "Video Editing and Animation",
		description:
			"Bring your stories to life with expert video editing and animation. We craft visually stunning content that captivates and engages your audience.",
		icon: "icon-video",
	},
	{
		id: crypto.randomUUID(),
		title: "Software Development",
		description:
			"Developing robust, high-performance software tailored to your needs. We deliver innovative solutions that streamline processes and drive results.",
		icon: "icon-code",
	},
	{
		id: crypto.randomUUID(),
		title: "Database Creation and Management",
		description:
			"Designing and managing efficient databases to organize, store, and retrieve data seamlessly. We ensure secure and scalable solutions for your business needs.",
		icon: "icon-code",
	},
	{
		id: crypto.randomUUID(),
		title: "Photography / Graphic Designing / Content creation",
		description:
			"Bringing your vision to life with stunning photography, creative graphic design, and compelling content creation. We craft visuals and stories that resonate.",
		icon: "icon-code",
	},
];

const teamsData = [
	{
		id: crypto.randomUUID(),
		name: "Andrew Mark",
		designation: "Creative Director",
		img: Team1Img,
	},
	{
		id: crypto.randomUUID(),
		name: "Jack Taylor",
		designation: "Senior Designer",
		img: Team2Img,
	},
	{
		id: crypto.randomUUID(),
		name: "Martine Joy",
		designation: "Project Manager",
		img: Team3Img,
	},
	{
		id: crypto.randomUUID(),
		name: "Adam Straw",
		designation: "Web Developer",
		img: Team4Img,
	},
];

function HomeOne() {
	return (
		<>
			<Hero />
			<Services services={servicesData} />
			<About />
			<Projects />
			<WhyChooseUs />
			<Testimonial />
			<AutoSlider />
			<Teams teams={teamsData} />
		</>
	);
}

export default HomeOne;
