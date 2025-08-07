import Logo from "../../assets/images/logo/logo-whitea1.png";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div className="aximo-logo-section">
			<div className="container">
				<Link to="/">
					<img 
						src={Logo} 
						alt="Logo" 
						style={{
							width: "250px",  // Adjust width
							height: "auto",  // Maintain aspect ratio
						}} 
					/>
				</Link>
			</div>
		</div>
	);
}

export default Header;
