import BreadCrumb from "../../components/common/Breadcrumb";
import Projects from "../../components/home-one/projects";
import LogoBrandingDetails from "../../components/portfolio/single/LogoBrandingDetails";

function LogoBranding() {
	return (
		<>
			<BreadCrumb title="Logo Branding" />
			<LogoBrandingDetails />
			<Projects />
		</>
	);
}

export default LogoBranding;
