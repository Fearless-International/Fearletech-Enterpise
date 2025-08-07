import BreadCrumb from "../../components/common/Breadcrumb";
import Projects from "../../components/home-one/projects";
import CreativeBrandingDetails from "../../components/portfolio/single/CreativeBrandingDetails";

function CreativeBranding() {
	return (
		<>
			<BreadCrumb title="Creative Branding" />
			<CreativeBrandingDetails />
			<Projects />
		</>
	);
}

export default CreativeBranding;
