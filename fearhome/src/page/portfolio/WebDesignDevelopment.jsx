import BreadCrumb from "../../components/common/Breadcrumb";
import Projects from "../../components/home-one/projects";
import WebDesignDevelopmentDetails from "../../components/portfolio/single/WebDesignDevelopmentDetails";

function WebDesignDevelopment() {
	return (
		<>
			<BreadCrumb title="Web Design & Development" />
			<WebDesignDevelopmentDetails />
			<Projects />
		</>
	);
}

export default WebDesignDevelopment;
