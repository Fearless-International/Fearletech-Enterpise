import BreadCrumb from "../../components/common/Breadcrumb";
import Projects from "../../components/home-one/projects";
import ContentCreationDetails from "../../components/portfolio/single/ContentCreationDetails";

function ContentCreation() {
	return (
		<>
			<BreadCrumb title="Content Creation" />
			<ContentCreationDetails />
			<Projects />
		</>
	);
}

export default ContentCreation;
