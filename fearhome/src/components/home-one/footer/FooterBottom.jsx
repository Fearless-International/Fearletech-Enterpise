import LogoWhiteImg from "../../../assets/images/logo/logo-whitea1.png";
function FooterBottom() {
	return (
		<>
			<div className="col-lg-6">
				<div className="aximo-footer-logo">
					<a href="">
					<img src={LogoWhiteImg} alt="Logo" style={{ width: '130px', height: 'auto' }} />
					</a>
				</div>
			</div>
			<div className="col-lg-6">
				<div className="aximo-copywright one">
					<p> &copy; Copyright 2025, All Rights Reserved by FearlessInt</p>
				</div>
			</div>
		</>
	);
}

export default FooterBottom;
