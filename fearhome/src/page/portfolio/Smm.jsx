import BreadCrumb from "../../components/common/Breadcrumb";
import Projects from "../../components/home-one/projects";
import SmmDetails from "../../components/portfolio/single/SmmDetails";

function Smm() {
	return (
		<>
			<BreadCrumb title="Social Media Management" />
			<SmmDetails />
			<Projects />
		</>
	);
}

export default Smm;
