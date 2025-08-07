import LogoWhiteImg from "../../assets/images/logo/logo-whitea1.png";

function Footer() {
	return (
		<footer className="aximo-footer-section dark-bg">
			<div className="container">
				<div className="aximo-footer-bottom">
					<div className="row">
						<div className="col-lg-6">
							<div className="aximo-footer-logo">
								<a href="">
									<img 
										src={LogoWhiteImg} 
										alt="logo" 
										style={{
											width: "200px", // Adjust the width
											height: "auto", // Maintain aspect ratio
										}} 
									/>
								</a>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="aximo-copywright one">
								<p> &copy; Copyright 2025, All Rights Reserved by Fearless</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
