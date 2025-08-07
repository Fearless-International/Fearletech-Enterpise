import BreadCrumb from "../../components/common/Breadcrumb";
import TwoColumnFaq from "../../components/contact/TwoColumnFaq";
import AutoSlider from "../../components/home-one/auto-slider";
import Services from "../../components/home-one/services";
import WhyChooseUs from "../../components/home-one/why-choose-us";

const services = [
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
		link: "/creative-branding-services",
	},
	{
		id: crypto.randomUUID(),
		title: "UI/UX Interfaces",
		description:
			"Designing seamless, user-focused interfaces that enhance engagement and elevate experiences, ensuring every interaction feels intuitive and rewarding.",
		icon: "icon-web",
		link: "/uxui-services",
	},
	{
		id: crypto.randomUUID(),
		title: "Mobile App Development",
		description:
			"Create powerful, user-friendly mobile apps with seamless functionality. We deliver cross-platform solutions tailored to your needs, ensuring exceptional user experiences.",
		icon: "icon-design-thinking",
		link: "/mobile-app-services",
	},
	{
		id: crypto.randomUUID(),
		title: "Video Editing and Animation",
		description:
			"Bring your stories to life with expert video editing and animation. We craft visually stunning content that captivates and engages your audience.",
		icon: "icon-video",
		link: "/video-editing-services",
	},
	{
		id: crypto.randomUUID(),
		title: "Software Development",
		description:
			"Developing robust, high-performance software tailored to your needs. We deliver innovative solutions that streamline processes and drive results.",
		icon: "icon-code",
		link: "/software-development",
	},
	{
		id: crypto.randomUUID(),
		title: "Database Creation and Management",
		description:
			"Designing and managing efficient databases to organize, store, and retrieve data seamlessly. We ensure secure and scalable solutions for your business needs.",
		icon: "icon-code",
		link: "/database-management",
	},
	{
		id: crypto.randomUUID(),
		title: "Photography / Graphic Designing / Content creation",
		description:
			"Bringing your vision to life with stunning photography, creative graphic design, and compelling content creation. We craft visuals and stories that resonate.",
		icon: "icon-code",
		link: "/photography-graphic-design-content-creation",
		
	},
	{
		id: crypto.randomUUID(),
		title: "Information System Analysis",
		description:
			"Optimizing your operations with comprehensive information system analysis. We identify inefficiencies and deliver strategic solutions for improved performance.",
		icon: "icon-settings",
		link: "/information-system-analysis",
	},
	{
		id: crypto.randomUUID(),
		title: "Search Engine Optimization",
		description:
			"Boost your online visibility with expert SEO strategies. We optimize your website to improve rankings, attract traffic, and drive results.",
		icon: "icon-minus",
		link: "/search-engine-optimization",
	},
	{
		id: crypto.randomUUID(),
		title: "Datacenter design and Deployment",
		description:
			"Designing and deploying efficient, scalable data centers to meet your business needs. We ensure reliability, security, and optimized performance.",
		icon: "icon-settings",
		link: "/datacenter-design-and-deployment",
	},
	{
		id: crypto.randomUUID(),
		title: "Enterprise Network Design and Deployment",
		description:
			"Building robust, scalable enterprise networks for seamless connectivity and performance. We ensure secure and efficient solutions tailored to your organization.",
		icon: "icon-minus",
		link: "/enterprise-network-design-and-deployment",
	},
	{
		id: crypto.randomUUID(),
		title: "Corporate Network Upgrade",
		description:
			"Enhancing corporate networks with modern, secure upgrades to meet evolving business demands. We ensure improved performance and reliability.",
		icon: "icon-settings",
		link: "/corporate-network-upgrade",
		
	},
	{
		id: crypto.randomUUID(),
		title: "Systems Maintenance",
		description:
			"Ensuring smooth operations with reliable corporate systems maintenance. We manage and sustain your IT infrastructure for peak performance and security.",
		icon: "icon-minus",
		link: "/systems-maintenance",
	},
	{
		id: crypto.randomUUID(),
		title: "Enterprise Servers & Cloud Deployment",
		description:
			"Deploying powerful enterprise servers and scalable cloud solutions to optimize performance and flexibility. We deliver reliable infrastructure for your business growth.",
		icon: "icon-settings",
		link: "/enterprise-servers-cloud-deployment",
	},
];

function ServicePage() {
	return (
		<>
			<BreadCrumb title="Service" />
			<Services services={services} />
			<AutoSlider />
			<WhyChooseUs />
			<TwoColumnFaq />
		</>
	);
}

export default ServicePage;
