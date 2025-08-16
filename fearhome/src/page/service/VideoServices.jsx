import BreadCrumb from "../../components/common/Breadcrumb";
import Testimonial from "../../components/home-one/testimonial";
import VideoServicesDetails from "../../components/service/VideoServicesDetails";
function VideoServices() {
	return (
		<>
			<BreadCrumb title="Video Services" />
			<VideoServicesDetails />
			<Testimonial />
		</>
	);
}

export default VideoServices;
