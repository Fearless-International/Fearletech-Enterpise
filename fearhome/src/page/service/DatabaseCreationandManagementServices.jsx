import BreadCrumb from "../../components/common/Breadcrumb";
import Testimonial from "../../components/home-one/testimonial";
import DatabaseCreationandManagementServicesDetails from "../../components/service/DatabaseCreationandManagementServicesDetails";
function DatabaseCreationandManagementServices() {
	return (
		<>
			<BreadCrumb title="DCM Services" />
			<DatabaseCreationandManagementServicesDetails />
			<Testimonial />
		</>
	);
}

export default DatabaseCreationandManagementServices;
