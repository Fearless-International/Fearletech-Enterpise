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
		title: "Super customer service!",
		description:
			"Fearless exceeded our expectations! We made a last-minute request for Aurora Ghana, and everything was delivered perfectly on time. The design was professional, the quality was excellent, and the team went the extra mile to make sure everything looked amazing.",
		author: "M. Dekruijff",
		designation: "Aurora Ghana",
		img: Thumb1Img,
	},
	{
		id: crypto.randomUUID(),
		rating: 4,
		title: "Exceptional creativity and vision",
		description:
			"Partnering with Fearless was a game-changer for Kolmesh. Their creativity and vision completely redefined our visual identity. The new logo and brand elements now capture the heart of our company, and our audience has responded positively ever since!",
		author: "Gary",
		designation: "Manager, Kolmesh Ltd",
		img: Thumb2Img,
	},
	{
		id: crypto.randomUUID(),
		rating: 5,
		title: "Innovative and professional",
		description:
			"Fearless brought fresh ideas and energy to our campaign at Giant Foods. Their innovative approach, attention to detail, and professionalism made the entire process smooth. The final results were beyond what we imagined, and our customers loved it.",
		author: "M. KOTAN",
		designation: "Giant Industry, Head",
		img: Thumb3Img,
	},
	{
		id: crypto.randomUUID(),
		rating: 4,
		title: "Transformed our brand",
		description:
			"Fenoutech’s collaboration with Fearless completely transformed how we present ourselves. Our marketing materials now look modern and polished. The boost in customer engagement and recognition has been impressive since we rolled out the new visuals.",
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
