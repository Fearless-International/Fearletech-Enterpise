import Star2Img from "../../../assets/images/v1/star2.png";
import Thumb1Img from "../../../assets/images/v1/t_thumb1.png";
import Thumb2Img from "../../../assets/images/v1/t_thumb2.png";
import Thumb3Img from "../../../assets/images/v1/t_thumb3.png";
import Thumb4Img from "../../../assets/images/v1/t_thumb4.png";
import TestimonialCard from "./TestimonialCard";

const testimonialsData = [
	{
		id: crypto.randomUUID(),
		rating: 5,
		title: "Website Delivered Perfectly!",
		description:
			"Fearless built our new seafood website, and the result was flawless. Fast, professional, and exactly what Aurora Ghana needed.",
		author: "M. Dekruijff",
		designation: "Aurora Ghana",
		img: Thumb1Img,
	},
	{
		id: crypto.randomUUID(),
		rating: 4,
		title: "Our Brand Looks Amazing",
		description:
			"Fearless built Kolmesh’s website from scratch, and it completely changed how our company is seen. Clean, modern, and professional.",
		author: "Gary",
		designation: "Manager, Kolmesh Ltd",
		img: Thumb2Img,
	},
	{
		id: crypto.randomUUID(),
		rating: 5,
		title: "Community Management Experts",
		description:
			"Fearless manages Giant’s online community with creativity and consistency. Our fan engagement has never been stronger.",
		author: "M. KOTAN",
		designation: "Head, Giant Music Label",
		img: Thumb3Img,
	},
	{
		id: crypto.randomUUID(),
		rating: 5,
		title: "Complete Digital Makeover",
		description:
			"Fearless built Fenoutech’s website and runs our social media. The results speak for themselves — we now look like an industry leader.",
		author: "H. Houngnandan",
		designation: "Cyber Security Expert, Fenoutech",
		img: Thumb4Img,
	},
];


function Testimonial() {
	return (
		<div className="section aximo-section-padding3">
			<div className="container">
				<div className="aximo-section-title center">
					<h2>
						Clients are always
						<span className="aximo-title-animation">
							satisfied with us
							<span className="aximo-title-icon">
								<img src={Star2Img} alt="Star2Img" />
							</span>
						</span>
					</h2>
				</div>
				<div className="row">
					{testimonialsData.map((testimonial) => (
						<TestimonialCard key={testimonial.id} testimonial={testimonial} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Testimonial;
