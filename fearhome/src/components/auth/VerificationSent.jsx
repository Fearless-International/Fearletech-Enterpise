import { useLocation } from "react-router-dom";
import StarImg from "../../assets/images/v1/star2.png";

function VerificationSent() {
	const location = useLocation();
	const email = location.state?.email || "your email";
	
	return (
		<div className="section aximo-section-padding">
			<div className="container">
				<div className="aximo-account-title">
					<h2>
						<span className="aximo-title-animation">
							Verify Your Email
							<span className="aximo-title-icon">
								<img src={StarImg} alt="Star" />
							</span>
						</span>
					</h2>
				</div>
				<div className="aximo-account-wrap">
					<div className="text-center">
						<div className="mb-4">
							<i className="fas fa-envelope-open-text fa-4x text-primary"></i>
						</div>
						<h3>Verification Email Sent</h3>
						<p className="mb-4">
							We've sent a verification link to <strong>{email}</strong>. 
							Please check your inbox and click the link to activate your account.
						</p>
						<p className="mb-4">
							If you don't see the email, please check your spam folder.
						</p>
						<div className="aximo-account-bottom m-0">
							<p>
								Return to <a href="/sign-in">Login</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VerificationSent;