import Star2Img from "../../../assets/images/v1/star2.png";
import Project1Img from "../../../assets/images/v1/project1.png";
import Project2Img from "../../../assets/images/v1/project2.png";
import Project3Img from "../../../assets/images/v1/project3.png";
import Project4Img from "../../../assets/images/v1/project4.png";
import ProjectCard from "./ProjectCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";

const projectsData = [
	{
		id: crypto.randomUUID(),
		title: "Web Design & Development",
		description: "Developing the look and feel of physical products, aesthetics, and functionality.",
		img: Project1Img,
		link: "/web-design-development",
	},
	{
		id: crypto.randomUUID(),
		title: "Logo and Branding",
		description: "Creating or refreshing a company's logo and developing a cohesive visual identity.",
		img: Project2Img,
		link: "/logo-branding",
	},
	{
		id: crypto.randomUUID(),
		title: "Video Editing and Animation",
		description: "Designing the UI/UX for mobile apps and web applications to ensure usability & engagement.",
		img: Project3Img,
		link: "/video-editing-and-animation",
	},
	{
		id: crypto.randomUUID(),
		title: "Creative Branding",
		description: "Creating packaging solutions for products that not only protect but attract customers in stores.",
		img: Project4Img,
		link: "/creative-branding",
	},
	{
		id: crypto.randomUUID(),
		title: "Social Media Management",
		description: "Managing and growing a brand's presence on social media platforms.",
		img: Project1Img,
		link: "/social-media-management",
	},
	{
		id: crypto.randomUUID(),
		title: "Content Creation",
		description: "Producing engaging content for various platforms to enhance brand visibility.",
		img: Project2Img,
		link: "/content-creation",
	},
];


const swiperSettings = {
	spaceBetween: 24,
	direction: "horizontal",
	pagination: {
		clickable: true,
	},
	modules: [Pagination, Mousewheel],
	mousewheel: true,
	breakpoints: {
		640: {
			slidesPerView: 1,
		},
		900: {
			slidesPerView: 2,
		},
		1600: {
			slidesPerView: 3.5,
		},
	},
};
function Projects() {
	return (
		<div className="section dark-bg aximo-section-padding">
			<div className="container">
				<div className="aximo-section-title center light">
					<h2>
						Have a wide range of
						<span className="aximo-title-animation">
							creative projects
							<span className="aximo-title-icon">
								<img src={Star2Img} alt="Star2Img" />
							</span>
						</span>
					</h2>
				</div>
			</div>
			<div className="swiper aximo-project-slider">
				<Swiper {...swiperSettings}>
					{projectsData.map((project) => (
						<SwiperSlide key={project.id}>
							<ProjectCard project={project} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			
		</div>
	);
}

export default Projects;
