import { Link } from "react-router-dom";
import ShapeImg from "../../../assets/images/v1/shape1.png";
import StarImg from "../../../assets/images/v1/star.png";
import User1Img from "../../../assets/images/v1/user1.png";
import User2Img from "../../../assets/images/v1/user2.png";
import User3Img from "../../../assets/images/v1/user3.png";
function HeroContent() {
	return (
		<div className="aximo-hero-content">
			<h1>
				<span className="aximo-title-animation">
				We build your 
					<img src={StarImg} alt="StarImg" />
				</span>{" "}
				future Fearlessly
			</h1>
			<p>
				{`Fearless delivers innovative designs, strategic solutions, and cutting-edge technologies to empower businesses.
From UI/UX, branding, and web development to corporate networks and cloud deployments, we cover it all.
Our expert team transforms bold ideas into seamless experiences and impactful results.`}
			</p>
			<div className="aximo-hero-user-wrap">
				<div className="aximo-hero-user-thumb">
					<div className="aximo-hero-user-thumb-item">
						<img src={User1Img} alt="User1Img" />
					</div>
					<div className="aximo-hero-user-thumb-item">
						<img src={User3Img} alt="User3Img" />
					</div>
					<div className="aximo-hero-user-thumb-item">
						<img src={User2Img} alt="User2Img" />
					</div>
				</div>
				<div className="aximo-hero-user-data">
					<p>Believed by more than a thousand people</p>
				</div>
			</div>
			<Link className="aximo-call-btn" to="/contact-us">
				Book a free consultation <i className="icon-call"></i>
			</Link>
			<div className="aximo-hero-shape">
				<img src={ShapeImg} alt="ShapeImg" />
			</div>
		</div>
	);
}

export default HeroContent;
