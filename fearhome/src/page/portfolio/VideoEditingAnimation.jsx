import BreadCrumb from "../../components/common/Breadcrumb";
import Projects from "../../components/home-one/projects";
import VideoEditingAnimationDetails from "../../components/portfolio/single/VideoEditingAnimationDetails";

function VideoEditingAnimation() {
	return (
		<>
			<BreadCrumb title="Video Editing and Animation" />
			<VideoEditingAnimationDetails />
			<Projects />
		</>
	);
}

export default VideoEditingAnimation;
