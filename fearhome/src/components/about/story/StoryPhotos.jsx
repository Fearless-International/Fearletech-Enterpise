import Story1Img from "../../../assets/images/about/pexels-eva-bronzini-7661184.jpg";
import Story2Img from "../../../assets/images/about/pexels-christopher-welsch-leveroni-2150186467-33532465.jpg";
import Story3Img from "../../../assets/images/about/pexels-harold-vasquez-853421-2653362.jpg";
import Story4Img from "../../../assets/images/about/pexels-makrufinmuhammad-33538425.jpg";
function StoryPhotos() {
	return (
		<>
			<div className="col-lg-8">
				<div className="aximo-story-thumb">
					<img src={Story1Img} alt="Story1Img" />
				</div>
			</div>
			<div className="col-lg-4">
				<div className="aximo-story-thumb">
					<img src={Story2Img} alt="StroryIMg 2" />
				</div>
			</div>
			<div className="col-lg-4">
				<div className="aximo-story-thumb">
					<img src={Story3Img} alt="StoryImg 3" />
				</div>
			</div>
			<div className="col-lg-8">
				<div className="aximo-story-thumb">
					<img src={Story4Img} alt="Story4Img" />
				</div>
			</div>
		</>
	);
}

export default StoryPhotos;
